document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const addNoteBtn = document.getElementById("addNote");
    const notesPreview = document.getElementById("notesPreview");
    const noteTitle = document.getElementById("noteTitle");
    const noteContent = document.getElementById("noteContent");
    const saveNoteBtn = document.getElementById("saveNote");
    const deleteNoteBtn = document.getElementById("deleteNote");
    const searchBar = document.querySelector('.searchBar');

    // Data
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let currentNoteIndex = null;

    // Helper Functions
    function sanitizeInput(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function renderNotes(notesArray = notes) {
        notesPreview.innerHTML = "";
        notesArray.forEach((note, index) => {
            const noteDiv = document.createElement("div");
            noteDiv.classList.add("note-item");
            if (index === currentNoteIndex) {
                noteDiv.classList.add('active');
            }
            noteDiv.innerHTML = `<strong>${note.title}</strong><br>${note.content.substring(0, 50)}...`;
            noteDiv.addEventListener("click", () => loadNote(index));
            notesPreview.appendChild(noteDiv);
        });
    }

    function loadNote(index) {
        currentNoteIndex = index;
        noteTitle.value = notes[index].title;
        noteContent.value = notes[index].content;
    }

    // Event Listeners
    addNoteBtn.addEventListener("click", () => {
        const newNote = { title: "Untitled", content: "" };
        notes.push(newNote);
        currentNoteIndex = notes.length - 1;
        localStorage.setItem("notes", JSON.stringify(notes));
        renderNotes();
        loadNote(currentNoteIndex);
    });

    saveNoteBtn.addEventListener("click", () => {
        if (!noteTitle.value.trim() || !noteContent.value.trim()) {
            alert("Note cannot be empty!");
            return;
        }
        if (currentNoteIndex !== null) {
            notes[currentNoteIndex].title = sanitizeInput(noteTitle.value);
            notes[currentNoteIndex].content = sanitizeInput(noteContent.value);
            localStorage.setItem("notes", JSON.stringify(notes));
            renderNotes();
        }
    });

    deleteNoteBtn.addEventListener("click", () => {
        if (currentNoteIndex !== null) {
            notes.splice(currentNoteIndex, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            renderNotes();
            noteTitle.value = "";
            noteContent.value = "";
            currentNoteIndex = null;
        }
    });

    searchBar.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = notes.filter(note => 
            note.title.toLowerCase().includes(term) || 
            note.content.toLowerCase().includes(term)
        );
        renderNotes(filtered);
    });

    let saveTimeout;
    [noteTitle, noteContent].forEach(element => {
        element.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                if (currentNoteIndex !== null) saveNoteBtn.click();
            }, 1000);
        });
    });

    // Initial Render
    renderNotes();
});