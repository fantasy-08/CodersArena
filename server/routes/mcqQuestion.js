const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Test = mongoose.model("Test");
const requireLogin = require("../middleware/requireLogin");
const { route } = require("./test");

router.post('/api/:testID/giveTest',requireLogin,(req,res)=>{
	const testID=req.params.testID
	Test.findById(testID)
	.then(data=>{
		data.attendes.forEach(ATTEND=>{
			if(`${ATTEND.user}` === `${req.user._id}`){
				return res.json({
					'error':'User already attempted the test'
				})
			}
		})
		var val=data.questions;
		val.forEach(element => {
			element.ans=0
		});
		return res.json({
			message:val
		})
	})
	.catch(err=>{
		console.log(err)
		return res.status(421).json({
			error: "not proper format / contact admin",
		});
	})
})

router.post('/api/:testID/evaluate',requireLogin,(req,res)=>{
	var score_=0;
	const testID=req.params.testID;
	const response=req.body;

	Test.findById(testID)
	.then((test)=>{
		
		var found=false
		test.attendes.forEach((ATTEND) => {
			if (`${ATTEND.user}` === `${req.user._id}`) {
				found=true;
			}
		});

		if(!found)
		{
			const questions = test.questions;
			questions.forEach((ques) => {
				const qID = ques._id;
				if (response[qID] && response[qID] === ques.ans) score_ += 10;
			});
			test.attendes.push({
				user: req.user._id,
				score: score_,
			});
			Test.findByIdAndUpdate(testID, test)
				.then((data_) => {
					return res.json({ message: "Evaluation Successful" });
				})
				.catch((err) => {
					return res.json({ error: "Save Error" });
				});
		}
		return res.json({ message: "Evaluation Successful (User already attempted test no update required)" });
	})
	.catch(err=>{		
		return res.json({ error: "test doesn't exist" });
	})
})

router.get('/api/:testID/get_result',requireLogin,(req,res)=>{
	const testID = req.params.testID;
	Test.findById(testID)
	.then((test)=>{
		test.attendes.forEach(ATTEND=>{
			if (`${ATTEND.user}` === `${req.user._id}`) {
				return res.json({message:'found user',score:ATTEND.score});
			}
		})
		return res.json({ error: "user has not attempted the test yet" });
	})
	.catch((err)=>{
		return res.json({ error: "test doesn't exist" });
	})
})

router.get('/api/:testID/leaderboard',(req,res)=>{
	const testID = req.params.testID;
	Test.findById(testID)
		.populate("attendes.user")
		.then((test) => {
			const return_obj=[]
			test.attendes.forEach(ATTEND=>{
				var A={
					score:ATTEND.score,
					name:ATTEND.user.name,
					email:ATTEND.user.email
				}
				return_obj.push(A)
			})
			return res.json({ message: return_obj });
		})
		.catch((err) => {
			return res.json({ error: "test doesn't exist" });
		});
})

router.get('/api/:testID/time',(req,res)=>{
	const testID=req.params.testID
	Test.findById(testID)
	.then(data=>{
		return res.json(data.time);
	})
	.catch(err=>{
		console.log(err);
	})
})
router.post("/api/:testID/question", requireLogin, (req, res) => {
	const { title, statement, options, ans } = req.body;
	const testID = req.params.testID;
	
	Test.findById(testID)
		.then((test) => {
			//access check
			if(`${test.owner}`!==`${req.user._id}`){
				return res.json(201).json({"error":"No access to you given contact owner"})
			}

			const temp_question = {
				title,
				statement,
				options,
				ans,
			};

            test.questions.push(temp_question);
			test
				.save()
				.then((test) => {
                    return res.status(200).json({
                        message:"test updated successs"
                    })
                })
				.catch((err) => {
					console.log(err);
					return res.status(421).json({
						error: "not proper format / contact admin",
					});
				});
		})
		.catch((err) => {
			console.log(err);
			return res.status(421).json({
				error: "no such test exist",
			});
		});
});

router.delete("/api/:testID/:qID", requireLogin, (req, res) => {
	const qID=req.params.qID
	const testID=req.params.testID
	Test.findById(testID)
		.then((test) => {
			const temp=test.questions.filter(ques=>ques._id!=qID)
			Test.findByIdAndUpdate(testID,{questions:temp})
			.then(data=>{
				return res.json({message:'removal success'})
			})
			.catch(err=>{
				console.log(err);
				return res.json({ error: "removal not-success" });
			})
		})
		.catch(err=>{
			console.log(err)
			return res.json({ error: "removal not-success" });
		})
});
module.exports = router;
