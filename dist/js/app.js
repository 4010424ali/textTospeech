// Intit SpeechSynth API

const synth = window.speechSynthesis;

//Select Dom element

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

const body = document.querySelector('body');

// Init voice arrat
let voices = [];
const getVoices = () => {
  voices = synth.getVoices();
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = voice.name + '(' + voice.lang + ')';

    // Set needed option attributes

    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};
getVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

//Speak

const speak = () => {
  // Check if speacking

  if (synth.speaking) {
    console.error('Already speaking.. ');
  }

  if (textInput.value !== '') {
    //Add bacground Animation
    body.style.background = '#1141414 url(img/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';

    const speakText = new SpeechSynthesisUtterance(textInput.value);

    speakText.onend = e => {
      console.log('Done speaking....');
      body.style.backgroundColor = '#141414';
    };

    speakText.onrror = e => {
      console.error('Something went wrong');
    };

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      'data-name'
    );

    // Loop throungh voices

    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set pitch and rate

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //Speak
    synth.speak(speakText);
  }
};

//EVENT LISTENER

// Text form submit

textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
});

// Rate value change

rate.addEventListener('change', e => {
  rateValue.textContent = rate.value;
});

pitch.addEventListener('change', e => {
  pitchValue.textContent = pitch.value;
});

// Voice select change

voiceSelect.addEventListener('change', e => speak());
