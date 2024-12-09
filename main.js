const input = document.querySelector("input")
const button = document.querySelector("button")
const container = document.querySelector(".Container")
let array = []
let Tasks = localStorage.getItem("Tarefas");

if(Tasks){
    console.log(Tasks,JSON.parse(Tasks))
    array = JSON.parse(Tasks)
    console.log(array)
}else{
    console.log("Tomar no seu cu")
}


if(array.length > 0){
    console.log("Passado",array)
    for( let i = 0; i < array.length; i++ ){
        const div = document.createElement("div")
        const checkBox = document.createElement("input")
        checkBox.type ="checkbox"
        checkBox.classList.add("verify")
        div.innerHTML = array[i]
        div.classList.add("tarefa")
        div.appendChild(checkBox)
        container.appendChild(div)
    }
}else{
    console.log("reprovado")
}

function CreateTask(){
    //Criando a tarefa
    const div = document.createElement("div")
    div.classList.add("tarefa")
    console.log(div.className)
    //Verificando a tarefa
    if(input.value.length > 0 ){ console.log(input.value)}
    else{ 
         console.log("error") 
         return 
        }
    //Colocano a tarefa dentro do container
    div.innerHTML = input.value
    container.appendChild(div)
    // Salvando as tarefas
    SaveTarefas(input.value)
    //Verificando se há tarefas salvas
    console.log("Verificando")
    
}

function SaveTarefas(element){
   array.push(element)
   console.log(array)
   localStorage.setItem("Tarefas",JSON.stringify(array))
}


button.addEventListener("click",CreateTask)