// --- 1. GESTÃO DE ESTADO (STATE) ---
let tasks = [];

// --- 2. SELEÇÃO DE ELEMENTOS DOM ---
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const pendingContainer = document.getElementById("pendingContainer");
const completedList = document.getElementById("completedList");
const completedSection = document.getElementById("completedSection");
const emptyMessage = document.getElementById("emptyMessage");
const themeToggleBtn = document.getElementById("themeToggleBtn");

// --- 3. LÓGICA DE TEMA ESCURO ---
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggleBtn.textContent = document.body.classList.contains("dark-mode")
    ? "☀️ Claro"
    : "🌙 Escuro";
});

// --- 4. FUNÇÕES DE MANIPULAÇÃO DO ESTADO ---
function addTask() {
  const text = taskInput.value.trim();
  let date = taskDate.value; // Recebe o valor do calendário

  if (!text) {
    alert("Por favor, digite uma tarefa válida.");
    return;
  }

  // --- LÓGICA DE PREENCHIMENTO AUTOMÁTICO DE DATA ---
  // Se o utilizador não tiver escolhido uma data, usamos a data de hoje
  if (!date) {
    const today = new Date();
    const yyyy = today.getFullYear();
    // O mês começa em 0 no JavaScript, por isso somamos 1. O padStart garante 2 dígitos (ex: 09, 10)
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    // Formato exigido para compatibilidade HTML: YYYY-MM-DD
    date = `${yyyy}-${mm}-${dd}`;
  }

  // Criar um novo objeto de tarefa
  const newTask = {
    id: Date.now().toString(),
    text: text,
    date: date,
    completed: false,
  };

  tasks.push(newTask);

  // Limpar formulário
  taskInput.value = "";
  taskDate.value = "";
  taskInput.focus();

  renderUI();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderUI();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  renderUI();
}

// Eventos para adicionar
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// --- 5. RENDERIZAÇÃO DA INTERFACE ---
function renderUI() {
  pendingContainer.innerHTML = "";
  completedList.innerHTML = "";

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
  completedSection.style.display = completedTasks.length > 0 ? "block" : "none";

  // --- Agrupamento Cronológico das Pendentes ---
  if (pendingTasks.length > 0) {
    const groups = {};

    // Agrupar por data (Agora garantidamente todas têm data)
    pendingTasks.forEach((task) => {
      const dateKey = task.date;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(task);
    });

    // Ordenar as datas cronologicamente (da mais antiga para a mais recente)
    const sortedDates = Object.keys(groups).sort((a, b) => {
      return new Date(a) - new Date(b);
    });

    // Renderizar cada grupo
    sortedDates.forEach((dateKey) => {
      const groupDiv = document.createElement("div");
      groupDiv.className = "date-group";

      const header = document.createElement("div");
      header.className = "date-header";

      // Formatar AAAA-MM-DD para DD/MM/AAAA
      const [y, m, d] = dateKey.split("-");
      header.textContent = `📅 ${d}/${m}/${y}`;

      groupDiv.appendChild(header);

      const ul = document.createElement("ul");
      ul.className = "task-list";

      groups[dateKey].forEach((task) => {
        ul.appendChild(createTaskElement(task));
      });

      groupDiv.appendChild(ul);
      pendingContainer.appendChild(groupDiv);
    });
  }

  // --- Tarefas Concluídas ---
  completedTasks.forEach((task) => {
    completedList.appendChild(createTaskElement(task));
  });
}

// Cria o HTML do item individual
function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task-item";

  const taskContent = document.createElement("div");
  taskContent.className = "task-content";
  taskContent.onclick = () => toggleTask(task.id);

  const checkCircle = document.createElement("span");
  checkCircle.className = "check-circle";

  const taskDetails = document.createElement("div");
  taskDetails.className = "task-details";

  const taskTextSpan = document.createElement("span");
  taskTextSpan.className = "task-text";
  taskTextSpan.textContent = task.text;
  taskDetails.appendChild(taskTextSpan);

  // Adiciona a data abaixo do texto, útil para ver na secção de concluídas
  if (task.date && task.completed) {
    const dateSpan = document.createElement("span");
    dateSpan.className = "task-date";
    const [y, m, d] = task.date.split("-");
    dateSpan.textContent = `📅 ${d}/${m}/${y}`;
    taskDetails.appendChild(dateSpan);
  }

  taskContent.appendChild(checkCircle);
  taskContent.appendChild(taskDetails);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn-delete";
  deleteBtn.textContent = "Excluir";
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  li.appendChild(taskContent);
  li.appendChild(deleteBtn);

  return li;
}

// Renderização inicial
renderUI();
