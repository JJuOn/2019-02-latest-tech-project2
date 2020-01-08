const bcrypt=require('bcrypt-nodejs');
const User=require('../../models/users');
const user=new User();
const Login=(req,res)=>{
    const userId=req.body.userId;
    const password=req.body.password;
    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!userId || !password){
                reject({status:false,message:'undefined userid or password',data:[]});
            }
            else{
                resolve();
            }
        });
    }
    const UserCheck=()=>{
        return new Promise(async (resolve,reject)=>{
            try{
                const users=await user.getUserByUserId(userId);
                if(users.length==1){
                    resolve(users);
                }
                else{
                    reject({status:false,message:'no user exists',data:[]});
                }
            }
            catch (err){
                console.error(err);
                reject({status:false,message:'database error',data:[]});
            }
        });
    }
    const PasswordCompare=(users)=>{
        return new Promise((resolve,reject)=>{
            if(bcrypt.compareSync(password,users[0].password)){
                resolve();
            }
            else{
                reject({status:false,message:'password wrong',data:[]});
            }
        });
    }
    DataCheck()
    .then(UserCheck)
    .then(PasswordCompare)
    .then(()=>{
        req.session.userId=userId;
        res.status(200).json({status:true,message:'success',data:[]});
    })
    .catch((err)=>{
        res.status(500).json(err);
    });
}

module.exports=Login;