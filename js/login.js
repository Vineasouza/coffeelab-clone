const loginButton = document.querySelector(".login-button");
const modalContainer = document.querySelector(".modal-container");
const modalCloseButton = document.querySelector(".modal-close-button");

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
