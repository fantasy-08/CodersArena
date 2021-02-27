const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
	},
});

const PORT=process.env.PORT || 5000;

const mongoose = require("mongoose");
const { MONGOURI } = require("./keys/keys.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
io.on("connection", (socket) => {
	// Join a conversation
	const { roomId } = socket.handshake.query;
	socket.join(roomId);

	// Listen for new messages
	socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
		io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
	});

	// Leave the room if the user closes the socket
	socket.on("disconnect", () => {
		socket.leave(roomId);
	});
});

//DB-Schema
require("./models/question");
require("./models/coder");

//Routes
app.use(require("./routes/coder"));
app.use(require("./routes/compiler"));
app.use(require("./routes/problem"));

//DB Connection
mongoose.connect(MONGOURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on("connected", () =>
	console.log("Data Base has been connected")
);

mongoose.connection.on("error", () => {
	console.log("error connecting to Data Base");
});

server.listen(PORT, () => {
	console.log(`Listening and Running on port ${PORT}`);
});
