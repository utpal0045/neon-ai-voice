const mic = document.getElementById("mic");
const status = document.getElementById("status");
const userText = document.getElementById("userText");
const aiText = document.getElementById("aiText");
const log = document.getElementById("log");

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

if (!SpeechRecognition) {

  status.innerText = "VOICE NOT SUPPORTED";

} else {

  const recognition = new SpeechRecognition();

  recognition.lang = "en-IN";
  recognition.continuous = false;
  recognition.interimResults = false;

  mic.addEventListener("click", function () {

    try {

      recognition.start();

      mic.classList.add("listening");
      mic.querySelector("span").innerText = "LISTENING...";

      status.innerText = "VOICE INPUT // LISTENING";

      addLog("> Microphone activated");

    } catch (error) {

      console.log(error);

    }

  });

  recognition.onresult = function (event) {

    const text =
      event.results[0][0].transcript;

    userText.innerText = text;

    status.innerText = "PROCESSING INPUT...";

    addLog("> Input received: " + text);

    const answer = getResponse(text);

    aiText.innerText = answer;

    addLog("> Response generated");

    status.innerText = "SYSTEM READY";

    speak(answer);

  };

  recognition.onend = function () {

    mic.classList.remove("listening");

    mic.querySelector("span").innerText =
      "START LISTENING";

  };

  recognition.onerror = function (event) {

    mic.classList.remove("listening");

    mic.querySelector("span").innerText =
      "START LISTENING";

    status.innerText =
      "VOICE ERROR // TRY AGAIN";

    addLog("> Error: " + event.error);

  };

}


function getResponse(text) {

  const message = text.toLowerCase();


  if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey")
  ) {

    return "Hello. NEON AI is online and ready.";

  }


  if (
    message.includes("your name") ||
    message.includes("তোমাৰ নাম")
  ) {

    return "My name is NEON AI Voice Assistant.";

  }


  if (
    message.includes("who are you") ||
    message.includes("তুমি কোন")
  ) {

    return "I am your browser based voice assistant.";

  }


  if (
    message.includes("time") ||
    message.includes("সময়")
  ) {

    const now = new Date();

    return "The current time is " +
      now.toLocaleTimeString();

  }


  if (
    message.includes("date") ||
    message.includes("তাৰিখ")
  ) {

    const today = new Date();

    return "Today's date is " +
      today.toLocaleDateString();

  }


  if (message.includes("thank")) {

    return "You're welcome. System remains online.";

  }


  if (
    message.includes("assam") ||
    message.includes("অসম")
  ) {

    return "Assam is a beautiful state in northeastern India.";

  }


  if (
    message.includes("help") ||
    message.includes("সহায়")
  ) {

    return "You can ask me about the time, date, Assam, or basic questions.";

  }


  return "I heard: " +
    text +
    ". This is the free browser version of NEON AI.";

}


function speak(text) {

  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const voice =
    new SpeechSynthesisUtterance(text);

  voice.lang = "en-IN";
  voice.rate = 0.9;
  voice.pitch = 1;
  voice.volume = 1;

  window.speechSynthesis.speak(voice);

}


function addLog(text) {

  const line =
    document.createElement("p");

  line.innerText = text;

  log.appendChild(line);

  while (log.children.length > 7) {

    log.removeChild(log.firstChild);

  }

}