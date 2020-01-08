const pool=require('../pool');

const user=class {
    getAllUser(){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query('SELECT * FROM USERS');
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
    getUserById(id){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query('SELECT * FROM USERS WHERE user_id=?',[id]);
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
    getUserByUserId(userId){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query('SELECT * FROM USERS WHERE id=?',[userId]);
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
    insertUser(id,password){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query('INSERT INTO USERS(id,password) VALUES(?,?)',[id,password]);
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
    deleteUserById(id){
        return new Promise(async(resolve,reject)=>{
            try{
                const connection=await pool.getConnection(async conn=>conn);
                try{
                    const [rows]=await connection.query('DELETE FROM USERS WHERE id=?',[id]);
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

module.exports=user;