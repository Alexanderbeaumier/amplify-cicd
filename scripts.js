document.addEventListener('DOMContentLoaded', function() {
    const addNoteBtn = document.getElementById('addNoteBtn');
    const noteText = document.getElementById('noteText');
    const notesList = document.getElementById('notes');

    // Function to add a note
    function addNote() {
        const noteContent = noteText.value.trim();
        if (noteContent !== '') {
            const noteItem = document.createElement('li');
            noteItem.innerHTML = `<span>${noteContent}</span><button class="delete-btn">Delete</button>`;
            notesList.appendChild(noteItem);
            noteText.value = '';

            // Add delete functionality
            noteItem.querySelector('.delete-btn').addEventListener('click', function() {
                notesList.removeChild(noteItem);
            });
        }
    }

    // Add note when button is clicked
    addNoteBtn.addEventListener('click', addNote);

    // Add note when Enter key is pressed
    noteText.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent newline in the textarea
            addNote();
        }
    });
});
