const express=require('express')
const router=express.Router();
const Tiffin=require('./../model/tiffin.model')
//importing models

const authenticateMiddleware=require('./middlewares/auth.middleware')

//routes

router.get('/',async (req,res)=>{
    try
    {
        let tiffins=await Tiffin.find({})
        return res.status(200).json(tiffins)
    }
    catch(e)
    {
        return res.sendStatus(500)
    }
})

router.post('/',authenticateMiddleware, async (req,res)=>{
    try
    {
        let tiffin=new Tiffin(req.body)
        tiffin=await tiffin.save()
        return res.status(201).json(tiffin)
    }
    catch(e)
    {
        if(e instanceof mongoose.Error.ValidationError)
        {
            let errors={}
            Object.keys(e.errors).forEach(key=>{
                errors[key]=e.errors[key].message
            })
            return res.status(400).json(errors)
        }
        else
            return res.sendStatus(500)
    }

})


module.exports=router