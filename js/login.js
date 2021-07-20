const loginButton = document.querySelector(".login-button");
const modalContainer = document.querySelector(".modal-container");
const modalCloseButton = document.querySelector(".modal-close-button");
const modalLoginButton = document.querySelector(".modal-button");
const emailValue = document.querySelector(".login-email").value;
const passwordValue = document.querySelector(".login-password").value;

// Quando clicar no botao "Area do Aluno", abre o modal de login
loginButton.onclick = () => {
  modalContainer.style.display = "flex";
};

// Quando clicar no modal, fecha o modal de login
modalContainer.onclick = (e) => {
  if (e.target === modalContainer) modalContainer.style.display = "none";
};
modalCloseButton.onclick = (e) => {
  if (e.target === modalCloseButton) modalContainer.style.display = "none";
};

/*
"email": "eve.holt@reqres.in",
"password": "cityslicka"
*/

modalLoginButton.onclick = () => {
  var xmlhttp = new XMLHttpRequest();
  const emailValue = document.querySelector(".login-email").value;
  const passwordValue = document.querySelector(".login-password").value;
  xmlhttp.open("POST", "https://reqres.in/api/login", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      console.log("Loggado");
      loginButton.innerHTML = "sair";
      modalContainer.style.display = "none";
    } else {
      console.log(xmlhttp.responseText);
    }
  };
  xmlhttp.send(JSON.stringify({ email: emailValue, password: passwordValue }));
};
