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

    console.log(words);
    alert("Loaded " + words.length + " terms");
  })
  .catch(error => {
    console.error(error);
    alert("JSON Error");
  });

function similarity(a, b) {

    a = a.toLowerCase();
    b = b.toLowerCase();

    let score = 0;

    for (let i = 0; i < Math.min(a.length, b.length); i++) {

        if (a[i] === b[i]) {
            score++;
        }

    }

    return score / Math.max(a.length, b.length);

}

function showSuggestions(text) {

    suggestionList.innerHTML = "";

    if (text === "") return;

    const results = words.filter(word =>
    word.toLowerCase().includes(text.toLowerCase())
);

    results.forEach(word => {

        const li = document.createElement("li");

        li.textContent = word;
        li.addEventListener("click", () => {

    searchBox.value = word;

    suggestionList.innerHTML = "";

});

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
searchBox.addEventListener("keydown", (event) => {

    const items = suggestionList.querySelectorAll("li");

    if (items.length === 0) return;

    let selected = suggestionList.querySelector(".selected");

    let index = Array.from(items).indexOf(selected);

    if (event.key === "ArrowDown") {

        event.preventDefault();

        if (selected) selected.classList.remove("selected");

        index = (index + 1) % items.length;

        items[index].classList.add("selected");

    }

    if (event.key === "ArrowUp") {

        event.preventDefault();

        if (selected) selected.classList.remove("selected");

        index = (index - 1 + items.length) % items.length;

        items[index].classList.add("selected");

    }

    if (event.key === "Enter") {

        if (selected) {

            searchBox.value = selected.textContent;

            suggestionList.innerHTML = "";

        }

    }

});
