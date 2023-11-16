import { useEffect, useRef, useState } from 'react';

const WS_URL = `ws://localhost:3333`

function App() {
  const [receivedMessage, setReceivedMessage] = useState('')
  const socket = useRef()

  useEffect(() => {
    socket.current = new WebSocket(WS_URL)
    socket.current.onopen = () => console.log('ws opened')
    socket.current.onclose = () => console.log('ws closed')
    socket.current.onmessage = (msg) => { setReceivedMessage(msg.data) }
  }, [])

  const sendMessageUserHandler = () => {
    socket.current.send(JSON.stringify({ channel: 'user', message:'toto'}))
  }

  const open = () => {
    socket.current = new WebSocket(WS_URL)
  }
  
  const close = () => {
    socket.current.close()
  }

  return (
    <div className="App">
      <p>
        Message from server : {receivedMessage}
      </p>
      <button onClick={sendMessageUserHandler}>Send message to user api</button>
      <button onClick={close}>Close</button>
      <button onClick={open}>Open</button>

    </div>
  );
}

export default App;
