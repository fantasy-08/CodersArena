const mongoose = require("mongoose");
const { Schema } = mongoose;

const problemSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	statement: {
		type: String,
		required: true,
	},
	options:[
        {
            type:String,
        }
    ],
    ans:{
        type:Number,
        required:true
    }
});

mongoose.model("MCQProblem", problemSchema);
