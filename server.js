const express = require("express");
const server = express();

//CONFIGURANDO ARQUIVOS ESTÁTICOS, DO FOLDER PUBLIC
server.use(express.static("public"));


//CONFIGURANDO A TEMPLATE ENGINE
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server, //SERVIDOR, POR ONDE VAI SE COMUNICAR
    noCache: true, //DESABILITANDO CACHE DE CSS.. ENTRE OUTROS
})


const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaoke",
        category: "Diversão",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, qui?",
        url: "https://rocketseat.com"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercício",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, qui?",
        url: "https://rocketseat.com"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, qui?",
        url: "https://rocketseat.com"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Curso de programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, qui?",
        url: "https://rocketseat.com"
    },
    
]


server.get("/", function(req, res){
    // return res.sendFile(__dirname + "/index.html"); //ESTA É UM FORMA DE RENDERIZAR HTML SEM TEMPLATE ENGINE > AQUI COM sendFile EU RETORNO PARA A ROTA "/" O INDEX.HTML, COM A FUNÇÃO DE MOSTRAR O CAMINHO ABSULUTO __dirname

    const reversedIdeas = [...ideas].reverse(); //PARA REVERTER UMA ÚNICA VEZ

    let lastIdeas = []
    for (let idea of reversedIdeas){ //ESTOU REVERTENDO, PARA MOSTRAR AS ULTIMAS IDEIAS
        //LIMITANDO NA HORA DE MOSTRAR IDEIAS
        if(lastIdeas.length < 3){
            lastIdeas.push(idea); //ADICIONADO IDEIA AO lestIdea
        }
    }

    return res.render("index.html", { ideas: lastIdeas }); //RENDERIZANDO COM NUNJUCKS
})


                                //ROTA DE IDEIAS
server.get("/ideias", function(req, res){
    const reversedIdeas = [...ideas].reverse(); //PARA REVERTER UMA ÚNICA VEZ
    
    return res.render("ideias.html", { ideas: reversedIdeas });
})

//SERVIDOR
server.listen(3000)