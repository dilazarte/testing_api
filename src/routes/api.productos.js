const express = require('express')
const {Router} = express

//const {DaoProductosFS} =  require('../DAOs/productos/DaoProductosFS')
//const daoProds = new DaoProductosFS()

const {DaoProductosMongo} =  require('../DAOs/DaosMongoProductos')
const daoProdsMongo = new DaoProductosMongo()

// const {DaoProductosFirebase} =  require('../DAOs/productos/DaoProductosFirebase')
// const daoProdsFb = new DaoProductosFirebase()

const routerProductos = Router()
let admin = true;
//GET
routerProductos.get('/:id?', async(req, res)=>{
    const id = req.params.id;
    //const productos = await daoProds.getAll()
    const productos = await daoProdsMongo.getAllDoc() //mongoDB
    //const productos = await daoProdsFb.getAllDoc() //mongoDB
    if(id){
        //const productoById = await daoProds.getById(id)//Filesystem
        const productoById = await daoProdsMongo.getDocById(id)//mongoDB
        //const productoById = await daoProdsFb.getDocById(id)
        if(productoById){
            res.status(200).json(productoById)
        }else{
            res.status(404).json({'Error': `Producto no encontrado con id ${id}`})
        }
    }else{
        res.status(200).json(productos)
    }
})
//POST
routerProductos.post('/', async(req, res)=>{
    let newProducto = req.body
    if(newProducto && newProducto.nombre && newProducto.descripcion && newProducto.foto && newProducto.codigo && newProducto.precio && newProducto.stock){
        newProducto.precio = parseInt(newProducto.precio)
        newProducto.stock = parseInt(newProducto.stock)
        //let id = await daoProds.save(newProducto) //filesystem
        //res.status(200).json({Success:`Se agrego correctamente el nuevo producto con ID: ${id}`})

        let id = await daoProdsMongo.addDoc(newProducto) //mongoDB
        res.status(200).json({Success:`Se agrego correctamente el nuevo producto con ID: ${id._id}`}) //res de mongoDB

        // let id = await daoProdsFb.addDoc(newProducto) //firebase
        // res.status(200).json({Success:`Se agrego correctamente el nuevo producto con ID: ${id}`}) //res de firebase
    }else{
        res.status(200).json({Error:`No se pudo agregar el producto, verifique los datos`})
    }
    
})
//PUT
routerProductos.put('/:id', async(req, res)=>{
    try{
        //let data = await daoProds.editById(req.params.id, req.body) //filesystem
        let data = await daoProdsMongo.updateDoc(req.params.id, req.body) //mongoDB
        //let data = await daoProdsFb.updateDoc(req.params.id, req.body) //firebase
        res.status(200).json({Success: data})
    }
    catch(err){
        res.status(400).json({"error": err})
    }
})
//DELETE
routerProductos.delete('/:id', async (req, res)=>{
    if(admin){
        try{
            //let id = parseInt(req.params.id) //Filesystem
            //await daoProds.deleteById(id) //Filesystem

            let id = req.params.id //mongoDB
            let deletedItem = await daoProdsMongo.deleteDoc(id) //mongoDB

            // let id = req.params.id //firebase
            // let deletedItem = await daoProdsFb.deleteDoc(id) //firebase
            res.status(200).json(deletedItem)
        }
        catch(error){
            res.json({error: error})
        }
    }else{
        res.json({error: `No se puede eliminar el producto, se requiere admin`})
    }
})

module.exports = {routerProductos}