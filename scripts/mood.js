let firstMoodButton = document.getElementById("firstMoodButton");
console.log(firstMoodButton)

firstMoodButton.addEventListener("click", (e) => {
    //store the mood
    let moodInput = document.querySelector("input");
    let moodValue = getMood(moodInput);
    localStorage.setItem("firstMood", moodValue);
    console.log(moodValue);
    // bring up prompt
    let wrapperElement = document.getElementsByClassName("wrapper")[0]
    wrapperElement.innerHTML = '<p>This is placeholder text</p>'
});

let getMood = function(moodInput) {
    return Math.ceil(moodInput.value / 20)
}