let mensagens = [];
// const name=prompt('informe seu nome: ');

const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
promise.then(carregarMsgs);
// const envio = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", name);


function carregarMsgs(msgs){
    console.log(msgs.data);
    mensagens = msgs.data;
    console.log(mensagens);
    renderizar();
}
function renderizar(){
    const chat = document.querySelector('.msgcorpo');
    console.log(chat);
    for (let i=0; i<chat.length; i++){
        msg.innerHTML =+ `<li class="msg">${chat[i]}</li>`;
    }
}