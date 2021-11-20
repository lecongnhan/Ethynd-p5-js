function padZero(num, returnLength, isBefore) {
    let str = num.toString();
    while (str.length < returnLength) {
        str = isBefore ? "0" + str : str + "0";
    }
    return str;
}