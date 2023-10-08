import { getRandomPrompt } from './ghettoapi.js';

let firstMoodButton = document.getElementById("firstMoodButton");
console.log(firstMoodButton)

let regenerateResponseButton = document.getElementById("")

firstMoodButton.addEventListener("click", async (e) => {
    //store the mood
    let moodInput = document.querySelector("input");
    let moodValue = getMood(moodInput);
    localStorage.setItem("firstMood", moodValue);
    // bring up prompt
    let wrapperElement = document.getElementsByClassName("wrapper")[0]
    let newInnerText;
    await fetch("../pages/answerPrompt.html").then(response => response.text()).then(result => {
        console.log(result);
        newInnerText = result;
        console.log(newInnerText)    
    });

    wrapperElement.innerHTML = newInnerText;
    let promptHeader = document.getElementById("prompt")
    promptHeader.innerText = getRandomPrompt();
    document.getElementById("submitPrompt").addEventListener("click", submitPrompt)
    let responsebutton = document.getElementById("regeneratePrompt")
    responsebutton.addEventListener("click", regeneratePrompt)
    console.log("bruh")
});

let getMood = function(moodInput) {
    return moodInput.value / 20 >> 0
}

let getPromptResponse = function() {
    let prompt = document.getElementById("prompt").innerText
    let response = document.getElementById("response").value
    localStorage.setItem("prompt", prompt);
    localStorage.setItem("response", response);
}

let regeneratePrompt = function(e) {
    let promptHeader = document.getElementById("prompt")
    promptHeader.innerText = getRandomPrompt();
}

