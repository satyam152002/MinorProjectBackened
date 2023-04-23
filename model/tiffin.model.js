const mongoose=require('mongoose')

const tiffinSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please Provide Title']
    },
    meals:{
        type:String,
        required:[true,'Please Provide Meals']
    },
    city:{
        type:String,
        required:[true,'Please Provide City']
    },
    address:{
        type:String,
        required:[true,'Please Provide Address']
    },
    price:{
        type:Number,
        required:true,
        min:[0,"Not a valid price"]
    },
    mobileNumber:{
        type:Number,
        validator:{
            message:(props)=>`Please provide 10 digit number`,
            validate:function(value)
            {
                if((value+"").length<10)
                    return false
                return true                
            }
        }
    }
})


module.exports=mongoose.model('Tiffin',tiffinSchema);