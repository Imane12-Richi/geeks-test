   // html field named dailychallenge
   const form = document.getElementById("myForm");

    form.addEventListener("submit", function(event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const lastName = document.getElementById("lastName").value;

      const data = {
        name: name,
        lastName: lastName
      };

      document.getElementById("output").textContent =
        JSON.stringify(data);
    });