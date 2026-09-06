const generateButton = document.getElementById("generate");
const promptInput = document.getElementById("prompt");
const status = document.getElementById("status");
const result = document.getElementById("result");
const video = document.getElementById("video");
const download = document.getElementById("download");
const creditsElement = document.getElementById("credits");

let credits = 10;

generateButton.addEventListener("click", async () => {

  const prompt = promptInput.value.trim();

  if (!prompt) {
    status.textContent = "⚠️ Сначала напиши описание видео.";
    return;
  }

  if (credits <= 0) {
    status.textContent = "У тебя закончились кредиты.";
    return;
  }

  generateButton.disabled = true;
  generateButton.textContent = "⏳ Генерация...";
  status.textContent = "AI создаёт твоё видео...";

  /*
    ПОКА ЭТО ДЕМО.

    Настоящий AI API подключим через backend.
    API-ключ НЕЛЬЗЯ хранить здесь,
    потому что этот JavaScript видит любой посетитель.
  */

  await new Promise(resolve => setTimeout(resolve, 2500));

  credits--;
  creditsElement.textContent = credits;

  status.textContent =
    "Демо готово. Следующим шагом подключаем настоящий AI.";

  generateButton.disabled = false;
  generateButton.textContent = "✦ Сгенерировать";

});
