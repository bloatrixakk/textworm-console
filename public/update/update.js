document.addEventListener("DOMContentLoaded", () => {
  window.bridge.updateMessage(updateMessage);
});

function updateMessage(event, message) {
  let msgElem = document.getElementById("update_message");
  msgElem.innerHTML = message;
}