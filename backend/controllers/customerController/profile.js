exports.profile = (req,res) =>{
    console.log(req.user);
    console.log('from customer profile')
    res.json({
        userData : req.user
    });
}