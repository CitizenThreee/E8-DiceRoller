function AddDiceSectionToUi() {
}

function RemoveDiceSectionFromUi() {

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

function GetRandomInt(min, max) { // min and max included
    min = Number(min);
    max = Number(max); 
    return Math.floor(Math.random() * (max - min + 1) + min);
}