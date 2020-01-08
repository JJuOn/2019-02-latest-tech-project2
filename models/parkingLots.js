const pool=require('../pool');

const parkingLot=class {
    getAllParkingLot(){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query('SELECT * FROM PARKINGLOTS');
                    connection.release();
                    resolve(rows);
                }
                catch(err){
                    connection.release();
                    reject(err);
                }
            }
            catch(err){
                reject(err);
            }
        });
    }
    insertParkingLot(name,x,y,max_space){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query('INSERT INTO PARKINGLOTS(name,x,y,max_space) VALUES(?,?,?,?)',[name,x,y,max_space]);
                    connection.release();
                    resolve(rows);
                }
                catch(err){
                    connection.release();
                    reject(err);
                }
            }
            catch(err){
                reject(err);
            }
        });
    }
    updateParkingLotById(parkinglot_id,name,x,y,max_space){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query('UPDATE PARKINGLOTS SET name=?,x=?,y=?,max_space=? WHERE parkinglot_id=?',[name,x,y,max_space,parkinglot_id]);
                    connection.release();
                    resolve(rows);
                }
                catch(err){
                    connection.release();
                    reject(err);
                }
            }
            catch(err){
                reject(err);
            }
        });
    }
}

module.exports=parkingLot;