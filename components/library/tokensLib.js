export function getTokenTickerByName(token_name){
    if(token_name == 'clank')return '$CLANK!'
    if(token_name == 'boom')return '$BOOM!'
    if(token_name == 'thump')return '$THUMP!'
    if(token_name == 'clink')return '$CLINK!'
    if(token_name == 'snap')return '$SNAP!'
    if(token_name == 'yellowspark')return '$ySPARK!'
    if(token_name == 'whitespark')return '$wSPARK!'
    if(token_name == 'redspark')return '$rSPARK!'
    if(token_name == 'bluespark')return '$bSPARK!'
    if(token_name == 'enerlink')return '$eLINK!'
    if(token_name == 'clankftm')return '$CLANK-FTM!'
    if(token_name == 'clankboom')return '$CLANK-BOOM!'
    if(token_name == 'clankthump')return '$CLANK-THUMP!'
    if(token_name == 'clankclink')return '$CLANK-CLINK!'
    if(token_name == 'clanksnap')return '$CLANK-SNAP!'
}

export function getTokenImageByName(token_name){
    if(token_name == 'clank')return '/images/tokens/clank.png'
    if(token_name == 'boom')return '/images/tokens/boom.png'
    if(token_name == 'thump')return '/images/tokens/thump.png'
    if(token_name == 'clink')return '/images/tokens/clink.png'
    if(token_name == 'snap')return '/images/tokens/snap.png'
    if(token_name == 'yellowspark')return '/images/tokens/yellowspark.png'
    if(token_name == 'whitespark')return '/images/tokens/whitespark.png'
    if(token_name == 'redspark')return '/images/tokens/redspark.png'
    if(token_name == 'bluespark')return '/images/tokens/bluespark.png'
    if(token_name == 'enerlink')return '/images/tokens/elink.png'
    if(token_name == 'clankftm')return '/images/tokens/clankftm.png'
    if(token_name == 'clankboom')return '/images/tokens/clankboom.png'
    if(token_name == 'clankthump')return '/images/tokens/clankthump.png'
    if(token_name == 'clankclink')return '/images/tokens/clankclink.png'
    if(token_name == 'clanksnap')return '/images/tokens/clanksnap.png'
}

export function getSpookyAddress(token_name){
    if(token_name == 'yellowspark')return 'https://spooky.fi/#/add/0xA13473ffb118655cdF6F15684Ee6CCE4E4aeaf26/0x5751141f10e9cCC97f7f542253F67AC6C67ef308'
    if(token_name == 'whitespark')return 'https://spooky.fi/#/add/0xA13473ffb118655cdF6F15684Ee6CCE4E4aeaf26/0x7F11f903EE76aaF287091509E7b38A877a5500CF'
    if(token_name == 'redspark')return 'https://spooky.fi/#/add/0xA13473ffb118655cdF6F15684Ee6CCE4E4aeaf26/0x968F94214F1b5F4C775e7F7a04ca2FAE6E545E75'
    if(token_name == 'bluespark')return 'https://spooky.fi/#/add/0xA13473ffb118655cdF6F15684Ee6CCE4E4aeaf26/0x31010F5C1444Ba33eD38E4A40e57742829c04BA3'
    if(token_name == 'clankftm')return 'https://spooky.fi/#/add/0xA13473ffb118655cdF6F15684Ee6CCE4E4aeaf26/FTM'
}

export function getUnderlyingLP(token_name){
    if(token_name == 'yellowspark')return 'clankboom'
    if(token_name == 'whitespark')return 'clankthump'
    if(token_name == 'redspark')return 'clankclink'
    if(token_name == 'bluespark')return 'clanksnap'
}