const searchBox = document.getElementById("searchBox");

const suggestionList = document.getElementById("suggestionList");

const micButton = document.getElementById("micButton");

const status = document.getElementById("status");

const words = [

"Hepatomegaly",

"Hypoechoic",

"Cholelithiasis",

"Hydronephrosis",

"Liver",

"Kidney",

"Pancreas",

"Gall Bladder"

];

searchBox.addEventListener("input",()=>{

    suggestionList.innerHTML="";

    const text=searchBox.value.toLowerCase();

    words.forEach(word=>{

        if(word.toLowerCase().startsWith(text)){

            const li=document.createElement("li");

            li.textContent=word;

            suggestionList.appendChild(li);

        }

    });

});

micButton.addEventListener("click",()=>{

    status.textContent="🎤 Status : Listening...";

    setTimeout(()=>{

        status.textContent="✅ Status : Ready";

    },2000);

});
