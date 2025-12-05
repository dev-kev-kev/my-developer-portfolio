document.addEventListener('DOMContentLoaded', () => {
    // DOM-Elemente auswählen
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const activeList = document.getElementById('active-list');
    const completedList = document.getElementById('completed-list');
    const completedSection = document.getElementById('completed-tasks-section');
    const clearCompletedBtn = document.getElementById('clear-completed-btn');

    // Array, das alle Aufgaben im Speicher hält
    let tasks = [];

    // --- A. Local Storage Funktionen ---

    // Aufgaben aus dem Local Storage laden
    const loadTasks = () => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            renderTasks();
        }
    };

    // Aufgaben im Local Storage speichern
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    // --- B. DOM Manipulations Funktion ---

    // Erstellt das HTML-Element für eine einzelne Aufgabe
    const createTaskElement = (task) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'task completed' : 'task';
        li.dataset.id = task.id; // Fügt die ID als Daten-Attribut hinzu

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;

        const completeBtn = document.createElement('button');
        completeBtn.className = 'action-btn complete-btn';
        completeBtn.textContent = task.completed ? '🔄' : '✅'; // Emoji als Icon
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'action-btn delete-btn';
        deleteBtn.textContent = '❌'; // Emoji als Icon

        li.appendChild(taskText);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        return li;
    };

    // Rendert alle Aufgaben neu in die Listen
    const renderTasks = () => {
        activeList.innerHTML = '';
        completedList.innerHTML = '';

        const activeTasks = tasks.filter(task => !task.completed);
        const completedTasks = tasks.filter(task => task.completed);

        activeTasks.forEach(task => {
            activeList.appendChild(createTaskElement(task));
        });

        completedTasks.forEach(task => {
            completedList.appendChild(createTaskElement(task));
        });
        
        // Zeige/verstecke die erledigte Liste
        if (completedTasks.length > 0) {
            completedSection.classList.remove('hidden');
        } else {
            completedSection.classList.add('hidden');
        }
    };

    // --- C. Event Handler ---

    // Handler für das Hinzufügen neuer Aufgaben
    const handleAddTask = (e) => {
        e.preventDefault();
        const text = input.value.trim();

        if (text) {
            const newTask = {
                id: Date.now(), // Eindeutige ID
                text: text,
                completed: false
            };
            tasks.unshift(newTask); // Neue Aufgabe oben einfügen
            input.value = ''; // Eingabefeld leeren
            saveTasks();
        }
    };

    // Handler für Klicks in den Listen (Delegation)
    const handleListClick = (e) => {
        const target = e.target;
        const listItem = target.closest('li'); // Finde das umgebende Listen-Element
        
        if (!listItem) return;

        const taskId = parseInt(listItem.dataset.id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        if (taskIndex === -1) return;

        if (target.classList.contains('delete-btn')) {
            // Aufgabe löschen
            tasks.splice(taskIndex, 1); 
        } else if (target.classList.contains('complete-btn')) {
            // Status umschalten
            tasks[taskIndex].completed = !tasks[taskIndex].completed; 
            // Optional: Nach Status in der Liste verschieben
            tasks.sort((a, b) => a.completed - b.completed); 
        }

        saveTasks();
    };
    
    // Handler für das Löschen aller erledigten Aufgaben
    const handleClearCompleted = () => {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
    };

    // --- D. Initialisierung ---

    form.addEventListener('submit', handleAddTask);
    activeList.addEventListener('click', handleListClick);
    completedList.addEventListener('click', handleListClick);
    clearCompletedBtn.addEventListener('click', handleClearCompleted);

    loadTasks(); // Lade die Aufgaben beim Start der App
});