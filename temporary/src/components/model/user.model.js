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
        required:true,
    },
    hostelname:{
        type:String, 
        required:true,  
    },
    email:{
        type: String,
        required:true,
        unique:true,
    }
});


const Update=mongoose.model('User',userSchema);

module.exports=Update;