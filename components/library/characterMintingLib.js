export function characterImages(index) {
    if(index == 0)return "/images/characters/0 Viking/Angry.png"
    if(index == 1)return "/images/characters/1 Woodcutter/Angry.png"
    if(index == 2)return "/images/characters/2 Troll/Angry.png"
    if(index == 3)return "/images/characters/3 Mechanic/Angry.png"
    if(index == 4)return "/images/characters/4 Amphibian/Angry.png"
    if(index == 5)return "/images/characters/5 Graverobber/Angry.png"
}

export function characterNames(index) {
    if(index == 0)return "Viking"
    if(index == 1)return "Woodcutter"
    if(index == 2)return "Troll"
    if(index == 3)return "Mechanic"
    if(index == 4)return "Amphibian"
    if(index == 5)return "Graverobber"
}

export function characterDesc(index) {
    if(index == 0)return `"These skull cups are awful! My coffee keeps spilling from the eye holes!"`
    if(index == 1)return `"Well, back to it! These trees aint gonna chop themselves hu ha!"`
    if(index == 2)return `"I dont live in a swamp! Im not an ogre dammit!"`
    if(index == 3)return "Not everyone who can fix cars are mechanics. Yes I can fix your car but not because Im a mechanic!"
    if(index == 4)return "No, Im not a ninja turtle."
    if(index == 5)return "They wont even know what hit them coffins."
}

export function characterBonus(index){
    if(index == 0)return "Bonus: 5% to ATK"
    if(index == 1)return "Bonus: 10% to PEN"
    if(index == 2)return "Bonus: 5% to HP"
    if(index == 3)return "Bonus: 10% to DEF"
    if(index == 4)return "Bonus: 10% to CRIT"
    if(index == 5)return "Bonus: 10% to EVA"
}