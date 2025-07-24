export function handleStateArrChange(i, val, arr, setArr) {
  const arrCpy = [...arr];
  arrCpy[i] = val;
  setArr(arrCpy);
}

export function removeStateArrElement(i, arr, setArr) {
  setArr(arr.filter((_, j) => j !== i))
}

export function generateId() {
    return Math.random().toString(36).substring(2, 10);
  }
