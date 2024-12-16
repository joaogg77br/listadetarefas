const input = document.querySelector(".taskName");
const button = document.querySelector(".maker");
const kanbams = document.querySelectorAll(".kanbam");
const urgente = document.querySelector(".urgente");
let globalTarget; // Variável para armazenar a tarefa sendo arrastada
let array = []; // Armazena as tarefas para o localStorage

function createAndSave() {
    const task = createTask();

    if (task) {
        // Adiciona a tarefa ao array e salva no localStorage
        const taskText = task.innerHTML;
        array.push(taskText);
        localStorage.setItem("Tarefas", JSON.stringify(array));
        console.log("Tarefas salvas:", array);
    }
}

function MoveTaskOfKanbam(e) {
    // Armazena o elemento sendo arrastado
    globalTarget = e.target;
}

function setupKanbams() {
    kanbams.forEach(kanbam => {
        // Permite o drop
        kanbam.addEventListener("dragover", (e) => e.preventDefault());

        // Lida com o drop
        kanbam.addEventListener("drop", (e) => {
            e.preventDefault();

            // Verifica o alvo do drop
            if (e.target.classList.contains("task")) {
                // Insere antes do elemento de destino
                e.target.insertAdjacentElement("beforebegin", globalTarget);
            } else if (e.target.classList.contains("kanbam")) {
                // Adiciona no final do Kanbam
                kanbam.appendChild(globalTarget);
            }
        });
    });
}

function createTask() {
    const taskName = input.value.trim();

    if (taskName.length > 0) {
        const task = document.createElement("div");
        task.classList.add("task");
        task.setAttribute("draggable", true);
        task.innerHTML = taskName;

        // Adiciona eventos para arrastar
        task.addEventListener("dragstart", MoveTaskOfKanbam);

        // Adiciona ao Kanban de urgências
        urgente.appendChild(task);

        // Limpa o campo de entrada
        input.value = "";
        return task;
    } else {
        alert("Por favor, insira o nome da tarefa.");
        return null;
    }
}

function LoadListener() {
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            createAndSave();
        }
    });
}

// Inicializa os eventos nos Kanbans
setupKanbams();
// Inicializa o listener do input
LoadListener();
