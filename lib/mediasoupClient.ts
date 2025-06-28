import * as mediasoupClient from 'mediasoup-client';
import { getSocket } from './socket';

export async function startMediaFlow(device: mediasoupClient.Device, stream: MediaStream) {
    const socket = getSocket();

    return new Promise(async (resolve) => {
        // 1. Get router capabilities
        socket.send(JSON.stringify({ type: 'getRouterRtpCapabilities' }));

        socket.onmessage = async (event) => {
            const msg = JSON.parse(event.data);

            if (msg.type === 'routerRtpCapabilities') {
                await device.load({ routerRtpCapabilities: msg.data });

                // ✅ Create send transport first
                socket.send(JSON.stringify({ type: 'createWebRtcTransport', data: { direction: 'send' } }));
            }

            if (msg.type === 'transportCreated') {
                // ✅ Create send transport
                const sendTransport = device.createSendTransport(msg.data);

                sendTransport.on('connect', ({ dtlsParameters }, callback) => {
                    socket.send(JSON.stringify({
                        type: 'connectTransport',
                        data: { dtlsParameters, direction: 'send' }
                    }));
                    socket.onmessage = () => callback();
                });

                sendTransport.on('produce', ({ kind, rtpParameters }, callback) => {
                    socket.send(JSON.stringify({
                        type: 'produce',
                        data: { kind, rtpParameters }
                    }));

                    socket.onmessage = (event) => {
                        const res = JSON.parse(event.data);
                        if (res.type === 'produced') callback({ id: res.data.id });
                    };
                });

                for (const track of stream.getTracks()) {
                    await sendTransport.produce({ track });
                }

                resolve(true);
            }
        };
    });
}

export async function setupConsumerListener(
    device: mediasoupClient.Device,
    addStream: (stream: MediaStream) => void
) {
    const socket = getSocket();

    socket.addEventListener('message', async (event) => {
        const msg = JSON.parse(event.data);

        if (msg.type === 'newProducer') {
            const { producerId } = msg.data;

            // ✅ Create recv transport before consume
            socket.send(JSON.stringify({ type: 'createWebRtcTransport', data: { direction: 'recv' } }));

            socket.onmessage = async (event) => {
                const res = JSON.parse(event.data);
                if (res.type === 'transportCreated') {
                    const recvTransport = device.createRecvTransport(res.data);

                    recvTransport.on('connect', ({ dtlsParameters }, callback) => {
                        socket.send(JSON.stringify({
                            type: 'connectTransport',
                            data: { dtlsParameters, direction: 'recv' }
                        }));
                        callback();
                    });

                    // Once transport is ready, request to consume
                    socket.send(JSON.stringify({
                        type: 'consume',
                        data: {
                            producerId,
                            rtpCapabilities: device.rtpCapabilities
                        }
                    }));

                    // Listen for consumed
                    socket.onmessage = async (event) => {
                        const consumeMsg = JSON.parse(event.data);
                        if (consumeMsg.type === 'consumed') {
                            const {
                                id,
                                producerId,
                                kind,
                                rtpParameters,
                            } = consumeMsg.data;

                            const consumer = await recvTransport.consume({
                                id,
                                producerId,
                                kind,
                                rtpParameters,
                            });

                            const stream = new MediaStream([consumer.track]);
                            addStream(stream);
                        }
                    };
                }
            };
        }
    });
}
