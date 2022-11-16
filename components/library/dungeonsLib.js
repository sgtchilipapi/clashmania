export const dungeons = [
    {
        dungeon_index: 0,
        dungeon_name: 'The Strength',
        dungeon_loot: 'BOOM',
        stat_given: 'DEX',
        dungeon_image: '/images/enemies/str/4.png'
    },
    {
        dungeon_index: 1,
        dungeon_name: 'The Vitality',
        dungeon_loot: 'THUMP',
        stat_given: 'STR',
        dungeon_image: '/images/enemies/vit/4.png'
    },
    {
        dungeon_index: 2,
        dungeon_name: 'The Dexterity',
        dungeon_loot: 'CLINK',
        stat_given: 'VIT',
        dungeon_image: '/images/enemies/dex/4.png'
    }
]

export const dungeon_tiers = [
    {
        tier_index: 0,
        tier_name: 'Deadly Underling',
        enemy_level: '5',
        exp_given: '20',
        stat_range: '1',
        loot_range: '1-3'
    },
    {
        tier_index: 1,
        tier_name: 'Savage Minion',
        enemy_level: '15',
        exp_given: '40',
        stat_range: '3',
        loot_range: '2-6'
    },
    {
        tier_index: 2,
        tier_name: 'Rogue Soldier',
        enemy_level: '40',
        exp_given: '60',
        stat_range: '6',
        loot_range: '3-9'
    },
    {
        tier_index: 3,
        tier_name: 'Elite General',
        enemy_level: '65',
        exp_given: '80',
        stat_range: '10',
        loot_range: '4-12'
    },
    {
        tier_index: 4,
        tier_name: 'Dungeon Boss',
        enemy_level: '100',
        exp_given: '100',
        stat_range: '15',
        loot_range: '5-15'
    }
]

export const enemy_type = [
    {
        type_index: 0,
        type_name: 'Vigorous',
        bonus: '+5% to ATK'
    },
    {
        type_index: 1,
        type_name: 'Resistant',
        bonus: '+10% to DEF'
    },
    {
        type_index: 2,
        type_name: 'Elusive',
        bonus: '+10% to EVA'
    },
    {
        type_index: 3,
        type_name: 'Tanky',
        bonus: '+3% to HP'
    },
    {
        type_index: 4,
        type_name: 'Ferocious',
        bonus: '+10% to PEN'
    },
    {
        type_index: 5,
        type_name: 'Sharpshooter',
        bonus: '+10% to CRIT'
    }
]

export function getMonsterImage(dungeon_type, tier) {
    let prefix = '/images/enemies/'
    let dungeon_tag = getDungeonTag(dungeon_type)
    let tier_tag = tier.toString()
    const monster_image = prefix + dungeon_tag + tier_tag + '.png'
    return monster_image
}

function getDungeonTag(dungeon_type){
    if(dungeon_type == 0) return 'str/'
    if(dungeon_type == 1) return 'vit/'
    if(dungeon_type == 2) return 'dex/'
}
