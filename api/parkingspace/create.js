const ParkingSpace=require('../../models/parkingSpaces');
const parkingSpace=new ParkingSpace();
const Create=(req,res)=>{
    const parkinglot_id=req.body.parkinglot_id;
    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!parkinglot_id){
                reject({status:false,message:'undefined userid or password',data:[]});
            }
            else{
                resolve();
            }
        });
    }
    const Insert=()=>{
        return new Promise(async(resolve,reject)=>{
            try{
                const result=await parkingSpace.insertParkingSpace(parkinglot_id);
            }
            catch (err){
                console.error(err);
                reject({status:false,message:'database error',data:[]});
            }
        });
    }
    DataCheck()
    .then(Insert)
    .then(()=>{
        res.status(200).json({status:true,message:'success',data:[]});
    })
    .catch((err)=>{
        res.status(500).json(err);
    });
}

module.exports=Create;