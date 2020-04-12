function onOff(){
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    //TIRANDO A SCROOLANGEM CASO O MODAL ESTIVER ABERTO
    document 
        .querySelector("body")
        .classList
        .toggle("hideScrool")

    document
        .querySelector("#modal")
        .classList
        .toggle("addScrool")
}


//VALIDANDO CAMPOS
function checkFields(event){
    
    //CRIANDO UMA VARIÁVEL E ARMAZENANDO OS INPUTS Q QUERO VALIDAR
    const valuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link",
    ];


    //VERIFICAÇÃO SE ESTA VAZIO
    const isEmpty = valuesToCheck.find(function(value){

        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim() //ESTA FUNÇÃO VALIDA CADA INPUT, PARA VER SE ESTÁ VAZIO

        //PASSO DUAS VERIFICAÇÕES NO IF, PORÉM AS DUAS TEM QUE SER TRUE
        if(checkIfIsString && checkIfIsEmpty){
            return true
        }        
    })
        //SE ALGUM CAMPO TIVER VAZIO
        if(isEmpty){
            event.preventDefault(); //FAZENDO COM QUE O FORMULÁRIO NÃO SEJA SUBMITADO
            alert("Por favor, preencha todos os campos!") 
        }
}
