let mensagens = [];
const nome = prompt('informe seu nome: ');

const user = {
    name: nome
}
const userName = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", user);
userName.then(entrada);

function entrada(){
    const listaUsers = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    listaUsers.then(carregarUsers);
    console.log(listaUsers);
    alert("vc entrou");
}

function carregarUsers(usuarios){
    console.log(usuarios.data);
}

//----FIM ENVIO NOME------//


function carregarMsgs(msgs) {
    mensagens = msgs.data;
    console.log(mensagens);

    // const newuser = {name: nome}
    renderizar();
}
function renderizar() {
    const chat = document.querySelector('.msgcorpo');
    
    for (let i = 0; i < chat.length; i++) {
        msg.innerHTML = + `<li class="msg">${mensagens[i]}</li>`;
    }
}