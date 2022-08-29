const messageBox = document.querySelector(".message-box");
const promiseMsg = axios.get(
  "https://mock-api.driven.com.br/api/v6/uol/messages"
);
promiseMsg.then(msgRender);

function msgRender(message) {
  console.log(message);
  //   const messageBox = document.querySelector(".message-box");
  console.log(messageBox);
  const contentArray = message.data;
  contentArray.forEach(organize);
  //   const from = message.data.from;
  //   const to = message.data.to;
  //   const texto = message.data;
  //   const type = message.data.type;
  //   const time = message.data.time;
  //   console.log(texto);
  // msgRender();
  //   messageBox.innerHTML = `<div class="message-inside grey"><div class="message">
  //           <span class="light">2222</span>para
  //           <span class="bold">eu</span> aaaaaaaaaaa
  //         </div></div>`;
}
// const inputContent = document.querySelector(".input").value;
// console.log(inputContent);

function organize(content) {
  if (
    content.text.includes("entra na sala...") ||
    content.text.includes("sai da sala...")
  ) {
    messageBox.innerHTML += `<div class="message-inside grey"><div class="message">
          <span class="light">${content.time}</span>
          <span class="bold">${content.from}</span> ${content.text}
        </div></div>`;
  } else if (content.to !== "Todos") {
    messageBox.innerHTML += `<div class="message-inside red"><div class="message">
          <span class="light">${content.time}</span>
          <span class="bold">${content.from}</span> reservadamente para<span class="bold">${content.to}</span>${content.text}
        </div></div>`;
  } else {
    messageBox.innerHTML += `<div class="message-inside"><div class="message">
          <span class="light">${content.time}</span>
          <span class="bold">${content.from}</span>para<span class="bold">${content.to}</span>${content.text}
        </div></div>`;
  }
}
