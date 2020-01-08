const express=require('express');
const router=express.Router();

router.post('/signup',require('./signup'));
router.post('/login',require('./login'));

module.exports=router;