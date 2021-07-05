const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const publicTestSchema = new Schema({
    testname: {
        type: String,
        required: true,
    },
    joiningID: {
        type: String,
        required: true,
    },
});

mongoose.model("PublicTest", publicTestSchema);
