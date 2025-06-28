// lib/socket.ts
let socket: WebSocket | null = null;

export function connectSocket({ token, roomId }: { token: string; roomId: string }) {
    return new Promise<WebSocket>((resolve, reject) => {
        socket = new WebSocket(process.env.NEXT_PUBLIC_SFU_URL || 'ws://localhost:3001');

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
