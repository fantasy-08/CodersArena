const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Problem = mongoose.model("MCQProblem");
const Test = mongoose.model("Test");
const requireLogin = require("../middleware/requireLogin");
const { v4: uuidv4 } = require("uuid");
const PublicTest = mongoose.model("PublicTest");

router.get("/api/test/:testID/owner", requireLogin, (req, res) => {
	const testID = req.params.testID;
	Test.findById(testID)
		.then((test) => {
			if (`${test.owner}` === `${req.user._id}`) {
				return res.json(test);
			} else {
				return res.json({
					error: "No access",
				});
			}
		})
		.catch((err) => {
			return res.json({
				error: "No such test exist",
			});
		});
});
router.get("/api/public/test", (req, res) => {
	PublicTest.find({})
		.then((data) => {
			return res.json({ message: data });
		})
		.catch((err) => {
			return res.json({ error: err });
		});
});
router.put("/api/public/test/:testID", requireLogin, (req, res) => {
	const testID = req.params.testID;
	console.log(testID);
	Test.findById(testID)
		.then((data) => {
			if (`${data.owner}` === `${req.user._id}`) {
				var toDo = !data.isPublic;
				data.isPublic = toDo;
				Test.findByIdAndUpdate(testID, data).then((d) => {
					if (data.isPublic) {
						PublicTest.deleteOne({ testname: d.name }, (err) => {
							if (err) {
								return res.json({
									error: "Error",
								});
							}
							return res.json({
								message: "Success Delete",
							});
						});
					} else {
						const A = new PublicTest({
							testname: d.name,
							joiningID: testID,
						});

						A.save()
							.then((D1) => {
								return res.json({
									message: "success",
								});
							})
							.catch((err) => {
								return res.json({
									error: "ERROR",
								});
							});
					}
				});
			} else {
				return res.json({
					error: "No access",
				});
			}
		})
		.catch((err) => {
			return res.json({ error: "No such test exist" });
		});
});

router.put("/api/test_name/:name/:testID", (req, res) => {
	const testID = req.params.testID;
	const name = req.params.name;
	Test.findById(testID)
		.then((test) => {
			test.name = name;
			Test.findByIdAndUpdate(testID, test)
				.then((d) => {
					return res.status(200).json({
						message: "Test update success",
					});
				})
				.catch((err) => {
					return res.status(401).json({
						error: "Test update un-success | contact ADMIN",
					});
				});
		})
		.catch((err) => {
			return res.status(401).json({
				error: "Test update un-success | contact ADMIN",
			});
		});
});
router.put("/api/test_time/:testID/:time", (req, res) => {
	const testID = req.params.testID;
	const time1 = req.params.time;
	Test.findById(testID)
		.then((test) => {
			test.time = time1;
			Test.findByIdAndUpdate(testID, test)
				.then((d) => {
					return res.status(200).json({
						message: "Test update success",
					});
				})
				.catch((err) => {
					return res.status(401).json({
						error: "Test update un-success | contact ADMIN",
					});
				});
		})
		.catch((err) => {
			return res.status(401).json({
				error: "Test update un-success | contact ADMIN",
			});
		});
});
router.post("/api/createTest", requireLogin, (req, res) => {
	var new_ID = uuidv4();
	var test_name = req.body.test_name;
	const new_test = new Test({
		joiningID: new_ID,
		name: test_name,
		questions: [],
		owner: req.user,
		attendes: [],
	});

	new_test
		.save()
		.then((test) => {
			return res.status(200).json({
				message: "Test create success",
				testID: test._id,
			});
		})
		.catch((err) => {
			console.log(err);
			return res.status(401).json({
				message: "Test create un-success",
			});
		});
});

router.delete("/api/:testID", requireLogin, (req, res) => {
	const testID = req.params.testID;
	Test.findByIdAndDelete(testID)
		.then((data) => {
			return res.status(200).json({
				message: "Test deleted success",
			});
		})
		.catch((err) => {
			return res.status(401).json({
				message: "Test deleted un-success | contact ADMIN",
			});
		});
});

module.exports = router;
