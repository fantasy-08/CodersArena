const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Problem = mongoose.model("Problem");

router.post('/api/createquestion',(req,res)=>{
    const {
		title,
		statement,
		sampleInput,
		sampleOutput,
		constrain,
		testCaseSize,
		inputF,
		outputF,
		executionTime,
		input,
		output,
	} = req.body;

    if(!title || !statement)
        return res.status(422).json({
			error: "Invalid paramenters",
		});
    
    const new_problem = new Problem({
		title,
		statement,
		sampleInput,
		sampleOutput,
		constrain,
		testCaseSize,
		inputF,
		outputF,
		executionTime,
		input,
		output,
	});

    new_problem
		.save()
		.then((Result) => {
			return res.json({ problem: Result });
		})
		.catch((err) => {
			console.log(err);
			return res.status(401).json({
				error:"Can't save the question"
			})
		});
})

router.get('/api/question/:qID',(req,res)=>{
    const qID=req.params.qID;
    Problem.findById(qID)
    .then(problem=>{
		data = {
			title: problem.title,
			statement: problem.statement,
			sampleInput: problem.sampleInput,
			sampleOutput: problem.sampleOutput,
			constrain: problem.constrain,
			testCaseSize: problem.testCaseSize,
			inputF: problem.inputF,
			outputF: problem.outputF,
			executionTime: problem.executionTime,
		};

        return res.status(200).json(data);
    })
    .catch(err=>{
        return res.status(421).json({
            error:"no such question exist"})
    })
})

router.delete("/api/question/:qID", (req, res) => {
	const qID = req.params.qID;
    Problem.findById(qID)
    .then(p=>{
        Problem.findByIdAndDelete(qID);
        return res.status(200).json({
            message: "deleted succesfully",
        });
    })
    .catch(err=>{
        return res.status(421).json({
			error: "no such question exist",
		});
    })	
});

router.put("/api/question/:qID", (req, res) => {
	const qID = req.params.qID;
    const {
		title,
		statement,
		sampleInput,
		sampleOutput,
		constrain,
		testCaseSize,
		inputF,
		outputF,
		executionTime,
		input,
		output,
	} = req.body;

	if (!title || !statement)
		return res.status(422).json({
			error: "Invalid paramenters",
    });
    const new_problem = {
		title,
		statement,
		sampleInput,
		sampleOutput,
		constrain,
		testCaseSize,
		inputF,
		outputF,
		executionTime,
		input,
		output,
	};
	Problem.findById(qID)
		.then((p) => {
			Problem.findByIdAndUpdate(qID, new_problem)
				.then((result) => {
					return res.status(200).json({
						message: "editted succesfully",
					});
				})
				.catch((err) => {
					console.log(err)
					return res.status(422).json({
						error: "unexpected error occured",
					});
				});
        })
		.catch((err) => {
			return res.status(421).json({
				error: "no such question exist",
			});
		});
});

module.exports=router;