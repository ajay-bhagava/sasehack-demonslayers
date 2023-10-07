export { storeResonse, getMoodsForMonth, getResponsesForDay }


/**
 * 
 * @param {The mood that the user records at first} firstMood 
 * @param {The prompt that the user answered} prompt 
 * @param {The user's answer to the prompt} promptAnswer 
 * @param {The mood that the user records at the end} endMood 
 */
let storeResonse = function(firstMood, prompt, promptAnswer, endMood) {
    let toPut = {
        "firstMood" : firstMood,
        "prompt" : prompt,
        "promptAnswer" : promptAnswer,
        "endMood" : endMood
    }
    localStorage.setItem(Date(), JSON.stringify(toPut))
}

// getMoodsForMonth(year, month) -> List of Tuples of Ints
let getMoodsForMonth = function(year, month) {
    // Get all keys in localstorage
    allKeys = Object.keys(localStorage)
    let moods = [];

    for (const key in allKeys) {
        let dateKey = new Date(key);
        let keyMonth = dateKey.getMonth();
        if(dateKey.getMonth() + 1 == month && dateKey.getFullYear() == year) {
            let response = JSON.parse(localStorage.getItem(key))
            moods.push([response.firstMood, response.endMood]);
        }
    }
    return moods;
}


// getResponsesForDay(day, month, year) -> tuple
let getResponsesForDay = function(day, month, year) {
    allKeys = Object.keys(localStorage)
    let response =  {};
    
    for (const key in object) {
        let date = new Date(key);
        if(date.getDate() == day && date.getMonth() == month - 1 && date.getFullYear() == year) {
            response = JSON.parse(localStorage.getItem(key));
            break;
        }
    }

    return response;

}

// getTrendForWeek() -> Tuple of Lists of string
// (["rain", "dog died", "failed test"],["got a girlfriend", "hit a pr", "nummy daka food"])

// getRandomPrompt