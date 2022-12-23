exports.profile = (req,res) =>{
    console.log(req.body);
    console.log('from customer profile')
    res.json({
        name : req.body.email,
        abc : 'this is customer profile'
    })
}