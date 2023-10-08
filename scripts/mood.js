import { getRandomPrompt } from './ghettoapi.js';

let firstMoodButton = document.getElementById("firstMoodButton");
console.log(firstMoodButton)

let regenerateResponseButton = document.getElementById("")

firstMoodButton.addEventListener("click", (e) => {
    //store the mood
    let moodInput = document.querySelector("input");
    let moodValue = getMood(moodInput);
    localStorage.setItem("firstMood", moodValue);
    console.log(moodValue);
    // bring up prompt
    let wrapperElement = document.getElementsByClassName("wrapper")[0]
    wrapperElement.innerHTML = '<h1 id="prompt">'+getRandomPrompt()+'</h1><div class="section"'+'<div class="section"> <input type="text" id="promptAnswer" placeholder="Enter your thoughts"> <button class="submit" id="submitPrompt" onclick="">Submit</button> <button class="submit" id="regeneratePrompt" onclick="">Regenerate Prompt</button> </div>'
});

let getMood = function(moodInput) {
    return moodInput.value / 20 >> 0
}

