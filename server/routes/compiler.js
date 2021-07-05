const express = require("express");
const router = express.Router();
const mongoose=require('mongoose')
const fetch = require("node-fetch");
const { _COMPILER,_clientId,_clientSecret }=require('../keys/keys');
const Problem = mongoose.model("Problem");

const languageMap = {
    "5": {
        "language":"python3",
        "versionIndex":"0"
    },
    "7": {
        "language":"cpp",
        "versionIndex":"4"
    },
    "6": {
        "language":"c",
        "versionIndex":"4"
    },
    "4": {
        "language":"java",
        "versionIndex":"3"
    },
    "1": {
        "language":"csharp",
        "versionIndex":"3"
    },
    "8": {
        "language":"php",
        "versionIndex":"3"
    },
    "12": {
        "language":"ruby",
        "versionIndex":"3"
    },
    "17": {
        "language":"nodejs",
        "versionIndex":"3"
    },
}
const clientId = process.env.clientId || _clientId
const COMPILER = process.env.COMPILER || _COMPILER
const clientSecret=process.env.clientSecret || _clientSecret
router.post('/api/compile',(req,res)=>{
    const {
        LanguageChoice,
        Program,
        Input,
        CompilerArgs
        } = req.body;
    const reqBody={
        ...languageMap[LanguageChoice],
        "script":Program,
        "stdin":Input,
        clientId:clientId,
        clientSecret: clientSecret,
    }
    
    const request=async()=>{
        fetch(COMPILER, {
			method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
			body: JSON.stringify(reqBody),
		})
			.then((data) => data.json())
			.then((data) => {
				if (data.error) {
					return res.status(200).json({"Errors":data.error});	
				}
				return res.status(200).json({"Result":data.output, "Errors":null});
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

        const reqBody={
            ...languageMap[LanguageChoice],
            "script":Program,
            "stdin":question.input[problemNo],
            clientId:clientId,
            clientSecret: clientSecret,
        }  

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
                    
                    if (data.error == "Too many requests...")
                        return res.status(200).json({
							message: "Server Error",
						});

                    if (data.error)
                        return res.status(200).json({
                            message: "RE",
                        });

                    const output = data.output;
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