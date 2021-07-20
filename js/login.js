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

// Fluxo de login

// Função que valida o login (email e senha)
const validateLogin = (email, password) => {
  const loginContainer = document.querySelector(".input-login");

  const errorMessage = document.createElement("span");
  errorMessage.classList.add("login-error-message");

  let error = {
    errorMessageElement: errorMessage,
    field: "",
    parentElement: loginContainer,
  };

  if (password.trim() === "") {
    errorMessage.innerHTML = "a senha não pode ser vazia";
    error = { ...error, field: "password" };
  }

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    errorMessage.innerHTML = "o email foi digitado incorretamente";
    error = { ...error, field: "email" };
  }

  if (email.trim() === "") {
    errorMessage.innerHTML = "o email não pode ser vazio";
    error = { ...error, field: "email" };
  }

  if (errorMessage.innerHTML.trim() !== "") {
    loginContainer.insertBefore(errorMessage, loginContainer.children[4]);
    return { ...error, valid: false };
  }

  return { ...error, valid: true };
};

// Função que limpa as alterações feitas pela validação
const revertValidationError = (validation, element) => {
  const { parentElement, errorMessageElement } = validation;

  element.classList.remove("input-error");
  parentElement.removeChild(errorMessageElement);

  element.onkeydown = null;
};

// Função de logout
const logout = () => {
  // limpar token do storage
  localStorage.removeItem("token");
  loginButton.innerHTML = "área do aluno";
  loginButton.onclick = () => {
    modalContainer.style.display = "flex";
  };
};

// Função de login
const login = () => {
  // Inicializando constantes e variáveis
  var xmlhttp = new XMLHttpRequest();
  const emailElement = document.querySelector(".login-email");
  const passwordElement = document.querySelector(".login-password");
  const validation = validateLogin(emailElement.value, passwordElement.value); // Aqui já é feita a validação dos campos

  // Alterando texto do botão para carregando (melhor para UX)
  modalLoginButton.innerHTML = "Carregando...";

  // Aplicando resultado da validação nos campos
  if (!validation.valid) {
    if (validation.field === "email") {
      emailElement.classList.add("input-error");
      emailElement.onkeydown = () =>
        revertValidationError(validation, emailElement);
    }
    if (validation.field === "password") {
      passwordElement.classList.add("input-error");
      passwordElement.onkeydown = () =>
        revertValidationError(validation, passwordElement);
    }
    modalLoginButton.innerHTML = "Entrar";
    return null;
  }

  // Fazendo requisição ao reqres.in
  xmlhttp.open("POST", "https://reqres.in/api/login", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      // Login bem-sucedido -> Alterando botão de login para botão de logout e salvando token no localStorage

      loginButton.innerHTML = "sair";
      loginButton.onclick = logout;

      emailElement.value = "";
      passwordElement.value = "";

      localStorage.setItem("token", JSON.parse(xmlhttp.responseText).token);

      modalContainer.style.display = "none";
      modalLoginButton.innerHTML = "Entrar";

      fetchFilmsPosters(["castle in the sky"]).then((r) => console.log(r));
    } else if (xmlhttp.status === 400) {
      // Login mal-sucedido -> Exibindo mensagem de erro e revertendo botão 'Carregando...' para 'Entrar'

      const { errorMessageElement, parentElement } = validation;
      errorMessageElement.innerHTML = "e-mail ou senha incorretos";
      parentElement.insertBefore(
        errorMessageElement,
        parentElement.children[4]
      );

      passwordElement.onkeydown = () =>
        revertValidationError(validation, passwordElement);

      modalLoginButton.innerHTML = "Entrar";
    }
  };
  xmlhttp.send(
    JSON.stringify({
      email: emailElement.value,
      password: passwordElement.value,
    })
  );
};

// Mudando o que acontece ao clicar no botao de login
modalLoginButton.onclick = login;
