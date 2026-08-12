
export function renderMessages(contents, character, isTyping = false) {
  const container = document.getElementById("chat-messages");

 let html = container.innerHTML = contents.map(msg => `
    <div class="message message--${msg.role}">
      <span class="message-role">${msg.role === "user" ? "" :  character  }</span>
      <p class="message-text">${msg.parts[0]?.text ?? ""}</p>
    </div>
  `).join("");

  if (isTyping) {
    html += `
      <div class="message message--model message--typing">
        <span class="message-role">${character}</span>
        <p class="message-text typing-dots">
          <span></span><span></span><span></span>
        </p>
      </div>
    `;
  }

  container.innerHTML = html;
  container.scrollTop = container.scrollHeight;
}

export function disableSendButton() {
  document.getElementById("send-btn").disabled = true;
}
export function enableSendButton() {
  document.getElementById("send-btn").disabled = false;
}

export function disableInput() {
  const input = document.getElementById("chat-input");
  if (input) input.disabled = true;
}

export function enableInput() {
  const input = document.getElementById("chat-input");
  if (input) input.disabled = false;
}

export function clearInput() {
  const input = document.getElementById("chat-input");
  if (input) input.value = "";
}

export function showRetryState(secs) {
  const status = document.getElementById("status");
  status.textContent = `Reintentando en ${secs}s...`;
  status.classList.add("chat-status--retry");
  status.classList.remove("chat-status--error");
}

export function showError(msg) {
  const status = document.getElementById("status");
  status.textContent = msg;
  status.classList.add("chat-status--error");
  status.classList.remove("chat-status--retry");
}

export function clearStatus() {
  const status = document.getElementById("status");
  status.textContent = "";
  status.classList.remove("chat-status--retry", "chat-status--error");
}

export function updateTokenUsage(usage) {
  const el = document.getElementById("token-usage");
  if (!el) return;
 
  //el.textContent = `Tokens de sesión (simulado): ${usage.totalTokens} / ${usage.limit} — quedan ${usage.remaining}`;
  //el.classList.toggle("token-usage--warning", usage.remaining <= usage.limit * 0.2);
  //el.classList.toggle("token-usage--exhausted", usage.remaining === 0);
}