
const mongoose=require('mongoose');
const {Schema}=mongoose;

const problemSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	statement: {
		type: String,
		required: true,
	},
	sampleInput: {
		type: String,
		default: "",
	},
	sampleOutput: {
		type: String,
		default: "",
	},
	constrain: [
		{
			type: String,
			default: "",
		},
	],
	testCaseSize: {
		type: Number,
		default: 0,
	},
	inputF: {
		type: String,
		default: "10",
	},
	outputF: {
		type: String,
		default: "10",
	},
	executionTime: {
		type: String,
		default: "10",
	},
	input: [
		{
			type: String,
			default: "",
		},
	],
	output: [
		{
			type: String,
			default: "",
		},
	],
});

mongoose.model("Problem",problemSchema);