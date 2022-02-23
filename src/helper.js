export function randomProp(props) {
    var selected = Math.floor(Math.random() * props.length);
    return selected;
}

export function StandardArray(stats, callBack = randomProp) {
    // Callbacks in case we want to sort it with specific methods later on.
    var selected = callBack(stats);
    var stat = stats[selected]
    stats.splice(selected, 1);
    return stat
}

export function Copy(copy){
    var result = Object.create(copy);
    return result;
}


export default randomProp;