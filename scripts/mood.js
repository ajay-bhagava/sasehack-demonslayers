import { getRandomPrompt } from './ghettoapi.js';

let update = function () {
    const body = document.querySelector("body");
    const emoji = document.querySelector(".slide-emoji");
    const input = document.querySelector("input");
    const bar = document.querySelector(".progress-bar");
    const thumb = document.querySelector(".thumb");
    input.oninput = () => {
        let sliderValue = input.value;
        thumb.style.left = sliderValue + '%';
        bar.style.width = sliderValue + '%';
        if (sliderValue < 20) {
            emoji.style.marginTop = "0px";
            body.classList.add("angry");
            body.classList.remove("confuse");
            body.classList.remove("like");
        }
        if (sliderValue >= 20) {
            emoji.style.marginTop = "-140px";
            body.classList.add("confuse");
            body.classList.remove("angry");
            body.classList.remove("like");
        }
        if (sliderValue >= 40) {
            emoji.style.marginTop = "-280px";
        }
        if (sliderValue >= 60) {
            emoji.style.marginTop = "-420px";
            body.classList.add("like");
            body.classList.remove("confuse");
            body.classList.remove("angry");
        }
        if (sliderValue >= 80) {
            emoji.style.marginTop = "-560px";
        }
    }
}

let firstMoodButton = document.getElementById("firstMoodButton");
let oldInnerText

firstMoodButton.addEventListener("click", async (e) => {
    //store the mood
    let moodInput = document.querySelector("input");
    let moodValue = getMood(moodInput);
    localStorage.setItem("firstMood", moodValue);
    // bring up prompt
    let wrapperElement = document.getElementsByClassName("wrapper")[0]
    oldInnerText = wrapperElement.innerHTML;
    console.log(oldInnerText)
    let newInnerText;
    await fetch("../pages/answerPrompt.html").then(response => response.text()).then(result => {
        newInnerText = result;
    });

    wrapperElement.innerHTML = newInnerText;
    let promptHeader = document.getElementById("prompt")
    promptHeader.innerText = getRandomPrompt();
    document.getElementById("submitPrompt").addEventListener("click", getPromptResponse)
    let responsebutton = document.getElementById("regeneratePrompt")
    responsebutton.addEventListener("click", regeneratePrompt)
});

let getMood = function (moodInput) {
    return moodInput.value / 20 >> 0 // bitshift rounds to integer
}

let getPromptResponse = function (e) {
    let prompt = document.getElementById("prompt").innerText
    let response = document.getElementById("response").value
    localStorage.setItem("prompt", prompt);
    localStorage.setItem("response", response);
    let wrapper = document.getElementById("wrapperID");
    wrapper.innerHTML = oldInnerText;
    document.getElementById("question").innerText = "How do you feel after reflecting on your day?"
    update();
    let submitButton = document.getElementById("firstMoodButton");
    submitButton.addEventListener("click", showresults);
}

let regeneratePrompt = function (e) {
    let promptHeader = document.getElementById("prompt")
    promptHeader.innerText = getRandomPrompt();
}

let showresults = async function (e) {
    let moodInput = document.querySelector("input");
    let moodValue = getMood(moodInput);
    localStorage.setItem("secondMood", moodValue);
    let results;
    let increase = localStorage.getItem("secondMood") - localStorage.getItem("firstMood");
    await fetch("../pages/aiResults.html").then(response => response.text()).then(result => results = result);
    document.getElementById("wrapperID").innerHTML = results;
    document.getElementById("increase").innerText = increase;
}

update();