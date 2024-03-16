const User=require('../model/user.model');

exports.getUser=async(req,res)=>{
    try{
        const userData=await User.find();
        res.status(200).json({userData});
    }
    catch(error){
        res.status(500).json({msg:error.message});
    }
}

exports.addUser=async(req,res)=>{
    try{
        const {username,userid,batch,hostelname,email}=req.body;
        const UserData=new User({username,userid,batch,hostelname,email});
        const save = await UserData.save();
        res.status(200).json({save});
    }
    catch(error){
        console.error("error");
        res.status(500).json({msg:error.message});
    }
}

exports.updateUser = async (req, res) => {
    const {username,userid,batch,hostelname,email} = req.body;
    try{
        const updated = {};
        if(username) updated.username = username;
        if(userid) updated.userid = userid;
        if(batch) updated.batch = batch;
        if(hostelname) updated.hostelname = hostelname;
        if(email) updated.email = email;

        let UserData = await User.findById(req.params.id);
        if(!UserData) return res.status(404).json({msg: "Not found"});

        UserData  = await User.findByIdAndUpdate(req.params.id, {$set: updated}, {new: true});
        res.status(200).json(UserData);
    } catch(err) {
        res.status(500).json({msg: "Server error"});
    }
}

exports.deleteUser = async (req, res) => {
    try{
        let UserData = await User.findById(req.params.id);
        if(!UserData) return res.status(404).json({msg: "Not found"});

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: "Deleted successfully"});
    }
    catch(error){
        res.status(500).json({msg: error.message});
    }
}