const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./ws.db"); //INSTANCIANDO O BD E PASSANDO O CAMINHO PARA CRIAR O BD

db.serialize(function(){ //SERIALIZE NOS PERMITE EXECUTAR VARIOS COMANDOS SQL DE UMA VEZ

    //CRIANDO A TABELA
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `);


    // //QUERY
    // const query = `
    // INSERT INTO ideas(
    //     image, 
    //     title, 
    //     category,
    //     description,
    //     link
    // ) VALUES (?,?,?,?,?);
    // `
    // //VALORES
    // const values =  [
    //     "https://image.flaticon.com/icons/svg/2729/2729032.svg",
    //     "Karaoke",
    //     "Diversão",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, qui?",
    //     "https://rocketseat.com"
    // ];

    // //INSERINDO NA TABELA
    // db.run(query, values, function(err){
    //     if(err) return console.log(err)

    //     //ELSE
    //     console.log(this)
    // }); 

    //CONSULTANDO A TABELA
    // db.all(`SELECT * FROM ideas`, function(err, rows){
    //     if(err) return console.log(err);

    //     //ELSE
    //     console.log(rows);
    // });

    //DELETANDO DADO
    // db.run(`DELETE FROM ideas WHERE id = ?`, [1],
    //     function(err){
    //         if(err) return console.log(err);

    //         //ELSE
    //         console.log("Dado deletado com sucesso!", this);
    //     }
    // );

});

//EXPORTANDO PRO SERVER CONSUMIR
module.exports = db;