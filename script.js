const searchBox = document.getElementById("searchBox");
const suggestionList = document.getElementById("suggestionList");
const micButton = document.getElementById("micButton");
const status = document.getElementById("status");
const reportBox = document.getElementById("reportBox");
const copyButton = document.getElementById("copyButton");
const downloadButton = document.getElementById("downloadButton");

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;
if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.maxAlternatives = 1;

}
const favoriteList = document.getElementById("favoriteList");
const historyList = document.getElementById("historyList");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];

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

const results = words.filter(word => {

    const lower = word.toLowerCase();

    return (
        lower.startsWith(text.toLowerCase()) ||
        similarity(lower, text.toLowerCase()) > 0.6
    );

});


    results.forEach(word => {

        const li = document.createElement("li");

        li.textContent = word;

        li.addEventListener("click", () => {

            if (!favorites.includes(word)) {

                favorites.push(word);

                localStorage.setItem("favorites", JSON.stringify(favorites));

                loadFavorites();

            }

            history.unshift(word);

            history = history.slice(0, 10);

            localStorage.setItem("history", JSON.stringify(history));

            loadHistory();

        });

        li.addEventListener("click", () => {

    searchBox.value = word;

    suggestionList.innerHTML = "";

});

        suggestionList.appendChild(li);

    });

}

function loadFavorites() {

    favoriteList.innerHTML = "";

    favorites.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        favoriteList.appendChild(li);

    });

}

function loadHistory() {

    historyList.innerHTML = "";

    history.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        historyList.appendChild(li);

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


// 6. Voice Result  ← YAHAN ADD KARO
if (recognition) {

    recognition.onresult = function(event){

    let transcript = "";

    for(let i = event.resultIndex; i < event.results.length; i++){

        transcript += event.results[i][0].transcript;

    }

    reportBox.value += transcript + " ";

    searchBox.value = transcript.trim();

    showSuggestions(transcript.trim());

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

loadFavorites();
loadHistory();

