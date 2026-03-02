
document.addEventListener("DOMContentLoaded", function () {

  // Création de l'input
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Letters only";

  // Ajout dans le body
  document.body.appendChild(input);

  // Événement pour autoriser uniquement les lettres
  input.addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Z]/g, "");
  });

});