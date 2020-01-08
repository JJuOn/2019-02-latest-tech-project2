const ParkingLot=require('../../models/parkingLots');
const parkingLot=new ParkingLot();
const Create=(req,res)=>{
    const name=req.body.name;
    const x=req.body.x;
    const y=req.body.y;
    const max_space=req.body.max_space;
    const DataCheck=()=>{
        return new Promise((resolve,reject)=>{
            if(!name || !x || !y || !max_space){
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
                const result=await parkingLot.insertParkingLot(name,x,y,max_space);
                resolve();
            }
            catch(err){
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