const User=require('../../models/users');
const user=new User();
const bcrypt=require('bcrypt-nodejs');
const Signup=(req,res)=>{
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
                if(users.length==0){
                    resolve();
                }
                else{
                    reject({status:false,message:'userid already exists',data:[]})
                }
            }
            catch (err){
                console.error(err);
                reject({status:false,message:'database error',data:[]})
            }
        });
    }
    const Encrypt=()=>{
        return new Promise(async(resolve,reject)=>{
            const salt=bcrypt.genSaltSync(10);
            const hasedPassword=bcrypt.hashSync(password,salt,null);
            resolve(hasedPassword);
        });
    }
    const Insert=(hasedPassword)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                const result=await user.insertUser(userId,hasedPassword);
                resolve();
            }
            catch (err){
                console.error(err);
                reject({status:false,message:'database error',data:[]});
            }
        });
    }
    DataCheck()
    .then(UserCheck)
    .then(Encrypt)
    .then(Insert)
    .then(()=>{
        res.status(200).json({status:true,message:'success',data:[]});
    })
    .catch((err)=>{
        res.status(500).json(err);
    })

}

module.exports=Signup;