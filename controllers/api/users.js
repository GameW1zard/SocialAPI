const router = require('express').Router();

const { user, thoughts, reaction } = require('../../schemas');


// get all users

router.get('/', async function (req, res) {
    try {
    const userdata = await user.find()
    res.json(userdata)
    } catch (err) {
        res.status(500).json(err)
    }
});

// get user by id

router.get('/:id', async function (req, res) {
    try {
        const userdata = await user.findById(req.params.id)
        res.json(userdata)
    } catch (err) {
        res.status(500).json(err)
    }
});

// make a new user


router.post("/", async function (req, res) {
    try {
        const userdata = await user.create(req.body)
        res.json(userdata)
    } catch (err) {
        res.status(500).json(err)
    }
})


// update a user by id

router.put("/:id", async function (req, res) {
    try {
       let id = req.params.id
       let put = req.body
    const Updatedata = await user.findByIdAndUpdate(id, put, {new: true});
    res.json(Updatedata)
    } catch (err) {
        console.log (err)
        res.status(500).json(err)
    }
})

// delete a user by id

router.delete("/:id", async function (req, res) {
    try {
        const userdata = await user.findByIdAndDelete(req.params.id)
        res.json(userdata)
    } catch (err) {
        res.status(500).json(err)
    }
})

// add a friend

router.post("/:id/friends/:friendId", async function (req, res) {
    try {
        const userdata = await user.findByIdAndUpdate(req.params.id, {$push: {friends: req.params.friendId}}, {new: true})
        res.json(userdata)
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete a friend

router.delete("/:id/friends/:friendId", async function (req, res) {
    try {
        const userdata = await user.findByIdAndUpdate(req.params.id, {$pull: {friends: req.params.friendId}}, {new: true})
        res.json(userdata)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;