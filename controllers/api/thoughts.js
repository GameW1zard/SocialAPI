const router = require('express').Router();
const { user, thoughts, reaction } = require('../../schemas');

// get all thoughts

router.get("/",async function (req,res){
    try {
        const thoughtData = await thoughts.find()
        res.json(thoughtData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get thought by id

router.get("/:id", async function (req,res){
    try {
        const thoughtData = await thoughts.findById(req.params.id)
        res.json(thoughtData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// make a new thought

router.post("/", async function (req,res){
    try {
        const thoughtData = await thoughts.create(req.body)
        
        
        console.log(thoughtData)

        const findid = await user.findOne({username: thoughtData.username}).select('_id');

        //console.log(findid);

        const userData = await user.findByIdAndUpdate(findid, {$push: {thoughts: thoughtData._id}}, {new: true})

        console.log(userData)

        let total = {
            thoughtData,
            userData
        }

        res.json(total)

    } catch (err) {
        res.status(500).json(err)
    }
})


// update a thought by id

router.put("/:id", async function (req,res){
    try {
        const Updatedata = await thoughts.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(Updatedata)
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete a thought by id

router.delete("/:id", async function (req,res){
    try {
        const thoughtData = await thoughts.findByIdAndDelete(req.params.id)
        res.json(thoughtData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// make a new reaction

router.post("/:id/reactions", async function (req,res){ 
    try {
        const reactionData = await reaction.create(req.body)
        const thoughtData = await thoughts.findByIdAndUpdate(req.params.id, {$push: {reactions: reactionData._id}}, {new: true})
        let total = {
            thoughtData,
            reactionData
        }
        res.json(total)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// delete a reaction

router.delete("/:id/reactions/:reactionId", async function (req,res){
    try {
        const reactionData = await reaction.findByIdAndDelete(req.params.reactionId)
        const thoughtData = await thoughts.findByIdAndUpdate(req.params.id, {$pull: {reactions: req.params.reactionId}}, {new: true})
        let total = {
            thoughtData,
            reactionData
        }
        res.json(total)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;