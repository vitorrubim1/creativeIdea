const express = require("express");
const server = express();
const db = require("./db");

//CONFIGURANDO ARQUIVOS ESTÁTICOS, DO FOLDER PUBLIC
server.use(express.static("public"));

//HABILITANDO O USO DO REQ.BODY NO EXPRESS
server.use(express.urlencoded({ extended: true }));


//CONFIGURANDO A TEMPLATE ENGINE
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server, //SERVIDOR, POR ONDE VAI SE COMUNICAR
    noCache: true, //DESABILITANDO CACHE DE CSS.. ENTRE OUTROS
})


                                //ROTA DE /
server.get("/", function(req, res){
    // return res.sendFile(__dirname + "/index.html"); //ESTA É UM FORMA DE RENDERIZAR HTML SEM TEMPLATE ENGINE > AQUI COM sendFile EU RETORNO PARA A ROTA "/" O INDEX.HTML, COM A FUNÇÃO DE MOSTRAR O CAMINHO ABSULUTO __dirname

    //SELECT NO BANCO
    db.all(`SELECT * FROM ideas`, function(err, rows){
            if(err){
                console.log(err);
                return res.send("Erro ao buscar dado do Banco de Dados :(")
            }
            //ELSE
            const reversedIdeas = [...rows].reverse(); // rows É A RESPOSTA DO DB

            let lastIdeas = []
            for (let idea of reversedIdeas){ //ESTOU REVERTENDO, PARA MOSTRAR AS ULTIMAS IDEIAS
             
                //LIMITANDO NA HORA DE MOSTRAR IDEIAS
                if(lastIdeas.length < 3){
                    lastIdeas.push(idea); //ADICIONADO IDEIA AO lestIdea
                }
            }
            return res.render("index.html", { ideas: lastIdeas }); //RENDERIZANDO HTML COM NUNJUCKS E PASSANDO INFO
        });
});

                                //ROTA DE IDEIAS
server.get("/ideias", function(req, res){
    
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err){
            console.log(err);
            return res.send("Erro ao buscar dado do Banco de Dados :(")
        }

        //ELSE
        const reversedIdeas = [...rows].reverse(); //PARA REVERTER UMA ÚNICA VEZ
        return res.render("ideias.html", { ideas: reversedIdeas });
    });
});


//INSERINDO NO BANCO DE DADOS
server.post("/", function(req, res){
    //QUERY
    const query = `
        INSERT INTO ideas(
            image, 
            title, 
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
    `
    //VALORES
    const values =  [
        //PEGANDO DADOS DO FORM
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ];

    //INSERINDO NA TABELA
    db.run(query, values, function(err){
        if(err){
            console.log(err);
            return res.send("Erro ao inserir no Banco de Dados :(")
        }
        //ELSE
        return res.redirect("/ideias")
    }); 
});


//INSERINDO NO BANCO DE DADOS
server.post("/ideias", function(req, res){
    //QUERY
    const query = `
        INSERT INTO ideas(
            image, 
            title, 
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
    `
    //VALORES
    const values =  [
        //PEGANDO DADOS DO FORM
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,

    ];

    //INSERINDO NA TABELA
    db.run(query, values, function(err){
        if(err){
            console.log(err);
            return res.send("Erro ao inserir no Banco de Dados :(")
        }
        //ELSE
        return res.redirect("/ideias")
    }); 
});

//SERVIDOR
server.listen(3000);