document.addEventListener('DOMContentLoaded', function() {
    const noteInput = document.getElementById('note-input');
    const saveNoteButton = document.getElementById('save-note');
    const noteList = document.getElementById('note-list');

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
});

