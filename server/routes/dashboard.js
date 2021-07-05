const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Test = mongoose.model("Test");

const requiredLogin = require("../middleware/requireLogin");

router.get("/api/user", requiredLogin, (req, res) => {
	const user = req.user;
	var detail = {};
	detail["userinfo"] = {
		name: user.name,
		email: user.email,
		createdOn: user.createdOn,
	};
	detail["combat"] = {
		fightWon: user.fightWon,
		fightFought: user.fightFought,
	};
	Test.find({ owner: user._id })
		.populate("attendes.user")
		.then((test_Owned) => {
			detail["my_test"] = [];
			test_Owned.forEach((T) => {
				detail["my_test"].push({
					joinID: T._id,
					createdOn: T.createdOn,
					name: T.name,
					attendes: [
						T.attendes.map((U) => {
							return {
								score: U.score,
								user: {
									name: U.user.name,
									email: U.user.email,
								},
							};
						}),
					],
				});
			});

			return res.status(200).json({
				message: "user found",
				payload: detail,
			});
		});

});

router.get("/api/my_test_data", requiredLogin, (req, res) => {
	const user = req.user;
	Test.find({
		attendes: {
			$elemMatch: {
				user: user._id,
			},
		},
	})
		.then((data) => {
			payload = [];
			data.forEach((d) => {
				var D = d.attendes.find((o) => {
					return `${o["user"]}` === `${user._id}`;
				});
				payload.push(
					(obj = {
						name: d.name,
						joinID: d._id,
						score: D && D.score ? D.score : 0,
					})
				);
			});
			return res.json({ message: "found", payload });
		})
		.catch((err) => {
			console.log(err);
			return res.json({ error: "contact admin" });
		});
});

module.exports = router;
