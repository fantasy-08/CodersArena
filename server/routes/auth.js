const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys/keys");
const requiredLogin = require("../middleware/requireLogin");

router.get("/protected", requiredLogin, (req, res) => {
	console.log(req.user);
	res.send("user");
});

router.post("/signup", (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res.status(422).json({
			error: "Invalid request",
		});
	}

	User.findOne({ email: email })
		.then((savedUser) => {
			if (savedUser) {
				return res.status(422).json({
					error: "User already exists",
				});
			}

			bcrypt.hash(password, 14).then((hashed_password) => {
				const user_ = new User({
					name,
					email,
					password: hashed_password,
				});

				user_
					.save()
					.then((user) => {
						res.json({
							message: "Signed up succesfully",
						});
					})
					.catch((err) => console.log(err));
			});
		})
		.catch((err) => console.log(err));
});

router.post("/signin", (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(422).json({
			error: "Invalid parameters",
		});
	}

	User.findOne({ email: email }).then((savedUser) => {
		if (!savedUser) {
			return res.status(422).json({
				error: "No user with this mail",
			});
		}
		bcrypt.compare(password, savedUser.password).then((found) => {
			if (!found) {
				return res.status(422).json({
					error: "Invalid password",
				});
			}

			const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
			return res.json({ token, user: {
                fightWon:savedUser.fightWon,
				fightFought:savedUser.fightFought,
                name:savedUser.name,
                email:savedUser.email,
                createdOn:savedUser.createdOn
            } });
		});
	});
});

router.put('/won',requiredLogin,(req,res)=>{
	User.findById(req.user._id)
	.then(data=>{
		data.fightWon+=1;
		User.findByIdAndUpdate(req.user._id,data)
		.then(d=>{
			return res.status(200).json({
			message:"won"
		})})
		.catch(err=>{
			res.status(201).json({
			error:"don't know why?"
		})})
	})
	.catch(err=>{
		res.status(201).json({
			error:"don't know why?"
	})})
})

router.put("/play", requiredLogin, (req, res) => {
User.findById(req.user._id)
	.then((data) => {
		data.fightFought+= 1;
		User.findByIdAndUpdate(req.user._id, data)
			.then(data=>{
				return res.status(200).json({
					message: "play",
				})
			})
			.catch(err=>{
				return res.status(201).json({
					error: "don't know why?",
				})}
			);
	})
	.catch(err=>{
		return res.status(201).json({
			error: "don't know why err?",
		})
	});
});

module.exports = router;
