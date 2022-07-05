const mysql = require('mysql')

const insertPostPool = (_pool,data,callback) => {
    let insertQuery = `INSERT INTO product (name,category) VALUES ('${data.name}','${data.category}')`
    _connection.query(insertQuery, (err, result) => {
        if(err) throw err
        callback(result)
        _connection.end()
    })

    
}

const insertPool = (_pool, data, callback) =>{
    let insertQuery = "INSERT INTO product (name,category) VALUES (?,?)"
    let query = mysql.format(insertQuery, [data.name, data.category]) //esto es para reemplazar los "??"

    _pool.getConnection((err, _connection) =>{
        if (err) throw err
        _connection.query(query,(err,result) => {
            if(err) throw err
            callback(result)
            _connection.release()
        })
    })
}   

const readPool = (_pool, callback) =>{
    let readQuery = `SELECT * FROM product`

    _pool.getConnection((err, _connection)=>{
        if(err) throw err
        _connection.query(readQuery, (err,result) => {
            if(err) throw err
            callback(result)
            _connection.release()
        })
    })

}

const updatePool = (_pool,data,callback) =>{
    let updateQuery = `UPDATE product SET category = ? WHERE id_product = ?`
    let query = mysql.format(updateQuery, [data.category,data.id])
    _pool.getConnection((err, _connection) =>{
        if (err) throw err
        _connection.query(query, (err,result) =>{
            if(err) throw err
            callback(result)
            _connection.release()
        })
    })
}

const removePool = (_pool,data,callback) =>{
    let removeQuery = `DELETE FROM product WHERE id_product = ?`
    let query = mysql.format(removeQuery,[data.id])
    _pool.getConnection((err, _connection) =>{
        if (err) throw err
        _connection.query(query, (err,result) => {
            if(err) throw err
            callback(result)
            _connection.release()
        })
    })
}

//esta no la modifique porque no la voy a usar
const deleteAllPool = (_pool,data,callback) =>{
    let deleteQuery = `TRUNCATE TABLE ?`
    let query = mysql.format(deleteQuery,[data.table])
    _connection.query(query, (err,result) => {
        if (err) throw err
        callback(result)
        _connection.release()
    })
}

module.exports = {insertPostPool,insertPool,readPool,updatePool,removePool,deleteAllPool};

