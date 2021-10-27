// MUUTTUJAT
var todoSyote = document.querySelector('.todo-syote');
var todoNappi = document.querySelector('.todo-nappi');
var todoLista = document.querySelector('.todo-lista');
var todoFiltteri = document.querySelector('.todo-filtteri');

// EVENT LISTENERIT
todoNappi.addEventListener('click', addTodo);
todoLista.addEventListener('click', deleteTodo);
todoFiltteri.addEventListener('click', todoFilter);


// FUNKTIOT
// LISÄÄ TODO-FUNKTIO
function addTodo(event) {
    // ESTÄÄ LOMAKKEEN LÄHETTÄMISTÄ            
    event.preventDefault();

    // LUO DIV-ELEMENTTI 
    var todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    // LUO LI-ELEMENTTI
    var li_elementti = document.createElement("li");
    li_elementti.innerText = todoSyote.value;
    li_elementti.classList.add("item");
    todoDiv.appendChild(li_elementti);


    // LUO TARKISTA-NAPPI
    var check_button = document.createElement("button");
    check_button.innerHTML = "<span>&#128505;</span>";
    check_button.classList.add("check-button");
    todoDiv.appendChild(check_button);

    // LUO POISTA-NAPPI
    var delete_button = document.createElement("button");
    delete_button.innerHTML = '<span>&#10060;</span>';
    delete_button.classList.add("delete-button");
    todoDiv.appendChild(delete_button);

    // APPEND DIV TO LIST/IF-ELSE STATEMENT, 
    // TALLENA + SYÖTTEEN ARVON PÄIVITYS
    if (todoSyote.value === '') {
        // jos syöte on tyhjä, varoitus ja border tyylin muutos
        alert("Fill the blank!");
        todoSyote.style.border = "2px solid #7D3C98";
        /*  return false käytän koska tiettyä merkintää ei ole täytetty 
            lomakkeen lähettämisen aikana, palautus epätosi estää lomakkeen lähettämistä. */
        return false;
    } else {
        // perus-asetukset
        todoSyote.style.border = "none";
    }
    // lisätään div-elementti todo-listaan
    todoLista.appendChild(todoDiv);
    tallena();
    todoSyote.value = "";
}

// POISTA + TARKISTA TODO FUNKTIO
function deleteTodo(e) {
    const i = e.target;
    console.log(e.target);
    if (i.classList[0] === 'delete-button') {
        const todo = i.parentElement;
        todo.remove();
    }
    if (i.classList[0] === "check-button") {
        const todo = i.parentElement;
        todo.classList.toggle("checked");
    }
    // tallena muutokset
    tallena();
}

// TODO-FILTTERI
function todoFilter(event) {
    // valitaan kaikki todoLista:n elementit childNodes-avulla 
    const todos = todoLista.childNodes;
    // luodaan funktio, joka toimii jokaiselle todoLista.childNodes elementille
    todos.forEach(function (todo) {
        // switch case
        switch (event.target.value) {
            // mikäli event.target.value on all
            case "all":
                // display = flex
                todo.style.display = 'flex';
                break;
            // mikäli event.target.value "done"
            case "done":
                // jos on checked
                if (todo.classList.contains('checked')) {
                    // display flex
                    todo.style.display = 'flex';
                    // muuten display none
                } else {
                    todo.style.display = 'none';
                }
                break;
            // mikäli event.target.value "undone"
            case "undone":
                // jos ei ole checked
                if (!todo.classList.contains('checked')) {
                    // display flex
                    todo.style.display = 'flex';
                    // muuten display "none"
                } else {
                    todo.style.display = 'none';
                }
                break;
        }

    });
}

// localStorage
// luodaan information muuttuja, joka sisältää getItem("saveTodo") kutsun
var information = localStorage.getItem("saveTodo");
// myList innerHTML inside saveTodo equals information
document.getElementById("myList").innerHTML = information;
// TALLENA-FUNKTIO
function tallena() {
    // viedään HTML koodi, joka on tallennettu saveTodo:ssa todoListaan innerHTML:n avulla.
    window.localStorage.saveTodo = todoLista.innerHTML;
}