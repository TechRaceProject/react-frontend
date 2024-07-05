import io from 'socket.io-client';

const socket = io('ws://192.168.0.50/ws', {
    transports: ['websocket'],
});

export default socket;