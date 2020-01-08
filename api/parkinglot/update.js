const ParkingLot=require('../../models/parkingLots');
const parkingLot=new ParkingLot();
const Update=(req,res)=>{
    const parkingLot_id=req.body.parkingLot_id;
    const name=req.body.name;
    const x=req.body.x;
    const y=req.body.y;
    const max_space=req.body.max_space;
    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!parkingLot_id || !name || !x || !y || !max_space){
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
                const result=await parkingLot.updateParkingLotById(parkingLot_id,name,x,y,max_space);
                resolve();
            }
            catch(err){
                console.error(err);
                reject({status:false,message:'database error',data:[]});
            }
        });
    }
    DataCheck()
    .then(Update)
    .then(()=>{
        res.status(200).json({status:true,message:'success',data:[]});
    })
    .catch((err)=>{
        res.status(500).json(err);
    })
}

module.exports=Update;