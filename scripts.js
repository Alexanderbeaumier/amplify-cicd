document.addEventListener('DOMContentLoaded', function() {
    const noteInput = document.getElementById('note-input');
    const saveNoteButton = document.getElementById('save-note');
    const noteList = document.getElementById('note-list');
    const toggleThemeButton = document.getElementById('toggle-theme');

    // Load saved notes from local storage
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(addNoteToDOM);

    saveNoteButton.addEventListener('click', function() {
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            addNoteToDOM(noteText);
            saveNoteToLocalStorage(noteText);
            noteInput.value = '';
        }
    });

    toggleThemeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        toggleTheme();
    });

    function addNoteToDOM(noteText) {
        const li = document.createElement('li');
        li.textContent = noteText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function() {
            noteList.removeChild(li);
            deleteNoteFromLocalStorage(noteText);
        };

        li.appendChild(deleteButton);
        noteList.appendChild(li);
    }

    function saveNoteToLocalStorage(noteText) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function deleteNoteFromLocalStorage(noteText) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(note => note !== noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function toggleTheme() {
        const root = document.documentElement;
        if (document.body.classList.contains('dark-theme')) {
            root.style.setProperty('--bg-color', '#333');
            root.style.setProperty('--text-color', '#fff');
            root.style.setProperty('--note-bg-color', '#444');
            root.style.setProperty('--note-text-color', '#fff');
        } else {
            root.style.setProperty('--bg-color', '#ffffff');
            root.style.setProperty('--text-color', '#333333');
            root.style.setProperty('--note-bg-color', '#f4f4f9');
            root.style.setProperty('--note-text-color', '#333333');
        }
    }
});
