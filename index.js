const express = require('express')
const banco = require("./banco")
const atleta = require("./atleta")
const time = require("./time")

const app = express()
app.use(express.json())

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

banco.conexao.sync( function(){
    console.log("Banco de dados conectado.");
})

const PORTA = 3000
app.listen(PORTA, function(){
    console.log("Servidor iniciado na porta" + PORTA);
})

app.get("/time/", async function(req,res){
    const resultado = await time.time.findAll()
    res.send(resultado)
})

app.get("/atleta/",async function(req, res) {
    const resultado = await atleta.atleta.findAll()
    res.send(resultado);
})

