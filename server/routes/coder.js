const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Coder = mongoose.model("Coder");
const Problem=mongoose.model("Problem");

router.post('/api/user/:joinID',(req,res)=>{
    const joinID=req.params.joinID;

    Coder.find({ joiningID:joinID })
    .then(user=>{
        if(user.length)
            {
                var new_user = user[0];
                var obj = {
					createdOn: new_user.createdOn,
					_id: new_user._id,
					joiningID: new_user.joiningID,
					question: new_user.question._id,
				};
                return res.status(200).json({"user":obj});
            }
        Problem.count().exec(function (err, count) {
			// Get a random entry
			var random = Math.floor(Math.random() * count);

			// Again query all users but only fetch one offset by our random #
			Problem.findOne()
				.skip(random)
				.exec( (err, result) => {
					if(err) return res.status(402).json({
                        error:"some error occured"
                    })

                    const new_user = new Coder({
						joiningID: joinID,
						question:result
					});

                    new_user.save()
                    var obj = {
						createdOn: new_user.createdOn,
						_id: new_user._id,
						joiningID: new_user.joiningID,
						question: new_user.question._id,
					};
                    return res.status(200).json({
                        user: obj
                    });
				});
		});

    })
    .catch(err=>{
        return res.status(402).json({
            error: "some error occured",
        });
    })
})
router.get("/api/user/:joinID",(req,res)=>{
    const joinID = req.params.joinID;

    Coder.find({ joiningID: joinID })
        .then((user) => {
            if (user.length) {
                var new_user = user[0];
                var obj = {
                    createdOn: new_user.createdOn,
                    _id: new_user._id,
                    joiningID: new_user.joiningID,
                    question: new_user.question._id,
                };
                return res.status(200).json({ user: obj });
            }
            else{
                res.status(200).json({
                    error:'no such FIGHT exist'
                })
            }
        })
        .catch((err) => {
            return res.status(402).json({
                error: "some error occured",
            });
        });
});

router.delete('/api/user/:joinID',(req,res)=>{
    const joinID=req.params.joinID;
    Coder.findOneAndDelete({ joiningID:joinID })
		.then((result) => {
            if(result)
			return res.status(200).json({
				message: "Session removed success",
			});
            return res.status(421).json({
				message: "Session removed un-successful",
			});
		})
		.catch((err) => {
			return res.status(421).json({
				message: "Session removed un-successful",
			});
		});
});

module.exports = router;