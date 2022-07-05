require('dotenv').config()
//const userController = require('./controller');
const express = require('express');
//const bodyParser = require('body-parser');
//*************esto lo quiero separar en otro archivo
const mysql = require('mysql')
//*************

const {insert,insertPost,read,update,remove,deleteAll} = require('./drivers/mysql')
const {insertPool,insertPostPool,readPool,updatePool,removePool,deleteAllPool} = require('./drivers/mysql-pool')


const app = express();
app.use(express.json());
const PORT = 5000

const connection = mysql.createConnection({
    host: process.env.DBHOST,
    database: process.env.DBDATABASE,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD
    
    
});

const pool = mysql.createPool({
    host: process.env.DBHOST,
    database: process.env.DBDATABASE,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD
    
    
});

connection.connect((err) => {
    if (err) throw err
    console.log("Connected to database")
})



app.get('/', (req,res) => {
    res.send("A")
})

app.get('/insert', (req,res) => {
    insert(connection,
        {name: 'Pan', category: 'almacen'}, 
        result => {
            res.json(result);
        }
    )
})

app.get('/insert-pool', (req,res) => {
    insertPool(pool,
        {name: 'Pan', category: 'almacen'}, 
        result => {
            res.json(result);
        }
    )
})


app.get('/read', (req,res) => {
    read(connection, result =>{
        res.json(result)
    })
})

app.get('/read-pool', (req,res) => {
    readPool(pool, result =>{
        res.json(result)
    })
})

app.post('/postInsert',(req,res)=>{
    const data = req.body

    /*
    const newProduct = {
        name: data.name,
        category: data.category
        //si quisiera un campo no requerido podria usar
        //otroDato: typeof data.otroDato != 'undefined' ? data.otroDato : false
    } */

    insertPost(connection, {name: data.name, category: data.category}, result => {
        res.json(result)
    })

    
})

app.get('/update', (req,res) =>{
    update(connection, {category: 'verduleria', id: '1'}, result =>{
            res.json(result)
        })
})

app.get('/update-pool', (req,res) =>{
    updatePool(pool, {category: 'verduleria', id: '1'}, result =>{
            res.json(result)
        })
})

app.get('/remove', (req,res) => {
    remove(connection, {id: 22}, result =>{
        res.json(result)
    })
})

app.get('/remove-pool', (req,res) => {
    removePool(pool, {id: 2}, result =>{
        res.json(result)
    })
})
//ESTA NO SIRVE
app.get('/deleteAll', (req,res) => {
    deleteAll(connection, {table: 'product'}, result =>{
        res.json(result)
    })
})

app.listen(PORT,() => {
    console.log(`App listening on http://localhost:${PORT}`)
})
