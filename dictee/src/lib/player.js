function splitText(text) {
  let delimiters = [",", ".", "!", ":", "?", ";", " - "];
  let arr = [];
  let buffer = "";
  for (let i = 0; i < text.length; i++) {
    if (delimiters.includes(text[i])) {
      buffer += text[i];
      arr.push(buffer);
      buffer = "";
    } else {
      buffer += text[i];
    }
  }
  if (buffer.length > 0) {
    arr.push(buffer);
  }
  return arr;
}

export function playText(text) {
  setTimeout(() => {
    console.log(window.speechSynthesis.getVoices());
  }, 50);
  const utterance = new SpeechSynthesisUtterance(text);
  let voices = window.speechSynthesis.getVoices();
  console.log(voices);
  for (let i = 0; i < voices.length; i++) {
    console.log(voices[i].name);
    if (voices[i].name === "Google français") {
      utterance.voice = voices[i];
    }
  }
  console.log(utterance);
  speechSynthesis.speak(utterance);
}

console.log(
  splitText(
    "Bonjour, je m'appelle Jean. Je suis français. Je suis né à Paris. Je suis né le 1e"
  )
);

function playTextNew(text) {
  setTimeout(() => {
    console.log(window.speechSynthesis.getVoices());
  }, 50);
  splitted = splitText(text);
  const start = Date.now();
  const utterance = new SpeechSynthesisUtterance(text);
  let voices = window.speechSynthesis.getVoices();
  for (let i = 0; i < voices.length; i++) {
    console.log(voices[i].name);
    if (voices[i].name === "Google français") {
      utterance.voice = voices[i];
    }
  }
  utterance.rate = 0.8;
  speechSynthesis.speak(utterance);
  while (speechSynthesis.speaking) {
    console.log("speaking");
  }
  utterance.rate = 1;
  setTimeout(() => {
    for (let i = 0; i < splitted.length; i++) {
      utterance.text = splitted[i]
        .replace('"', " guillemets")
        .replace("...", " point de suspension")
        .replace(".", " point")
        .replace(",", " virgule")
        .replace("!", " point d'exclamation")
        .replace("?", " point d'interrogation")
        .replace(";", " point virgule")
        .replace(":", " deux point")
        .replace(" - ", " tiret");
      speechSynthesis.speak(utterance);
      while (speechSynthesis.speaking) {
        console.log("speaking");
      }
      setTimeout(() => {
        console.log("waiting");
      }, 1000);
      speechSynthesis.speak(utterance);
      while (speechSynthesis.speaking) {
        console.log("speaking");
      }
      setTimeout(() => {
        console.log("waiting");
      }, 2000);
    }
  }, 1000 * 60);
  relecture = (20 * 60 - (Date.now() - start) * 1000) / 60;
  setTimeout(() => {
    utterance.text = text;
    speechSynthesis.speak(utterance);
  }, 1000 * 60 * relecture);
}
