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
        const {team,username,position,instaid,linkdin,image}=req.body;
        const UserData=new User({team,username,position,instaid,linkdin,image});
        const save = await UserData.save();
        res.status(200).json({save});
    }
    catch(error){
        console.error("error");
        res.status(500).json({msg:error.message});
    }
}

exports.updateUser = async (req, res) => {
    const {team,username,position,instaid,linkdin,image} = req.body;
    try{
        const updated = {};
        if(team) updated.team = team;
        if(username) updated.username = username;
        if(image) updated.image = image;
        if(position) updated.position = position;
        if(instaid) updated.instaid = instaid;
        if(linkdin) updated.linkdin = linkdin;

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