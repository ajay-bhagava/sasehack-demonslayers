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
    document.getElementById("prompt").innerText = getRandomPrompt();

    
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

