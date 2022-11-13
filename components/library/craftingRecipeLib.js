const tokens = require('../../random-clash-contracts/app-config/deployments')

export function getRecipe(item_type){
    const [main_m, main_a, main_tag, main_name] = getMainMaterial(item_type);
    const [indirect_m, indirect_a, indirect_tag, indirect_name] = getIndirectMaterial(item_type);
    const [catalyst_m, catalyst_a, catalyst_tag, catalyst_name] = getCatalyst(item_type);

    const recipe = {
        main_material: main_m,
        indirect_material: indirect_m,
        catalyst: catalyst_m,
        main_material_amount: main_a,
        indirect_material_amount: indirect_a,
        catalyst_amount: catalyst_a,
        main_tag: main_tag,
        indirect_tag: indirect_tag,
        catalyst_tag: catalyst_tag,
        main_name: main_name,
        indirect_name: indirect_name,
        catalyst_name: catalyst_name
    };

    return recipe
}

export function getMainMaterial(item_type){
    let material, amount, tag, token_name
    if (item_type == 0) { material = 0; amount = 12; tag = 'BOOM!'; token_name = 'boom'} //WEAPONS: BOOMSTEEL
    if (item_type == 1) { material = 1; amount = 9; tag = 'THUMP!'; token_name = 'thump'} //ARMORS: THUMPIRON
    if (item_type == 2) { material = 1; amount = 3; tag = 'THUMP!'; token_name = 'thump'} //HELMS: THUMPIRON
    if (item_type == 3) { material = 2; amount = 12; tag = 'CLINK!'; token_name = 'clink'} //ACCESSORIES: CLINKGLASS
    if (item_type == 4) { material = 3; amount = 1; tag = 'SNAP!'; token_name = 'snap'} //CONSUMABLES: SNAPLINK
    return [material, amount, tag, token_name]
}

export function getIndirectMaterial(item_type){
    let material, amount, tag, token_name
    if (item_type == 0) { material = 1; amount = 4; tag = 'THUMP!'; token_name = 'thump'} //WEAPONS: THUMPIRON
    if (item_type == 1) { material = 0; amount = 3; tag = 'BOOM!'; token_name = 'boom'} //ARMORS: BOOMSTEEL
    if (item_type == 2) { material = 0; amount = 1; tag = 'BOOM!'; token_name = 'boom'} //HELMS: BOOMSTEEL
    if (item_type == 3) { material = 0; amount = 4; tag = 'BOOM!'; token_name = 'boom'} //ACCESSORIES: BOOMSTEEL
    if (item_type == 4) { material = 2; amount = 1; tag = 'CLINK!'; token_name = 'clink'} //CONSUMABLES: CLINKGLASS
    return [material, amount, tag, token_name]
}

export function getCatalyst(item_type){
    let catalyst, amount, tag, token_name
    if (item_type == 0) { catalyst = 0; amount = 1; tag = 'ySPARK'; token_name = 'yellowspark'} //WEAPONS: YELLOW SPARKSTONE
    if (item_type == 1) { catalyst = 1; amount = 1; tag = 'wSPARK'; token_name = 'whitespark'} //ARMORS: WHITE SPARKSTONE
    if (item_type == 2) { catalyst = 1; amount = 1; tag = 'wSPARK'; token_name = 'whitespark'} //HELMS: WHITE SPARKSTONE
    if (item_type == 3) { catalyst = 2; amount = 1; tag = 'rSPARK'; token_name = 'redspark'} //ACCESSORIES: RED SPARKSTONE
    if (item_type == 4) { catalyst = 3; amount = .25; tag = 'bSPARK'; token_name = 'bluespark'} //CONSUMABLES: BLUE SPARKSTONE (1/4 bSPARK)
    return [catalyst, amount, tag, token_name]
}

export function getMaterialName(material_index){
    if(material_index == 0) return 'boom'
    if(material_index == 1) return 'thump'
    if(material_index == 2) return 'clink'
    if(material_index == 3) return 'snap'
}

export function getCatalystName(catalyst_index){
    if(catalyst_index == 0) return 'yellowspark'
    if(catalyst_index == 1) return 'whitespark'
    if(catalyst_index == 2) return 'redspark'
    if(catalyst_index == 3) return 'bluespark'
}
