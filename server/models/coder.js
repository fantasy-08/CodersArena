const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const coderSchema = new Schema({
	joiningID: {
		type: String,
		required: true,
	},
	question: {
		type: ObjectId,
        ref:"Problem"
	},
    createdOn:{
        type:Date,
        default:Date.now
    }
});

mongoose.model("Coder", coderSchema);
