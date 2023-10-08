export { storeResonse, getMoodsForMonth, getResponsesForDay }

var prompts = [["What was the best part of your day?"],
["Did anything surprise you today?"],
["Did you read or listen to anything interesting today?"],
["Did you take any photos today?"],
["What did you do that was just for you today?"],
["What did you do to take care of yourself today?"],
["When did you feel appreciated today?"],
["If you could guarantee one thing for tomorrow what would it be?"],
["What was the most interesting thing you did today?  "],
["Tell me three good things about today."],
["Did you receive any good news today?  "],
["What did you do today that you're most proud of?  "],
["What inspired you the most today?"],
["What is something you did today that you'd love to do every day?"],
["What was the worst part of your day?"],
["What do you wish you did more of today?"],
["What do you wish you did less of today?"],
["What are you most grateful for about your day?"],
["Will you remember any specific part of your day a year from now? Five years? How come?"],
["If you could do any part of today over again, what would it be and why?"],
["Did you learn anything new today?"],
["What did you spend most of your time doing/thinking about today?"]]

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
let getRandomPrompt = function() {
    fetch("../prompts.txt")
}