const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys/keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const secret=process.env.JWT_SECRET||JWT_SECRET;
module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({
			error: "you must be logged in",
		});
	}
	const token = authorization.replace("Bearer ", "");
	jwt.verify(token, secret, (err, payload) => {
		if (err) {
			return res.status(401).json({
				error: "you must be logged in",
			});
		}

		const { _id } = payload;
		User.findById(_id).then((user_) => {
			req.user = user_;
			next();
		});
	});
};
