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

app.get("/time/:id",async function(req, res) {
    const timeSelecionado = await time.time.findByPk(req.params.id, 
        { include: { model: atleta.atleta } } 
    )
    console.log("teste")
    if( timeSelecionado == null ){
        res.status(404).send({})
    }else{
        res.send(timeSelecionado);
    }
})

app.get("/atleta/:id",async function(req, res) {
    const atletaSelecionado = await atleta.atleta.findByPk(req.params.id,
        { include: {model: time.time } }
    )
    if( atletaSelecionado == null ){
        res.status(404).send({})
    }else{
        res.send(atletaSelecionado);
    } 
})

app.get("/atleta/nome/:nome",async function(req, res) {
    const atletasSelecionados = await atleta.atleta.findAll({
        where: {nome:req.params.nome}
    }
    )
    if( atletasSelecionados == null ){
        res.status(404).send({})
    }else{
        res.send(atletasSelecionados);
    }
})

app.get("/time/local/:local",async function(req, res) {
    const timesSelecionados = await time.time.findAll({
        where: {local:req.params.local}
    }
    )
    if( timesSelecionados == null ){
        res.status(404).send({})
    }else{
        res.send(timesSelecionados);
    }
})

app.post("/time/",async function(req,res){
    const resultado = await time.time.create({
        nome:req.body.nome,
        local:req.body.local
    })
    res.send(resultado)
})

app.post("/atleta/",async function(req,res){
    const resultado = await atleta.atleta.create({
        nome:req.body.nome,
        timeId:req.body.timeId,
        idade:req.body.idade
    })
    res.send(resultado)
})

app.put("/time/:id",async function(req,res){
    const resultado = await time.time.update({
        nome:req.body.nome
    },{
        where:{id: req.params.id}
    })
    if( resultado == 0){
        res.status(404).send({})
    }else{
        res.send( await time.time.findByPk(req.params.id))
    }
})

app.put("/atleta/:id",async function(req,res){
    const resultado = await atleta.atleta.update({
        nome:req.body.nome,
        timeId:req.body.timeId
    },
    {
        where:{id: req.params.id}
    })
    if( resultado == 0){
        res.status(404).send({})
    }else{
        res.send( await atleta.atleta.findByPk(req.params.id))
    }
})

app.delete("/time/:id",async function(req,res){
    const resultado = await time.time.destroy({
        where:{
            id:req.params.id
        }
    })
    if( resultado == 0 ){
        res.status(404).send({})
    }else{
        res.status(204).send({})
    }
})

app.delete("/atleta/:id",async function(req,res){
    const resultado = await atleta.atleta.destroy({
        where:{
            id:req.params.id
        }
    })
    if( resultado == 0 ){
        res.status(404).send({})
    }else{
        res.status(204).send({})
    }
})