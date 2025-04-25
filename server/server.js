// nodemon server.js

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

let messages = [];
let subscribers = [];

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(cors());

app.use(express.static("public"));

var corsOption = function (req, callback) {
  callback(null, { origin: false });
};

app.get("/messages", cors(corsOption), (req, res) => {
  subscribers[subscribers.length + 1] = res;

  // Función que se encarga de enviar mensajes a los clientes que
  // estén suscritos cuando haya mensajes en el servidor
  const waitForMessages = () => {
    if (messages.length > 0) {
      res.json({ messages });
      subscribers = [];
      messages = [];
    }
  };

  // Se invoca inmediatamente después de definir la función,
  // lo que significa que intentará enviar mensajes disponibles
  // tan pronto como alguien se suscriba.
  waitForMessages();
});

// Método para provocar un timeout en el servidor y ver como se relanza la petición desde el cliente
app.get("/messagesTimeOut", cors(corsOption), (req, res) => {
  setTimeout(() => {
    res
      .status(502)
      .send("Error 502: Bad Gateway - Problema en el servidor intermedio");
  }, 3000);
});

app.post("/sendMessage", express.json(), (req, res) => {
  const { message } = req.body;
  messages.push(message);

  //console.log("Messages: ", messages);
  subscribers.forEach((resSubs) => {
    resSubs.send({ messages });
  });

  subscribers = [];
  messages = [];

  res.send("Message received");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
