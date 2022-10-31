const nome = {};
const chat = {};
let user = '';

inicio();

function inicio() {
    // const name=prompt('informe seu nome: ');
    const nome = { name: prompt('informe seu nome: ') };//adiciona nome inserido a um objeto
    const userName = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nome);//adiciona nome na api
    user = nome.name;
    userName.then(carregarMsgs);
    userName.catch(inicio);
}
// ----- FIM ADICIONAR USUARIO- ----///
online();
function online() {
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", { name: nome });
}
setInterval(online, 2000);

// online();
/*
    function keepConnected() {
        setInterval(() => {
        axios.post("https://mock-api.driven.com.br/api/v6/uol/status", { name: nome }), then((resposta) => console.log(resposta.status));
    }, 5000);
}
online();

*/

function carregarMsgs() {
    const mensagens = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    mensagens.then(msgs);
}

setInterval(carregarMsgs, 10000);


function msgs(resposta) {
    const mensagens = resposta.data; //retorno msgs servidor from: to: text: type: time//
    const chat = document.querySelector('.msgcorpo');
    chat.innerHTML = '';
    for (let i = 0; i < mensagens.length; i++) {
        const msg = mensagens[i];
        if (msg.type === "status") {
            chat.innerHTML += `<li class="msg status">
                            <span><time>(${msg.time})</time> <span class=bold> ${msg.from}</span> ${msg.text}</span>
                            </li>`;
        }
        else if (msg.type === "message") {
            if (msg.to === 'Todos') {
                chat.innerHTML += `<li class="msg">
                            <span><time>(${msg.time})</time> <span class=bold>${msg.from}</span> para: <span class=bold>${msg.to}</span> ${msg.text}</span>
                            </li>`;
            }
        }
        else if (msg.type === "private-message") {
            if (msg.to === user) {
                chat.innerHTML += `<li class="msg reservada">
                            <span><time>(${msg.time})</time> <span class=bold>${msg.from}</span> reservadamente para: <span class=bold>${msg.to}</span> ${msg.text}</span>
                            </li>`;
            }
        }

    }
    const lastmsg = document.querySelector('.msgcorpo').lastElementChild;
    lastmsg.scrollIntoView();
}

function enviarmsg() {
    const dest = '';
    const x = document.querySelector(".texto");
    console.log(x.value);
    let condicao = confirm('enviar mensagem para todos?');
    if (condicao) {
        sendmsg(x.value);
    } else {
        dest = prompt("Informe o destinatário");
        sendmsg(x.value, dest);
    }
}

function sendmsg(texto, dest) {
    const y = texto;
    let enviar = {};
    if (dest !== '') {
        enviar = {
            from: user,
            to: 'todos',
            text: y,
            type: 'message' // ou "private_message" para o bônus
        }
    }
    const z = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", enviar);
    z.then(carregarMsgs);
   // z.catch(window.location.reload());

}

/*  const msg = mensagens[i];
    if (msg.type === "status") {
        alert("entrou if");
        chat.innerHTML += `<li class="msg">
                            <span><span class="time">${msg.time}<b> ${msg.from} ${msg.text}</span></span>
                            </li>`;
    }
}*/

// chat.scrollIntoView();

// }

    //----FIM ENVIO NOME------//

/*
 
    function renderizar() {
        const chat = document.querySelector('.msgcorpo');
        console.log(chat);
        for (let i = 0; i < chat.length; i++) {
            msg.innerHTML = + `<li class="msg">${chat[i]}</li>`;
        }
        for (let i = 0; i < chat.length; i++) {
            msg.innerHTML = + `<li class="msg">${mensagens[i]}</li>`;
        }
    }*/