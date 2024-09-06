import React, { useState, useEffect } from 'react';
import { firestore, auth } from '@lib/firebase/co'; /

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiverId, setReceiverId] = useState<string>('');

  useEffect(() => {
    
    const unsubscribe = firestore
      .collection('messages')
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
      });

    return () => unsubscribe();
  }, []);

  
  const sendMessage = async () => {
    if (newMessage.trim() && receiverId.trim()) {
      const { uid } = auth.currentUser!; 
      await firestore.collection('messages').add({
        text: newMessage,
        senderId: uid,
        receiverId: receiverId,
        createdAt: new Date(),
      });
      setNewMessage(''); 
    }
  };

  return (
    <div>
      <h2>Mensajes</h2>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <p>
              <strong>{message.senderId}</strong> a <strong>{message.receiverId}</strong>: {message.text}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        placeholder="ID del receptor..."
      />
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

export default Messages;
