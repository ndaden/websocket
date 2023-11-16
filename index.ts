import { ServerWebSocket } from "bun";

Bun.serve({
  port: 3333,
  fetch(req, server) {
    const success = server.upgrade(req)
    if (success) {
      return;
    }
    return new Response('Upgrade to websocket failed.', { status: 500 })
  },
  websocket: {
    open: (ws) => {
      console.log('opened :', ws.data)
      ws.send('ws opened.')
      
    },
    message: function (ws: ServerWebSocket<unknown>, message: string | Buffer): void | Promise<void> {
      const data = JSON.parse(message as string)
      console.log('message from channel :', data.channel)
      ws.send(`You sent : ${data.message}`)
    },
    close: (ws) => {
      console.log('closed')
      ws.send('Socket closed :' + ws.data)
    }

  }
})