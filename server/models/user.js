const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
	fightWon: {
		type: Number,
		default: 0,
	},
	fightFought: {
		type: Number,
		default: 0,
	},
});

mongoose.model("User", userSchema);
