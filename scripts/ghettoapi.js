export { storeResonse, getMoodsForMonth, getResponseForDay, getRandomPrompt, getTrendForWeek }

const prompts = [["What was the best part of your day?"],
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
        firstMood : firstMood,
        prompt : prompt,
        promptAnswer : promptAnswer,
        endMood : endMood
    }
    localStorage.setItem(Date(), JSON.stringify(toPut))
}

// getMoodsForMonth(year, month) -> List of Tuples of Ints
let getMoodsForMonth = function(year, month) {
    // Get all keys in localstorage
    allKeys = Object.keys(localStorage)
    let moods = [];

    for (const key of allKeys) {
        let dateKey = new Date(key);
        if(dateKey.getMonth() + 1 == month && dateKey.getFullYear() == year) {
            let response = JSON.parse(localStorage.getItem(key))
            moods.push([response.firstMood, response.endMood]);
        }
    }
    return moods;
}


// getResponseForDay(day, month, year) -> tuple
let getResponseForDay = function(day, month, year) {
    allKeys = Object.keys(localStorage)
    let response =  {};
    let date = new Date(null);
    
    for (const key of object) {
        date.setDate(key)
        if(date.getDate() == day && date.getMonth() == month - 1 && date.getFullYear() == year) {
            response = JSON.parse(localStorage.getItem(key));
            break;
        }
    }

    return response;

}

// getTrendForWeek() -> Tuple of Lists of string
// (["rain", "dog died", "failed test"],["got a girlfriend", "hit a pr", "nummy daka food"])
let getTrendForWeek = function(startDate) {
    // Group the week's responses into positive and negative
    let currDate = new Date(startDate)
    let positive = []
    let negative = []
    for(let i = 0; i < 7; i++) {
        let currResponse = getResponseForDay(currDate.getDate(), currDate.getMonth(), currDate.getFullYear());
        if (currResponse.endMood > 2) {
            positive.push(currResponse.response);
        } else {
            negative.push(currResponse.response);
        }
        currDate.setDate(currDate.getDate() + 1)
    }

    let positiveTopics;
    let negativeTopics;
    // Call the NLP API to categorize responses
    let formdata = new FormData();
    formdata.append("api_token", "fcA76GoUHh9iQxLJMAEfPtZGvLTcKbOy5zCRaEiw");
    formdata.append("text", positive.join(" "));

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("https://api.nlp-api.com/v1/topics", requestOptions)
    .then(response => response.text())
    .then(result => positiveTopics = result)
    .catch(error => console.log('error', error));

    formdata.set("text", negative.join(" "));
    requestOptions.body = formdata;


    fetch("https://api.nlp-api.com/v1/topics", requestOptions)
    .then(response => response.text())
    .then(result => negativeTopics = result)
    .catch(error => console.log('error', error));

    return [negativeTopics, positiveTopics]
}

// getRandomPrompt
let getRandomPrompt = function() {
    let prompt = getRandomInt(prompts.length);
    return prompts[prompt][0]
}

let getRandomInt = function(max) {
    return Math.floor(Math.random() * max)
}