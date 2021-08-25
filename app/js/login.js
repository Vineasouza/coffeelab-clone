const loginButton = document.querySelector(".login-button");
const modalContainer = document.querySelector(".modal-container");
const modalCloseButton = document.querySelector(".modal-close-button");
const modalLoginButton = document.querySelector(".modal-button");
const emailValue = document.querySelector(".login-email").value;
const passwordValue = document.querySelector(".login-password").value;
const imgBackground = document.querySelector(".img");
const contentWrapper = document.querySelector(".content-wrapper");
const searchContainer = document.querySelector(".search-container");

/* ADICIONANDO FUNCIONALIDADES NOS BOTÕES E NO MODAL */

// Quando clicar no botao "Area do Aluno", abre o modal de login
loginButton.onclick = () => {
  modalContainer.style.display = "flex";
};

// Fechar o modal ao clicar fora dele
modalContainer.onclick = (e) => {
  if (e.target === modalContainer) modalContainer.style.display = "none";
};

// Fechar o modal ao clicar no botão de fechar o modal
modalCloseButton.onclick = (e) => {
  if (e.target === modalCloseButton) modalContainer.style.display = "none";
};

/*
"email": "eve.holt@reqres.in",
"password": "cityslicka"
*/

/* FLUXO DE LOGIN - VERIFICACAO, VALIDAÇÃO, REVERSÃO DA VALIDAÇÃO, LOGIN E LOGOUT */

const userLogged = () => {
  // Alterando botão da tela inicial de "área do aluno" para sair, bem como sua ação
  loginButton.innerHTML = "sair";
  loginButton.onclick = logout;

  // Alterando items do layout para exibir items pertinentes
  modalContainer.style.display = "none";
  searchContainer.style.display = "flex";
  imgBackground.style.display = "none";
  contentWrapper.style.display = "none";

  // Modificando mensagem de boas vindas com o nome do usuário
  const saudacao = document.querySelector(".search-text-title");
  const email = localStorage.getItem("email");
  saudacao.innerHTML = `olá, ${email.split("@")[0]}!`;

  if (isUserLogged) fetchFilms();
};

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
  // Limpar token e e-mail do storage
  localStorage.removeItem("token");
  localStorage.removeItem("email");

  // Voltar itens da tela inicial ao estado anterior
  loginButton.innerHTML = "área do aluno";
  loginButton.onclick = () => {
    modalContainer.style.display = "flex";
  };

  imgBackground.style.display = "initial";
  contentWrapper.style.display = "flex";
  searchContainer.style.display = "none";
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
    modalLoginButton.innerHTML = "entrar";
    return null;
  }

  // Fazendo requisição ao reqres.in
  xmlhttp.open("POST", "https://reqres.in/api/login", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      // Login bem-sucedido -> Alterando botão de login para botão de logout e salvando token no localStorage

      // Armazendando e-mail e token no localStorage
      localStorage.setItem("email", emailElement.value);
      localStorage.setItem("token", JSON.parse(xmlhttp.responseText).token);

      // Limpando conteúdo dos campos de login e senha
      emailElement.value = "";
      passwordElement.value = "";

      userLogged();
    } else if (xmlhttp.status === 400) {
      // Login mal-sucedido -> Exibindo mensagem de erro e revertendo botão 'Carregando...' para 'entrar'

      const { errorMessageElement, parentElement } = validation;
      errorMessageElement.innerHTML = "e-mail ou senha incorretos";
      parentElement.insertBefore(
        errorMessageElement,
        parentElement.children[4]
      );

      passwordElement.onkeydown = () =>
        revertValidationError(validation, passwordElement);
    }
    modalLoginButton.innerHTML = "entrar";
  };
  xmlhttp.send(
    JSON.stringify({
      email: emailElement.value,
      password: passwordElement.value,
    })
  );
};

const isUserLogged = () => {
  if (localStorage.getItem("token")) return true;
  return false;
};

// Mudando o que acontece ao clicar no botao de login
modalLoginButton.onclick = login;

// Verificando se o usuário já se encontra logado
if (isUserLogged()) userLogged();
