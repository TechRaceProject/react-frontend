const socket = new WebSocket('ws://192.168.1.50/ws');

socket.onopen = () => {
    console.log('Connexion WebSocket établie.');
};

socket.onmessage = (event) => {
    console.log('Message reçu :', event.data);
};

socket.onclose = (event: Event) => {
    console.log('Connexion fermée');
};

socket.onerror = (error) => {
    console.error('Une erreur WebSocket est survenue :', error);
};


socket.onopen = () => {
  console.log('Connexion WebSocket établie.');
};


socket.onmessage = (event) => {
  console.log('Message reçu :', event.data);
};


socket.onclose = (event: Event) => {
  console.log('Connexion fermée');

};


socket.onerror = (error) => {
  console.error('Une erreur WebSocket est survenue :', error);
};



export default socket;
