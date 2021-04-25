const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const testSchema = new Schema({
	joiningID: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		require: true,
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
	owner:{
		type:ObjectId,
		ref:"User"
	},
	questions: [
		{
			title: {
				type: String,
				required: true,
			},
			statement: {
				type: String,
				required: true,
			},
			options: [
				{
					type: String,
				},
			],
			ans: {
				type: Number,
				required: true,
			},
		},
	],
	attendes:[
		{
			user:{
				type:ObjectId,
				ref:"User",
			},
			score:{
				type:Number,
				default:0
			}
		}
	],
	time:{
		type:Number,
		default:30
	}
});

mongoose.model("Test", testSchema);
