import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import store from '../Redux/Stores';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

function HomePage() {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emails);

  useEffect(() => {
    // Connect to the socket server
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    // Subscribe to email updates
    socket.on('emailUpdated', (email) => {
      dispatch({ type: 'SET_EMAIL_DELIVERED', payload: email });
    });

    return () => {
      // Disconnect from the socket server
      socket.disconnect();
    };
  }, []);

  
  const handleAddEmail = async () => {
    const res = await fetch('/api/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'kasun@egmail.com',
        subject: 'Test email',
        text: 'Hello, this is a test email!',
        html: '<p>Hello, this is a <strong>test email</strong>!</p>',
      }),
    });

    if (res.ok) {
      const email = await res.json();
      dispatch({ type: 'ADD_EMAIL', payload: email });
    } else {
      console.error('Failed to add email');
    }
  };

  return (
    <div>
      <h1>Email Notification Requests</h1>
      <ul>
        {emails.map((email:any) => (
          <li key={email._id}>
            <p>To: {email.to}</p>
            <p>Subject: {email.subject}</p>
            <p>Text: {email.text}</p>
            </li>))}
            </ul>
            </div>)}