const pool=require('../pool');

const history=class{
    getAllHistories(){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query('SELECT * FROM HISTORIES');
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
    insertHistory(inout,parkinglot_id,parkingspace_id,user_id){
        if(user_id!==undefined){
            return new Promise(async(resolve,reject)=>{
                try{
                    const connection=await pool.getConnection(async conn=>conn);
                    try{
                        const [rows]=await connection.query('INSERT INTO HISTORIES(inout,parkinglot_id,parkingspace_id,user_id,created_at) VALUES(?,?,?,?,now())',[inout,parkinglot_id,parkingspace_id,user_id]);
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
        else{
            return new Promise(async(resolve,reject)=>{
                try{
                    const connection=await pool.getConnection(async conn=>conn);
                    try{
                        const [rows]=await connection.query('INSERT INTO HISTORIES(inout,parkinglot_id,parkingspace_id,created_at) VALUES(?,?,?,now())',[inout,parkinglot_id,parkingspace_id]);
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
}

module.exports=history;