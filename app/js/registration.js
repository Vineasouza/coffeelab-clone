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

let posterPATH = "";
fileUpload.addEventListener("change", function (e) {
  var xmlhttp = new XMLHttpRequest();
  var file = fileUpload.files[0];
  xmlhttp.open("POST", "http://localhost:3045/upload/create", true);
  var formData = new FormData();
  formData.append("file", file);
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      console.log(xmlhttp.responseText);
      // posterPATH = xmlhttp.responseText
    } else if (xmlhttp.status === 400) {
      console.log("Erro no upload do arquivo");
    }
  };

  xmlhttp.send(formData);
});

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

botaoSubmit.onclick = () => {
  let dados = {
    mov_title: tituloFilme.value,
    mov_original_title: tituloOriginalFilme.value,
    mov_original_title_romanised: tituloRomanizadoFilme.value,
    mov_release_date: dataLancamentoFilme.value,
    mov_description: descricaoFilme.value,
    mov_director: diretorFilme.value,
    mov_posterURL: posterPATH,
  };
  let validacao = Object.values(dados)
    .map((dados) => naoVazio(dados))
    .every((e) => e === true);

  let dadosValidados = [validaAno(dataLancamentoFilme.value), validacao].every(
    (e) => e === true
  );

  if (!dadosValidados) {
    errorMessage.innerHTML = "Não é permitido campos vazios";
  } else {
    errorMessage.innerHTML = "";

    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.open("POST", "http://localhost:3045/upload/create", true);
    // xmlhttp.setRequestHeader("Content-Type", "multipart/form-data");
    // var formData = new FormData();
    // formData.append("thefile", file);
    // xmlhttp.send(formData);

    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.open("POST", "http://localhost:3045/movies/create", true);
    // xmlhttp.setRequestHeader("Content-Type", "application/json");
    // xmlhttp.onreadystatechange = function () {
    //   if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    //   } else if (xmlhttp.status === 400) {
    //   }
    // };
    // xmlhttp.send(
    //   JSON.stringify({
    //     mov_title: tituloFilme.value,
    //     mov_original_title: tituloOriginalFilme.value,
    //     mov_original_title_romanised: tituloRomanizadoFilme.value,
    //     mov_release_date: dataLancamentoFilme.value,
    //     mov_description: descricaoFilme.value,
    //     mov_director: diretorFilme.value,
    //     mov_posterURL: "",
    //   })
    // );
  }
};
