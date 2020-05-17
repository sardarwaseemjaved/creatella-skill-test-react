export const convertPrice = (cents) => {
    let dollars = (cents / 100);
    return '$' + dollars.toFixed(2)
}