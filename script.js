const searchBox = document.getElementById("searchBox");
const suggestionList = document.getElementById("suggestionList");
const micButton = document.getElementById("micButton");
const status = document.getElementById("status");

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

// Live search
searchBox.addEventListener("input", () => {

  suggestionList.innerHTML = "";

  const text = searchBox.value.toLowerCase().trim();

  if(text === "") return;

  const results = words.filter(word =>
      word.toLowerCase().startsWith(text)
  );

  results.forEach(word => {

      const li = document.createElement("li");

      li.textContent = word;

      suggestionList.appendChild(li);

  });

});

// Fake microphone
micButton.addEventListener("click", () => {

    status.textContent = "🎤 Listening...";

    setTimeout(() => {

        status.textContent = "✅ Ready";

    },2000);

});
