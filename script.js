const messageBox = document.querySelector(".message_box");
const newMsg = document.querySelector(".message");
const accName = prompt("Digite o nome do usuário");
function login() {
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants",
    {
      name: accName,
    }
  );
  promise.then(handleAnswer);
  promise.catch(handleError);

  function handleAnswer(answer) {
    setInterval(handleReload, 5000);
    setInterval(msgLoader, 3000);
  }
  function handleError(error) {
    console.log(error.status);
  }
}
function handleReload() {
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/status",
    {
      name: accName,
    }
  );
  promise.then(handleAnswer);
  promise.catch(handleError);
  function handleAnswer() {}
  function handleError(error) {
    console.log(error.status);
  }
}

login();
function msgLoader() {
  const promiseMsg = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/messages"
  );
  promiseMsg.then(msgRender);
  promiseMsg.catch(errorMsg);

  function msgRender(message) {
    const contentArray = message.data;
    contentArray.forEach(organize);
  }
  function organize(content) {
    if (content.type === "status") {
      messageBox.innerHTML += `<div class="message-inside grey"><div class="message">
          <span class="light margin">${content.time} </span>
          <span class="bold margin">${content.from} </span> ${content.text}
        </div></div>`;
    } else if (content.to === accName && content.type === "private_message") {
      messageBox.innerHTML += `<div class="message-inside red"><div class="message">
          <span class="light margin">${content.time}</span>
          <span class="bold margin">${
            content.from
          }</span> reservadamente para<span class="bold margin">${
        content.to + `:`
      }</span>${content.text}
        </div></div>`;
    } else {
      messageBox.innerHTML += `<div class="message-inside"><div class="message">
          <span class="light margin">${content.time}</span>
          <span class="bold margin">${
            content.from
          }</span>para<span class="bold margin">${content.to + `:`}</span>${
        content.text
      }
        </div></div>`;
    }
  }
  function errorMsg() {
    console.log(error.status);
  }
  const lastElement = messageBox.lastElementChild;

  lastElement.scrollIntoView();
}

function sendsMessage() {
  //   //coloca o input value dentro de um const , então faz axios post('url',{"paradinhas:constCriado..."})
  const message = document.querySelector(".input").value;

  const sending = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/messages",
    {
      from: accName,
      to: "Todos",
      text: message,
      type: "message",
    }
  );
}
