let ws;
// const identifier = JSON.stringify({
//   channel: "MessagesChannel"
// })
// const subcribeMessage = JSON.stringify({
//   command: "subscribe",
//   identifier: JSON.stringify({
//     channel: "MessagesChannel"
//   })
// })
function openSocket() {
  if (ws) {
    ws.close();
  }
  const socket = new WebSocket("ws://localhost:3000/notify");
  ws = socket
  socket.addEventListener('open', () => {
    console.log('ws open')
  });

  socket.addEventListener('message', ({ data }) => {
    try {
      let jsonData = JSON.parse(data);
      if (jsonData.message === "new_movie") {
        postMessage(jsonData);
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.addEventListener("error", () => {
    setTimeout(() => {
      openSocket();
    }, 1000)
  })
}
openSocket()

self.onmessage = ({ data }) => {
  if (data.type === "user_login") {
    openSocket();
  } else if (data.type === "user_logout") {
    openSocket();
  }
}
