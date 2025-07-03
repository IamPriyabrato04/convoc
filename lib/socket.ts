// lib/socket.ts
let socket: WebSocket | null = null;

export function connectSocket({ token, roomId }: { token: string; roomId: string }) {
    return new Promise<WebSocket>((resolve, reject) => {
        const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
        if (!socketUrl) {
            reject(new Error('NEXT_PUBLIC_SOCKET_URL is not defined'));
            return;
        }
        socket = new WebSocket(socketUrl);
        console.log(socketUrl);

        socket.onopen = () => {
            socket?.send(JSON.stringify({ type: 'join', token, roomId }));
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'joined') {
                resolve(socket!);
            }
        };

        socket.onerror = (err) => {
            reject(err);
        };
    });
}

export function getSocket(): WebSocket {
    if (!socket) throw new Error('WebSocket not connected');
    return socket;
}
