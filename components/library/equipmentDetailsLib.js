export const equipmentNameAndImage = (equipment_type, rarity, dominant_stat, extremity) => {
    let eqpt_name, image_url
    const [rarity_tag, rarity_image] = getRarityTag(rarity)
    const [type_tag, type_image] = getEquipmentType(equipment_type, dominant_stat)
    const extremity_tag = getExtremityTag(extremity)
    const [dominant_tag, dominant_stat_image] = getDominantStatTag(dominant_stat)

    image_url = '/images/equipments/' + type_image + dominant_stat_image + rarity_image
    eqpt_name = rarity_tag + type_tag + 'of ' + extremity_tag + dominant_tag
    if(type_image == undefined){
        image_url = '/images/equipments/WEAPONS/ATK/COMM.png'
        eqpt_name = 'Equipment'
    }
    return [eqpt_name, image_url]
}

export function getGeneralType(equipment_type) {
    let type_tag
    if(equipment_type == 0){type_tag = "WPN"}
    if(equipment_type == 1){type_tag = "AMR "}
    if(equipment_type == 2){type_tag = "HGR "}
    if(equipment_type == 3){type_tag = "ACC"}
    return type_tag
}

export function getEquipmentType(equipment_type, dominant_stat) {
    let type_tag, type_image
    if(equipment_type == 0){type_tag = getWeapon(dominant_stat); type_image = "WEAPONS/";}
    if(equipment_type == 1){type_tag = "Armor "; type_image = "ARMORS/";}
    if(equipment_type == 2){type_tag = "Helm "; type_image = "HELMS/";}
    if(equipment_type == 3){type_tag = getAccessory(dominant_stat); type_image = "ACCESSORIES/";}
    return [type_tag, type_image]
}

export function getRarityTag(rarity){
    let rarity_tag, rarity_image
    if(rarity == 0){rarity_tag = "Common "; rarity_image = "COMM.png";}
    if(rarity == 1){rarity_tag = "Uncommon "; rarity_image = "UNCO.png";}
    if(rarity == 2){rarity_tag = "Scarce "; rarity_image = "SCAR.png";}
    if(rarity == 3){rarity_tag = "Rare "; rarity_image = "RARE.png";}
    if(rarity == 4){rarity_tag = "Unique "; rarity_image = "UNIQ.png";}
    return [rarity_tag, rarity_image]
}

export function getExtremityTag(extremity){
    let extremity_tag
    if(extremity == 0){extremity_tag = "Minor ";}
    if(extremity == 1){extremity_tag = "Good ";}
    if(extremity == 2){extremity_tag = "Great ";}
    if(extremity == 3){extremity_tag = "Intense ";}
    if(extremity == 4){extremity_tag = "Extraordinary ";}
    if(extremity == 5){extremity_tag = "Ethereal ";}
    if(extremity == 6){extremity_tag = "Astronomical ";}
    if(extremity == 7){extremity_tag = "Divine ";}
    return extremity_tag
}

export function getDominantStatTag(dominant_stat){
    let dominant_tag, dominant_stat_image
    if(dominant_stat == 0){dominant_tag = "Vigor"; dominant_stat_image = "ATK/";}
    if(dominant_stat == 1){dominant_tag = "Resistance"; dominant_stat_image = "DEF/";}
    if(dominant_stat == 2){dominant_tag = "Elusiveness"; dominant_stat_image = "EVA/";}
    if(dominant_stat == 3){dominant_tag = "Health"; dominant_stat_image = "HP/";}
    if(dominant_stat == 4){dominant_tag = "Ferocity"; dominant_stat_image = "PEN/";}
    if(dominant_stat == 5){dominant_tag = "Precision"; dominant_stat_image = "CRIT/";}
    if(dominant_stat == 6){dominant_tag = "Sight"; dominant_stat_image = "LUK/";}
    if(dominant_stat == 7){dominant_tag = "Restoration"; dominant_stat_image = "REG/";}
    return [dominant_tag, dominant_stat_image]
}

export function getWeapon(dominant_stat){
    let weapon
    if(dominant_stat == 0){weapon = "Hammer ";}
    if(dominant_stat == 1){weapon = "Shield ";}
    if(dominant_stat == 2){weapon = "Dagger ";}
    if(dominant_stat == 3){weapon = "Club ";}
    if(dominant_stat == 4){weapon = "Axe ";}
    if(dominant_stat == 5){weapon = "Bombard ";}
    if(dominant_stat == 6){weapon = "Sling ";}
    if(dominant_stat == 7){weapon = "Staff ";}
    return weapon
}

export function getAccessory(dominant_stat){
    let accessory
    if(dominant_stat % 2 == 0){accessory = "Ring ";}
    if(dominant_stat % 2 == 1){accessory = "Amulet ";}
    return accessory
}