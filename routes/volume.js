var express = require('express');
var router = express.Router();

const loudness = require('loudness')

// Home page route.

router.get("/",async (req,res)  => {
    const vol = await loudness.getVolume()
    console.log(vol)
    res.send(toString(vol));
})

router.get("/up",async (req,res)  => {
    const vol = await loudness.getVolume()

    await loudness.setVolume(vol===100 ? 100  :vol+1)
    console.log(vol)


    res.send(toString(vol));
})

router.get("/down",async (req,res)  => {
    const vol = await loudness.getVolume()
    await loudness.setVolume( vol===0 ? 0  : vol-1)
    console.log(vol)
    res.send(toString(vol));
})

router.post("/variable",async (req,res)  => {
    console.log(req.body)
    const vol = await loudness.getVolume()
    console.log(vol)
    res.send(toString(vol));
})




module.exports = router;