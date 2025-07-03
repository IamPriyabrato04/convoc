import * as mediasoupClient from "mediasoup-client";
import { getSocket } from "./socket";

export async function startMediaFlow(device: mediasoupClient.Device, stream: MediaStream) {
    const socket = getSocket();

    // Step 1: Get router RTP capabilities
    socket.send(JSON.stringify({ type: "getRouterRtpCapabilities" }));

    return new Promise<void>((resolve) => {
        const handleMessage = async (event: MessageEvent) => {
            const msg = JSON.parse(event.data);

            if (msg.type === "routerRtpCapabilities") {
                await device.load({ routerRtpCapabilities: msg.data });

                socket.send(JSON.stringify({ type: "createWebRtcTransport", data: { direction: "send" } }));
            }

            if (msg.type === "transportCreated" && msg.data.direction === undefined) {
                // First transportCreated is for send
                const sendTransport = device.createSendTransport(msg.data);

                sendTransport.on("connect", ({ dtlsParameters }, callback) => {
                    socket.send(JSON.stringify({ type: "connectTransport", data: { dtlsParameters, direction: "send" } }));
                    callback();
                });

                sendTransport.on("produce", ({ kind, rtpParameters }, callback) => {
                    socket.send(JSON.stringify({ type: "produce", data: { kind, rtpParameters } }));
                    const onProduced = (event: MessageEvent) => {
                        const res = JSON.parse(event.data);
                        if (res.type === "produced") {
                            callback({ id: res.data.id });
                            socket.removeEventListener("message", onProduced);
                        }
                    };
                    socket.addEventListener("message", onProduced);
                });

                for (const track of stream.getTracks()) {
                    await sendTransport.produce({ track });
                }

                socket.removeEventListener("message", handleMessage);
                resolve();
            }
        };

        socket.addEventListener("message", handleMessage);
    });
}

export async function setupConsumerListener(
    device: mediasoupClient.Device,
    recvTransport: mediasoupClient.types.Transport,
    addStream: (stream: MediaStream) => void
) {
    const socket = getSocket();

    socket.addEventListener("message", async (event) => {
        const msg = JSON.parse(event.data);

        if (msg.type === "newProducer") {
            const { producerId } = msg.data;

            socket.send(JSON.stringify({ type: "consume", data: { producerId, rtpCapabilities: device.rtpCapabilities } }));
        }

        if (msg.type === "consumed") {
            const { id, producerId, kind, rtpParameters } = msg.data;

            const consumer = await recvTransport.consume({
                id,
                producerId,
                kind,
                rtpParameters,
            });

            const stream = new MediaStream([consumer.track]);
            addStream(stream);

            await consumer.resume();
        }
    });
}
