export function playText(text) {
        setTimeout(()=>{console.log(window.speechSynthesis.getVoices())},50)
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