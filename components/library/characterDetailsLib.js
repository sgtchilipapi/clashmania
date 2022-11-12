export function characterClasses(index) {
    if(index == 0)return "Viking"
    if(index == 1)return "Woodcutter"
    if(index == 2)return "Troll"
    if(index == 3)return "Mechanic"
    if(index == 4)return "Amphibian"
    if(index == 5)return "Graverobber"
}

export function characterBonus(index){
    if(index == 0)return "Bonus: 5% to ATK"
    if(index == 1)return "Bonus: 10% to PEN"
    if(index == 2)return "Bonus: 5% to HP"
    if(index == 3)return "Bonus: 10% to DEF"
    if(index == 4)return "Bonus: 10% to CRIT"
    if(index == 5)return "Bonus: 10% to EVA"
}


export function getMood(index){
    if(index == 0){return "Amazed"}
    if(index == 1){return "Angry"}
    if(index == 2){return "Calm"}
    if(index == 3){return "Irritated"}
    if(index == 4){return "Mocking"}
    if(index == 5){return "Sad"}
    if(index == 6){return "Scared"}
    if(index == 7){return "Stunned"}
    if(index == 8){return "Thoughtful"}
    if(index == 9){return "Upset"}
}

export function getCharacterImage(character_class, mood){
    return (`/images/characters/${character_class} ${characterClasses(character_class)}/${getMood(mood)}.png`)
}