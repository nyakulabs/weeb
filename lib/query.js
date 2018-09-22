module.exports = (arr) => {
    let i = 0, s = '';
    for (i = 0; i < arr.length; i++) {
        if (arr[i].value) {
            if (i == 0) {
                s += `?${encodeURIComponent(arr[i].name)}=${encodeURIComponent(arr[i].value)}`
            } else {
                s += `&${encodeURIComponent(arr[i].name)}=${encodeURIComponent(arr[i].value)}`
            }
        }
    }
    return s;
}
