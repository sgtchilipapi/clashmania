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

export const str_dungeon_frames = {
    underling:{
        attack:3,
        hurt:2,
        death:4,
        idle:2,
        width:48,
        facing:'left'
    },
    minion:{
        attack:3,
        hurt:2,
        death:4,
        idle:2,
        width:48,
        facing:'left'
    },
    soldier:{
        attack:3,
        hurt:2,
        death:4,
        idle:2,
        width:48,
        facing:'left'
    },
    general:{
        attack:3,
        hurt:2,
        death:4,
        idle:4,
        width:48,
        facing:'left'
    },
    boss:{
        attack:5,
        hurt:2,
        death:4,
        idle:2,
        width:72,
        facing:'left'
    },
}

export const vit_dungeon_frames = {
    underling:{
        attack:3,
        hurt:2,
        death:4,
        idle:2,
        width:48,
        facing:'left'
    },
    minion:{
        attack:3,
        hurt:2,
        death:4,
        idle:2,
        width:48,
        facing:'left'
    },
    soldier:{
        attack:3,
        hurt:2,
        death:4,
        idle:2,
        width:48,
        facing:'left'
    },
    general:{
        attack:3,
        hurt:2,
        death:4,
        idle:2,
        width:48,
        facing:'left'
    },
    boss:{
        attack:5,
        hurt:2,
        death:4,
        idle:2,
        width:72,
        facing:'left'
    },
}

export const dex_dungeon_frames = {
    underling:{
        attack:5,
        hurt:2,
        death:6,
        idle:2,
        width:48,
        facing:'left'
    },
    minion:{
        attack:3,
        hurt:2,
        death:4,
        idle:2,
        width:48,
        facing:'left'
    },
    soldier:{
        attack:5,
        hurt:2,
        death:6,
        idle:2,
        width:48,
        facing:'left'
    },
    general:{
        attack:3,
        hurt:2,
        death:6,
        idle:2,
        width:48,
        facing:'left'
    },
    boss:{
        attack:5,
        hurt:2,
        death:4,
        idle:2,
        width:72,
        facing:'left'
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

export const getEnemSpriteSource = (dungeon_type, tier, action) => {
    if(dungeon_type == 0) return `/images/sprites/enemies/str/${tier}/${action}.png`
    if(dungeon_type == 1) return `/images/sprites/enemies/vit/${tier}/${action}.png`
    if(dungeon_type == 2) return `/images/sprites/enemies/dex/${tier}/${action}.png`
}

export const getEnemSpriteFrames = (dungeon_type, tier) => {
    if(dungeon_type == 0) return getStrEnemFrames(tier)
    if(dungeon_type == 1) return getVitEnemFrames(tier)
    if(dungeon_type == 2) return getDexEnemFrames(tier)
}

export const getStrEnemFrames = (tier) => {
    if(tier == 0) return str_dungeon_frames.underling
    if(tier == 1) return str_dungeon_frames.minion
    if(tier == 2) return str_dungeon_frames.soldier
    if(tier == 3) return str_dungeon_frames.general
    if(tier == 4) return str_dungeon_frames.boss
}

export const getVitEnemFrames = (tier) => {
    if(tier == 0) return vit_dungeon_frames.underling
    if(tier == 1) return vit_dungeon_frames.minion
    if(tier == 2) return vit_dungeon_frames.soldier
    if(tier == 3) return vit_dungeon_frames.general
    if(tier == 4) return vit_dungeon_frames.boss
}

export const getDexEnemFrames = (tier) => {
    if(tier == 0) return dex_dungeon_frames.underling
    if(tier == 1) return dex_dungeon_frames.minion
    if(tier == 2) return dex_dungeon_frames.soldier
    if(tier == 3) return dex_dungeon_frames.general
    if(tier == 4) return dex_dungeon_frames.boss
}
        