const express = require("express");
const router = express.Router();
const mongoose=require('mongoose')
const fetch = require("node-fetch");
const { COMPILER }=require('../keys/keys');
const Problem = mongoose.model("Problem");

router.post('/api/compile',(req,res)=>{
    const {
        LanguageChoice,
        Program,
        Input,
        CompilerArgs
        } = req.body;
    const reqBody={
        LanguageChoice,
        Program,
        Input,
        CompilerArgs
    }    
    const request=async()=>{
        fetch(COMPILER, {
			method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
			body: JSON.stringify(reqBody),
		})
			.then((data) => data.json())
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((err) => {
				console.log(err);

				return res.status(421).json({
					error: "bad request",
				});
			});
    }
    

    request();
})

router.post('/api/result/:qID/:problemNo',(req,res)=>{
    const qID=req.params.qID;
    const problemNo=req.params.problemNo;

    Problem.findById(qID)
    .then(question=>{
        const { LanguageChoice, Program,CompilerArgs } = req.body;

        const reqBody = {
			LanguageChoice,
			Program,
			Input: question.input[problemNo],
			CompilerArgs,
		};

        const request = async () => {
            fetch(COMPILER, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            })
                .then((data) => data.json())
                .then((data) => {
                    
                    if (data.Errors == "Too many requests...")
                        return res.status(200).json({
							message: "Server Error",
						});

                    if (data.Errors)
                        return res.status(200).json({
                            message: "RE",
                        });

                    const output = data.Result;
                    const answer = question.output[problemNo];
                    
                    if(output===answer)
                        return res.status(200).json({
							message: 'AC',
						});

                    return res.status(200).json({
						message: "WA",
					});
                    
                })
                .catch((err) => {
                    console.log(err);

                    return res.status(421).json({
                        error: "bad request",
                    });
                });
        };

        request();
    })
    .catch(err=>{
        return res.status(421).json({
			error: "bad request",
		});
    })

})
module.exports = router;