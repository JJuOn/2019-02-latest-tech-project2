const express=require('express');
const router=express.Router();

router.post('/create',require('./create'));
router.post('/update',require('./update'));

module.exports=router;