const User=require('../../models/users');
const ParkingSpace=require('../../models/parkingSpaces');
const History=require('../../models/histories');

const user=new User();
const parkingSpace=new ParkingSpace();
const history=new History();

const Update=(req,res)=>{
    const parkingLot_id=req.body.parkingLot_id;
    const parkingSpace_id=req.body.parkingSpace_id;
    const isFull=req.body.isFull;
    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!parkingLot_id || !parkingSpace_id || !isFull){
                reject({status:false,message:'undefined body',data:[]});
            }
            else{
                resolve();
            }
        });
    }
    const Update=()=>{
        return new Promise(async(resolve,reject)=>{
            try{
                const result=await parkingSpace.updateParkingSpaceById(parkingLot_id,parkingSpace_id,isFull);
                resolve();
            }
            catch(err){
                console.error(err);
                reject({status:false,message:'database error',data:[]});
            }
        });
    }
    const GetUser=()=>{
        return new Promise(async(resolve,reject)=>{
            try{
                if(req.session.userId!==undefined){
                    const users=await user.getUserByUserId(req.session.userId);
                    resolve(users);
                }
                else{
                    resolve(null);
                }
            }
            catch(err){
                console.error(err);
                reject({status:false,message:'database error',data:[]});
            }
        });
    }
    const AddHistory=(users)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                if(users===null){
                    const result=await history.insertHistory(isFull,parkingLot_id,parkingSpace_id,undefined);
                    resolve();
                }
                else{
                    const result=await history.insertHistory(isFull,parkingLot_id,parkingSpace_id,users[0]['id']);
                    resolve();
                }
            }
            catch(err){
                console.error(err);
                reject({status:false,message:'database error',data:[]});
            }
        });
    }
    DataCheck()
    .then(Update)
    .then(GetUser)
    .then(AddHistory)
    .then(()=>{
        res.status(200).json({status:true,message:'success',data:[]});
    })
    .catch((err)=>{
        res.status(500).json(err);
    });
}

module.exports=Update;