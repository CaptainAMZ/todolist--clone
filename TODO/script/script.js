
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];


const icon = document.querySelector(".icon")
const popUp = document.querySelector(".popup-box")
const closeBtn = document.querySelector(".uil-times")
const titleInput = document.querySelector("input[class = 'title']")
const desc = document.querySelector("textarea[class = 'description']")
const CUBtn = document.querySelector("button")
const wrapper = document.querySelector(".wrapper")


let notes = []
let localNotes;
let date;
let day;
let month;
let year;

let newNote
let noteTitle;
let noteDesc;
let noteIndex;
let duplicateChecker;
let COU;


function pusher() {

    noteTitle = titleInput.value

    noteDesc = desc.value

    duplicateChecker = notes.some(idx => {

        if (idx.title == noteTitle) return true

    })


    if (!duplicateChecker) {

        date = new Date()

        day = date.getDate()

        month = date.getMonth()

        year = date.getFullYear()

        newNote = { title: noteTitle, description: noteDesc, date: `${day} , ${months[month]} , ${date.getFullYear()}` }

        notes.push(newNote)

        localStorage.setItem("NoteList", JSON.stringify(notes))

    } else alert("has duplicate!")
}




function updater() {
    notes.some(index => {

        if (notes.indexOf(index) == noteIndex) {

            index.title = titleInput.value

            index.description = desc.value

            localStorage.setItem("NoteList", JSON.stringify(notes))

        }

    })
}



function DOMAllRemover() {

    document.querySelectorAll(".note").forEach(elem => elem.remove())

}




function Creator() {

    localNotes = localStorage.getItem("NoteList")

    notes = JSON.parse(localNotes) || []

    notes.map((note, index) => {
      

        wrapper.insertAdjacentHTML("beforeend", `<li class="note">

        <div class="details">
            <p>${note.title}</p>
            <span>${note.description}</span>
        </div>
        <div class="bottom-content">
            <span>${note.date}</span>
            <div class="settings" onClick="showMenu(this)">
                <i class="uil uil-ellipsis-h"></i>
                <ul class="menu">
                    <li onClick = "editFunc(${index})">
                        <i class="uil uil-pen"></i>Edit
                    </li>
                    <li onClick = "deleteFunc(${index})">
                        <i class="uil uil-trash"></i>Delete
                    </li>
                </ul>
            </div>
        </div>
    </li>`)
    })


    titleInput.value = ""

    desc.value = ""
}





function showMenu(e) {

    e.classList.add("show")

}


function editFunc(e) {

    COU = false

    popUp.classList.add("show")

    CUBtn.innerHTML = "Update Note"

    titleInput.value = notes[e].title

    desc.value = notes[e].description

    noteIndex = e

}




function deleteFunc(index) {

    notes.splice(index, 1)

    localStorage.setItem("NoteList", JSON.stringify(notes))

    DOMAllRemover()

    Creator()

}







icon.addEventListener("click", () => {

    COU = true

    popUp.classList.add("show")

    CUBtn.innerHTML = "Create Note"

})


closeBtn.addEventListener("click", () => {

    popUp.classList.remove("show")

})


CUBtn.addEventListener("click", () => {

    if (COU) {

        pusher()

    } else {

        updater()

    }

    DOMAllRemover()

    Creator()

    popUp.classList.remove("show")

})


window.addEventListener("load", () => {

    Creator()

})


window.addEventListener("keyup", (e) => {

    e.key == "Escape" && document.querySelectorAll(".show").forEach(elem => elem.classList.remove("show"))

})

