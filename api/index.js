const express=require('express');
const router=express.Router();

router.use('/parkinglot',require('./parkinglot'));
router.use('/parkingspace',require('./parkingspace'));
router.use('/user',require('./user'));

router.post('/test',(req,res)=>{
    const body=req.body;
    res.json({status:'success',data:body});
});

module.exports=router;