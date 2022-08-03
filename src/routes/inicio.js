const { FakerError } = require('@faker-js/faker');
const express = require('express')
const {Router} = express

const inicioRouter = Router()

inicioRouter.get('/', (req, res)=>{
    if(req.isAuthenticated()){
        res.status(200).redirect('admin')
    }else{
        res.status(200).render('main')
    }
})

module.exports = inicioRouter