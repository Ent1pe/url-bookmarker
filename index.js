import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js"

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js"
const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-ed293-default-rtdb.firebaseio.com/"

}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")




const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById("del-btn")



onValue(referenceInDB, function(snapshot){
    const snapshotDoesExist = snapshot.exists()
    if(snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
    
})




inputBtn.addEventListener("click", function() {
    
    push(referenceInDB, inputEl.value)
    inputEl.value = ""

    
    
})


delBtn.addEventListener("dblclick", function(){
    remove(referenceInDB)
    ulEl.innerHTML = ""
    
    
    

})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++){
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>${leads[i]}</a>
            </li>
        `
            
        

    }

    ulEl.innerHTML = listItems
}
