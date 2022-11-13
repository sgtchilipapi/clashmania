export function equipmentImages(index) {
    if(index == 0)return "/images/characters/0 Viking/Angry.png"
    if(index == 1)return "/images/characters/1 Woodcutter/Angry.png"
    if(index == 2)return "/images/characters/2 Troll/Angry.png"
    if(index == 3)return "/images/characters/3 Mechanic/Angry.png"
}

export function equipmentNames(index) {
    if(index == 0)return "a Weapon"
    if(index == 1)return "an Armor"
    if(index == 2)return "a Headgear"
    if(index == 3)return "an Accessory"

}

export function equipmetDescription(index) {
    if(index == 0)return `A weapon provides substantial attack power +ATK`
    if(index == 1)return `An armor provides major defense +DEF`
    if(index == 2)return `A headgear provides minor defense +DEF`
    if(index == 3)return "An accessory provides evasion +EVA"
}

export function equipmentName(index) {
    if(index == 0)return `weapon`
    if(index == 1)return `armor`
    if(index == 2)return `headgear`
    if(index == 3)return "accessory"
}