function fibIter(n) {
    let arr = [];
    for(let i=0; i<n; ++i) {
        if(arr.length > 1) arr.push(arr[i-1] + arr[i-2]);
        else if(arr.length === 0) arr.push(0);
        else arr.push(1);
    }
    return arr;
}

function fibRec(n) {
    if(n < 1) return [];
    else if(n === 1) return [0];
    else if(n === 2) return [0, 1];
    let last = fibRec(n-1);
    return last.concat([last[last.length-1] + last[last.length-2]]);
}

console.log(fibIter(8));
console.log(fibRec(8));

let arr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3];

console.log(mergeSort(arr));

function mergeSort(arr) {
    if(arr.length === 1) return arr;
    const mid = Math.floor(arr.length/2);
    const a = mergeSort(arr.slice(0, mid));
    const b = mergeSort(arr.slice(mid, arr.length));
    const c = [];
    for(let i=0, j=0; i<a.length || j<b.length;) {
        if(j >= b.length) {
            while(i < a.length) {
                c.push(a[i]);
                i++;
            }
        }
        else if(i >= a.length) {
            while(j < b.length) {
                c.push(b[j]);
                j++;
            }
        }
        else if(a[i] < b[j]) {
            while(i < a.length && a[i] < b[j]) {
                c.push(a[i]);
                i++;
            }
        }
        else if(b[i] < a[i]) {
            while(j < b.length && b[j] < a[i]) {
                c.push(b[j])
                j++;
            }
        }
        else {
            while(i < a.length && j < b.length && a[i] === b[j]) {
                c.push(a[i]);
                c.push(b[j]);
                i++;
                j++;
            }
        }
    }
    return c;
}