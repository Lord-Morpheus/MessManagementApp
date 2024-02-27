const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    userid:{
        type:String,
        required:true,
    },
    batch:{
        type: String,
        unique:true
    },
    hostelname:{
        type:String,   
        unique:true,
    },
    email:{
        type: String,
        unique:true,
    }
});


const Update=mongoose.model('User',userSchema);

module.exports=Update;