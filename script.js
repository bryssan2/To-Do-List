let input = document.getElementById("inputText"); //input correspond à la deuxième bare de recherche
let input_2 = document.getElementById("input-2"); // input_2 correspond à la première bare de recherche
let add = document.getElementById("add"); //add correspond au bouton de la deuxième bare de recherche
let add_2 = document.getElementById("add-2"); // add_2 correspond au bouton de la première bare de recherche
let calendar = document.getElementById("calendar");
let date = document.getElementById("date");
let watch = document.getElementById("img-watch");
let time = document.getElementById("time");
let tasks = document.getElementById("tasks");

// récuperation de la date et l'heure

calendar.addEventListener("click", () => {
  date.focus();
});

watch.addEventListener("click", () => {
  time.focus();
});

// faire apparaître le calendrier / le TimePicker

date.addEventListener("focus", () => {
  date.showPicker();
});

time.addEventListener("focus", () => {
  time.showPicker();
});

// afficher la date et l'heure saisies dans le input_2

let DateValue = null;
let TimeValue = null;
date.addEventListener("change", () => {
  DateValue = date.value.split("-");
  input_2.value = DateValue[2] + " / " + DateValue[1] + " / " + DateValue[0];
});

time.addEventListener("change", () => {
  TimeValue = time.value;
  input_2.value += "  " + TimeValue;
});

// feedback visuel ppour confirmer la saisie

add_2.addEventListener("click", () => { 
  if (input_2.value) {
    input_2.classList.add("input-feedback");
    setTimeout(() => {
      input_2.value = null;
      input_2.classList.remove("input-feedback");
    }, 1000);
  } else {
    input_2.classList.add("input-feedback2");
    setTimeout(() => {
      input_2.classList.remove("input-feedback2");
    }, 1000);
  }
});

// Ajouter une tâche

add.addEventListener("click", () => {
  if (!input.value) {
    input.classList.add("input-feedback2");
    setTimeout(() => {
      input.classList.remove("input-feedback2");
    }, 1000);
    return;
  }

  //   mettre la première lettre en majuscule

  let Input = input.value.trim();
  Input = Input.charAt(0).toUpperCase() + Input.slice(1);

  //   créer une balise li

  let li = document.createElement("li");
  li.classList.add("task");

  // créer une balise span qui contient une icon de corbeille

  let img = document.createElement("img");
  img.src = "./ToDoListPics/delete_24dp_FA1D04.svg";
  img.style.cursor = "pointer";

  //   créer un input type checkbox

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");

  // enregistrer l'heure
  if (time.value) {
    let Hours = document.createElement("p");
    Hours.textContent = time.value;
    Hours.classList.add("Hours");
    li.append(checkbox, Hours, Input, img);
    time.value = null;
  } else {
    // Ajouter le checkbox , la tâche et l'icon dans le li

    li.append(checkbox, Input, img);
    li.style.opacity = "0";
  }

  // créer et ajouter la date et l'icon de la corbeille dans tasks
  if (date.value) {
    let Date = document.createElement("p");

    DateValue = date.value.split("-");
    Date.textContent =
      DateValue[2] + " / " + DateValue[1] + " / " + DateValue[0];
    Date.classList.add("Date");

    let img2 = document.createElement("img");
    img2.src = "./ToDoListPics/delete_24dp_FA1D04.svg";
    img2.style.cursor = "pointer";

    Date.appendChild(img2);
    tasks.appendChild(Date);

    // animation d'insertion de la date
    Date.style.opacity = "0";
    setTimeout(() => {
      Date.style.transition = "opacity 0.3s";
      Date.style.opacity = "1";
    }, 10);

    // supprimer une date

    img2.addEventListener("click", () => {
      // animation de suppression de la date
      img2.style.transition = "opacity 0.3s";
      img2.style.opacity = "0";

      setTimeout(() => {
        img2.parentElement.remove();
      }, 300);
    });
    date.value = null;
  }

  tasks.appendChild(li);

  // animation d'insertion de la tâche

  setTimeout(() => {
    li.style.transition = "opacity 0.3s";
    li.style.opacity = "1";
  }, 10);

  input.value = "";

  // Supprimer une tâche

  img.addEventListener("click", () => {
    // animation de suppression de la tâche

    li.style.transition = "opacity 0.3s";
    li.style.opacity = "0";

    setTimeout(() => {
      img.parentElement.remove();
    }, 300);
  });
});

// marquer une tâche accomplie

tasks.addEventListener("change", (e) => {
  if (e.target.classList.contains("checkbox")) {
    e.target.parentElement.classList.toggle("done");
  }
});
