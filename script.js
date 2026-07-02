const searchBox = document.getElementById("searchBox");
const suggestionList = document.getElementById("suggestionList");
const micButton = document.getElementById("micButton");
const status = document.getElementById("status");
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;

if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

}

let words = [];

// JSON file load
fetch("medical_terms.json")
  .then(response => response.json())
  .then(data => {
    words = data;
  })
  .catch(error => {
    console.error("Dictionary load failed:", error);
  });

function showSuggestions(text) {

    suggestionList.innerHTML = "";

    if (text === "") return;

    const results = words.filter(word =>
        word.toLowerCase().startsWith(text.toLowerCase())
    );

    results.forEach(word => {

        const li = document.createElement("li");

        li.textContent = word;

        suggestionList.appendChild(li);

    });

}

// Live search
searchBox.addEventListener("input", () => {

    showSuggestions(searchBox.value);

});

// Fake microphone
micButton.addEventListener("click", () => {

    if (!recognition) {

        alert("Speech Recognition is not supported in this browser.");

        return;

    }

    status.textContent = "🎤 Listening...";

    recognition.start();

});

if (recognition) {

    recognition.onresult = function(event) {

        const spokenText = event.results[0][0].transcript.trim();

        searchBox.value = spokenText;

        showSuggestions(spokenText);

        status.textContent = "✅ Ready";

    };

    recognition.onerror = function() {

        status.textContent = "❌ Microphone Error";

    };

    recognition.onend = function() {

        status.textContent = "✅ Ready";

    };

}
