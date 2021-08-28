const signUpButton = document.querySelector(".signup-button");
const modalLoginContainer = document.querySelector(".modal-container");
const modalCadastroContainer = document.querySelector(
  ".modal-cadastro-container"
);
const modalSucessoContainer = document.querySelector(
  ".modal-sucesso-cadastro-container"
);

/* Alternar para o modal de cadastro ao clicar em 'cadastrar-se' */
signUpButton.onclick = (e) => {
  if (e.target === signUpButton) {
    modalLoginContainer.style.display = "none";
    modalCadastroContainer.style.display = "flex";
  }
};

/* Fechando modal de cadastro ao clicar no 'X' */
const modalCadastroCloseButton = document.querySelector(
  ".modal-cadastro-close-button"
);
modalCadastroCloseButton.onclick = (e) => {
  if (e.target === modalCadastroCloseButton) {
    modalCadastroContainer.style.display = "none";
  }
};

/* Fechando modal de cadastro ao clicar no 'X' */
const modalSucessoCadastroCloseButton = document.querySelector(
  ".modal-sucesso-cadastro-close-button"
);
modalSucessoCadastroCloseButton.onclick = (e) => {
  if (e.target === modalSucessoCadastroCloseButton) {
    modalSucessoContainer.style.display = "none";
  }
};

const mostrarSucesso = () => {
  modalCadastroContainer.style.display = "none";
  modalSucessoContainer.style.display = "flex";
};

/* Realizando procedimento de cadastro */
const validateCadastro = (email, password, confirmPassword) => {
  const cadastroContainer = document.querySelector(".input-cadastro");

  const errorMessage = document.createElement("span");
  errorMessage.id = "signUpErrorMessage";
  errorMessage.classList.add("cadastro-error-message");

  let error = {
    errorMessageElement: errorMessage,
    field: "",
    parentElement: cadastroContainer,
  };

  if (confirmPassword.trim() === "") {
    errorMessage.innerHTML = "a confirmação de senha não pode ser vazia";
    error = { ...error, field: "confirmPassword" };
  }

  if (confirmPassword.trim() !== password.trim()) {
    errorMessage.innerHTML = "as senhas não conferem";
    error = { ...error, field: "confirmPassword" };
  }

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
    const erroAtual = document.getElementById("signUpErrorMessage");
    if (erroAtual) erroAtual.parentElement.removeChild(erroAtual);
    cadastroContainer.insertBefore(errorMessage, cadastroContainer.children[6]);
    return { ...error, valid: false };
  }

  return { ...error, valid: true };
};

const emailCadastroElement = document.querySelector(".cadastro-email");
const senhaCadastroElement = document.querySelector(".cadastro-password");
const confirmarSenhaCadastroElement = document.querySelector(
  ".cadastro-confirm-password"
);

const erroCadastro = {
  email: false,
  senha: false,
  confirmarSenha: false,
  message: "",
};

const cadastro = () => {
  // Inicializando constantes e variáveis
  var xmlhttp = new XMLHttpRequest();

  const validation = validateCadastro(
    emailCadastroElement.value,
    senhaCadastroElement.value,
    confirmarSenhaCadastroElement.value
  ); // Aqui já é feita a validação dos campos

  // Aplicando resultado da validação nos campos
  if (!validation.valid) {
    if (validation.field === "email") {
      emailCadastroElement.classList.add("input-error");
      emailCadastroElement.onkeydown = () =>
        revertValidationError(validation, emailCadastroElement);
    }
    if (validation.field === "confirmPassword") {
      confirmarSenhaCadastroElement.classList.add("input-error");
      confirmarSenhaCadastroElement.onkeydown = () =>
        revertValidationError(validation, confirmarSenhaCadastroElement);
    }
    if (validation.field === "password") {
      senhaCadastroElement.classList.add("input-error");
      senhaCadastroElement.onkeydown = () =>
        revertValidationError(validation, senhaCadastroElement);
    }
    modalLoginButton.innerHTML = "entrar";
    return null;
  }

  // Fazendo requisição ao reqres.in
  xmlhttp.open(
    "POST",
    "https://coffeelab-clone-api.herokuapp.com/users/signup",
    true
  );
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      // Cadastro bem-sucedido -> Exibe mensagem de sucesso

      mostrarSucesso();

      // Armazendando e-mail e token no localStorage
      // localStorage.setItem("email", emailElement.value);
      // localStorage.setItem("token", JSON.parse(xmlhttp.responseText).token);
    } else if (xmlhttp.status === 400) {
      // Login mal-sucedido -> Exibindo mensagem de erro e revertendo botão 'Carregando...' para 'entrar'
      const { errorMessageElement, parentElement } = validation;
      errorMessageElement.innerHTML =
        "erro no cadastro: " + JSON.parse(xmlhttp.responseText).errorMessage;

      const erroAtual = document.getElementById("signUpErrorMessage");
      console.log("erroAtual > ", erroAtual);
      if (erroAtual) erroAtual.parentElement.removeChild(erroAtual);

      parentElement.insertBefore(
        errorMessageElement,
        parentElement.children[6]
      );

      confirmarSenhaCadastroElement.onkeydown = () =>
        revertValidationError(validation, confirmarSenhaCadastroElement);
    }
  };
  xmlhttp.send(
    JSON.stringify({
      user_email: emailCadastroElement.value,
      user_password: senhaCadastroElement.value,
    })
  );
};

const criarContaButton = document.querySelector(".modal-cadastro-button");
criarContaButton.onclick = cadastro;
