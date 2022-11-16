export const safeMinusUint256 = (subtrahend, subtractor) => {
    return (subtractor > subtrahend) ? 0 : (subtrahend - subtractor)
}

export const safeAddUint256 = (addend1, addend2, max) => {
    return (addend1 + addend2) > max ? max : addend1 + addend2
}
