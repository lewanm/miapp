const mysql = require('mysql');

/*
const insert = (connection,callback) =>{
    let insertQuery = "INSERT INTO product (name,category) VALUES ('Tenedor','bazar')"
    connection.query(insertQuery, (err, result) => {
        if(err) throw err
        callback(result)
    })
        
}*/

//otra forma de hacerlo con el get y pasarle parametros:


const insertPost = (_connection,data,callback) => {
    let insertQuery = `INSERT INTO product (name,category) VALUES ('${data.name}','${data.category}')`
    _connection.query(insertQuery, (err, result) => {
        if(err) throw err
        callback(result)
        _connection.end()
    })

    
}

const insert = (_connection, data, callback) =>{
    let insertQuery = "INSERT INTO product (name,category) VALUES (?,?)"
    let query = mysql.format(insertQuery, [data.name, data.category]) //esto es para reemplazar los "??"
    _connection.query(query,(err,result) => {
        if(err) throw err
        callback(result)
        _connection.end()
    })
}   

const read = (_connection, callback) =>{
    let readQuery = `SELECT * FROM product`
    _connection.query(readQuery, (err,result) => {
        if(err) throw err
        callback(result)
        _connection.end()
    })
}

const update = (_connection,data,callback) =>{
    let updateQuery = `UPDATE product SET category = ? WHERE id_product = ?`
    let query = mysql.format(updateQuery, [data.category,data.id])
    _connection.query(query, (err,result) =>{
        if(err) throw err
        callback(result)
        _connection.end()
    })
}

const remove = (_connection,data,callback) =>{
    let removeQuery = `DELETE FROM product WHERE id_product = ?`
    let query = mysql.format(removeQuery,[data.id])
    _connection.query(query, (err,result) => {
        if(err) throw err
        callback(result)
        _connection.end()
    })
}

const deleteAll = (_connection,data,callback) =>{
    let deleteQuery = `TRUNCATE TABLE ?`
    let query = mysql.format(deleteQuery,[data.table])
    _connection.query(query, (err,result) => {
        if (err) throw err
        callback(result)
        _connection.end()
    })
}



module.exports = {insertPost,insert,read,update,remove,deleteAll};


//MIS WEAS
/*
function showList(param){
    
    return   myQuery = `select p.name,p.category from list l left join list_detail ld on l.id_list = ld.id_list left join product p on p.id_product = ld.id_product WHERE l.name = "${param}";`

}



connection.query(showList("Mi Lista"),(error,results,fields) => {

    if(error)
    throw(error)
    
    results.forEach(result => {
        console.log(result)
    });
})

connection.end();
*/