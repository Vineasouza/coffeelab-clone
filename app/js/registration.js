const tituloFilme = document.querySelector(".mov_title");
const tituloOriginalFilme = document.querySelector(".mov_original_title");
const tituloRomanizadoFilme = document.querySelector(
  ".mov_original_title_romanised"
);
const dataLancamentoFilme = document.querySelector(".mov_release_date");
const descricaoFilme = document.querySelector(".mov_description");
const diretorFilme = document.querySelector(".mov_director");
const botaoSubmit = document.querySelector(".registration-button-submit");
const errorMessage = document.querySelector(".registration-error-message");
const errorRealeaseMessage = document.querySelector(".registration-error-date");
const fileUpload = document.querySelector(".registration-file-upload");
const sucessMessage = document.querySelector(".registration-sucess-message");

const validaUpload = (file) => {
  var extensoesPermitidas = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

  if (!extensoesPermitidas.exec(file)) {
    alert("Invalid file type");
    fileUpload.value = "";
    return false;
  } else {
    return true;
  }
};

const validaAno = (ano) => {
  if (/^[0-9]{4,4}/.test(ano)) {
    errorRealeaseMessage.innerHTML = "";
    return true;
  } else {
    errorRealeaseMessage.innerHTML = "Permitido apenas 4 números";
    return false;
  }
};

const naoVazio = (text) => {
  if (text.trim() !== "") {
    return true;
  } else {
    return false;
  }
};

var posterPATH = "";
var formData = new FormData();

fileUpload.addEventListener("change", function (e) {
  var file = fileUpload.files[0];
  validaUpload(fileUpload.value);
  formData.append("file", file);
});

botaoSubmit.onclick = () => {
  let dados = {
    mov_title: tituloFilme.value,
    mov_original_title: tituloOriginalFilme.value,
    mov_original_title_romanised: tituloRomanizadoFilme.value,
    mov_release_date: dataLancamentoFilme.value,
    mov_description: descricaoFilme.value,
    mov_director: diretorFilme.value,
  };

  let validacao = Object.values(dados)
    .map((dados) => naoVazio(dados))
    .every((e) => e === true);

  let dadosValidados = [
    validaAno(dataLancamentoFilme.value),
    validacao,
    validaUpload(fileUpload.value),
  ].every((e) => e === true);

  if (!dadosValidados) {
    errorMessage.innerHTML = "Não é permitido campos vazios";
  } else {
    errorMessage.innerHTML = "";

    const envioDoPoster = new Promise((resolve, reject) => {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("POST", "http://localhost:3045/upload/create", true);
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 201) {
          posterPATH = JSON.parse(xmlhttp.responseText).file_path;
          resolve(posterPATH);
        } else if (xmlhttp.status === 400) {
          console.log("Erro no upload do arquivo");

          reject("Erro no upload do arquivo");
        }
      };
      xmlhttp.send(formData);
    });

    envioDoPoster
      .then((urlDoPoster) => {
        var xmlhttp2 = new XMLHttpRequest();
        xmlhttp2.open("POST", "http://localhost:3045/movies/create", true);
        xmlhttp2.setRequestHeader("Content-Type", "application/json");
        xmlhttp2.onreadystatechange = function () {
          if (xmlhttp2.readyState === 4 && xmlhttp2.status === 200) {
            sucessMessage.innerHTML = "Filme adicionado com sucesso!";
            console.log(xmlhttp2.responseText);
          } else if (xmlhttp2.status === 400) {
            console.log(xmlhttp2.responseText);
          }
        };
        xmlhttp2.send(
          JSON.stringify({
            mov_title: tituloFilme.value,
            mov_original_title: tituloOriginalFilme.value,
            mov_original_title_romanised: tituloRomanizadoFilme.value,
            mov_release_date: dataLancamentoFilme.value,
            mov_description: descricaoFilme.value,
            mov_director: diretorFilme.value,
            mov_posterurl: urlDoPoster,
          })
        );
      })
      .catch((erro) => console.log(erro));
  }
};
