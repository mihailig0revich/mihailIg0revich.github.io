export const chunkArray = (arr, chunk = 3) => {
    let newArray = []
    for (let i = 0; i < arr.length; i += chunk) {
        newArray.push(arr.slice(i, i + chunk))
    }
    return newArray;
} 