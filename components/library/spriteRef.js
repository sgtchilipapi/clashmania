export const char_frames = {
    viking:{
        attack:5,
        hurt:2,
        death:6,
        idle:4,
        width: 72,
        facing:'left'
    },
    woodcutter:{
        attack:5,
        hurt:2,
        death:6,
        idle:4,
        width: 48,
        facing:'right'
    },
    mechanic:{
        attack:5,
        hurt:2,
        death:6,
        idle:4,
        width: 48,
        facing:'right'
    },
    troll:{
        attack:3,
        hurt:2,
        death:6,
        idle:4,
        width: 72,
        facing:'left'
    },
    amphibian:{
        attack:5,
        hurt:2,
        death:6,
        idle:4,
        width: 72,
        facing:'left'
    },
    graverobber:{
        attack:5,
        hurt:2,
        death:6,
        idle:4,
        width: 48,
        facing:'right'
    },
}

export const getCharSpriteSource = (character_class, action) => {
    if(character_class == 0) return `/images/sprites/characters/viking/${action}.png`
    if(character_class == 1) return `/images/sprites/characters/woodcutter/${action}.png`
    if(character_class == 2) return `/images/sprites/characters/troll/${action}.png`
    if(character_class == 3) return `/images/sprites/characters/mechanic/${action}.png`
    if(character_class == 4) return `/images/sprites/characters/amphibian/${action}.png`
    if(character_class == 5) return `/images/sprites/characters/graverobber/${action}.png`
}

export const getCharSpriteFrames = (character_class) => {
    if(character_class == 0) return char_frames.viking
    if(character_class == 1) return char_frames.woodcutter
    if(character_class == 2) return char_frames.troll
    if(character_class == 3) return char_frames.mechanic
    if(character_class == 4) return char_frames.amphibian
    if(character_class == 5) return char_frames.graverobber
}

export const getEnemSpriteSource = (dungeon_type, tier) => {
    
}
        