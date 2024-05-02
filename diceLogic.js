
//creates a new dice input element after the last child of the parent dice input div element
function AddDiceSectionToUi() {
    diceInputCount = document.getElementById("allDice").childElementCount;

    let diceTypeString = diceInputCount == 0 ? "diceType" : "diceType" + diceInputCount;
    let diceCountString = diceInputCount == 0 ? "diceCount" : "diceCount" + diceInputCount;

    document.getElementById("allDice").insertAdjacentHTML("beforeend", 
    `<div id='diceContainer'>
        <label for='${diceTypeString}'>Dice Type:</label>
        <select name='${diceTypeString}' id='${diceTypeString}'>
            <option value='4'>D4</option>
            <option value='6' selected>D6</option>
            <option value='8'>D8</option>
            <option value='10'>D10</option>
            <option value='12'>D12</option>
            <option value='20'>D20</option>
        </select>
        <label for='${diceCountString}'>Dice Count:</label>
        <input type='number' value='0' id='${diceCountString}' name='${diceCountString}'>
    </div>`,);
}

//Removes the last element child from the dice input div element
function RemoveDiceSectionFromUi() {
    document.getElementById("allDice").lastElementChild.remove();
}

//Adds a dice element for every entry in diceTypes, and assigns the diceTypes display, and diceCount display with their respective values
function AddDiceElements(diceTypes, diceCounts){
    let diceHTMLString = "<tr>";

    for(let i = 1; i < diceTypes.length + 1; i++){
        if(i % 6 == 1 && i != 1){diceHTMLString += "<tr>"}

        diceHTMLString += 
        `<td>
            <p class="diceHeader">${diceTypes[i - 1]}</p>
            <button class="diceButton">${diceCounts[i - 1]}</button>
        </td>`

        if(i != 0 && i % 6 == 0 || i == diceTypes.length){diceHTMLString += "</tr>"}
    }

    diceHTMLString += "</tr>"

    document.getElementById("diceDisplay").innerHTML = diceHTMLString;

    console.log(diceHTMLString);
}

//if(6 % 6 == 0){console.log("correct")};
//if(7 % 6 == 1){console.log("correct")};


/* this is the function called when the roll button gets pressed. It finds all the dice inputs and splits them all into two arrays, diceTypes, and dyceCounts. It pases these
two arrays to the Roll() function and the returned object is stored in a variable which is used to create the dice elements, and update the total dice count text */
function HandleRoll() {
    diceInputCount = document.getElementById("allDice").childElementCount;
    if(diceInputCount <= 0) {return};
    const diceTypes = [];
    const diceCounts = [];

    for(let i = 0; i < diceInputCount; i++){
        let diceTypeString = i == 0 ? "diceType" : "diceType" + i;
        let diceCountString = i == 0 ? "diceCount" : "diceCount" + i;
        diceTypes.push(document.getElementById(diceTypeString).selectedOptions[0].value);
        diceCounts.push(document.getElementById(diceCountString).value);
    }

    const diceRolls = Roll(diceTypes, diceCounts);
    UpdateTotalText(diceRolls.total);

    AddDiceElements(diceRolls.diceTypes, diceRolls.diceCounts);
}

//updates the total dice count text with the passed value
function UpdateTotalText(total) {
    document.getElementById("totalCount").innerHTML = total;
}

/* takes two arrays of numbers, one with dice types and one with how many of those types of dice, 
nd iterates over the count of types, and returns an object with two arrays and one int: diceTypes : [], diceCounts : [], total : 0 */
/*function Roll(diceTypes, diceCounts){
}

for(i = 0; i < 50; i++){
    result = Roll([4],[1]);
    if(result.total > 4 || result.total < 1){console.log("error: " + result)}
}
for(i = 0; i < 50; i++){
    result = Roll([20],[1]);
    if(result.total > 20 || result.total < 1){console.log("error: " + result)}
}
for(i = 0; i < 50; i++){
    result = Roll([10],[10]);
    if(result.total > 100 || result.total < 1){console.log("error: " + result)}
}
for(i = 0; i < 50; i++){
    result = Roll([4, 6],[2, 2]);
    if(result.diceTypes.length < 4 || result.diceCounts.length < 4){console.log("error: " + result)}
}
if(Roll([6],[1]).diceTypes[0] != "D6") {console.log("error")}

console.log(Roll([6,10,20,4],[1,4,1,8])) */

function Roll(diceTypes, diceCounts){
    const diceResultTypes = [];
    const diceResults = [];
    let diceTotal = 0;
    for(let i = 0; i < diceTypes.length; i++){
        for(let x = 0; x < diceCounts[i]; x++){
            let newRoll = GetRandomInt(1, diceTypes[i])
            diceTotal += newRoll;
            diceResultTypes.push("D" + diceTypes[i]);
            diceResults.push(newRoll)
        }
    }

    return {
        "diceTypes" : diceResultTypes,
        "diceCounts" : diceResults,
        "total" : diceTotal
    }
}

//Check correctness of the randomness function ( within 0.1 of the expected median(3.5) every time)
/* let sumOfRandom = 0;
for(let i = 0; i < 1000; i++){
    sumOfRandom += GetRandomInt(1, 6);
}
console.log(sumOfRandom / 1000); */

function GetRandomInt(min, max) { // min and max included
    min = Number(min);
    max = Number(max); 
    return Math.floor(Math.random() * (max - min + 1) + min);
}