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
