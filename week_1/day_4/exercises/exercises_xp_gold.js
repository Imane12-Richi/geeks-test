// ===============================
//  EXERCISE 1 — Select Music
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  const genres = document.getElementById("genres");

  if (genres) {

    // 1️⃣ Display the currently selected value
    console.log("Selected value:", genres.value);

    // 2️⃣ Add new option "Classic"
    const newOption = document.createElement("option");
    newOption.value = "classic";
    newOption.textContent = "Classic";

    genres.appendChild(newOption);

    // 3️⃣ Make it selected by default
    genres.value = "classic";

    console.log("New selected value:", genres.value);
  }


  // ===============================
  //  EXERCISE 2 — Delete Colors
  // ===============================

  const colorSelect = document.getElementById("colorSelect");
  const removeButton = document.querySelector('input[type="button"]');

  if (colorSelect && removeButton) {

    removeButton.addEventListener("click", removecolor);

    function removecolor() {
      const selectedIndex = colorSelect.selectedIndex;

      if (selectedIndex !== -1) {
        colorSelect.remove(selectedIndex);
      }
    }
  }


  // ===============================
  //  EXERCISE 3 — Shopping List
  // ===============================

  const root = document.getElementById("root");

  if (root) {

    let shoppingList = [];

    // Create form
    const form = document.createElement("form");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter item";

    const addButton = document.createElement("button");
    addButton.textContent = "AddItem";
    addButton.type = "submit";

    const clearButton = document.createElement("button");
    clearButton.textContent = "ClearAll";
    clearButton.type = "button";

    const ul = document.createElement("ul");

    form.appendChild(input);
    form.appendChild(addButton);
    form.appendChild(clearButton);

    root.appendChild(form);
    root.appendChild(ul);

    // Add Item
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      addItem();
    });

    function addItem() {
      const value = input.value.trim();

      if (value !== "") {
        shoppingList.push(value);

        const li = document.createElement("li");
        li.textContent = value;
        ul.appendChild(li);

        input.value = "";
      }
    }

    // Clear All
    clearButton.addEventListener("click", clearAll);

    function clearAll() {
      shoppingList = [];
      ul.innerHTML = "";
    }
  }

});