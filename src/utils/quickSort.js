const swap = (items, leftIndex, rightIndex) => {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
};

const partition = (items, field, left, right) => {
  var pivot = items[Math.floor((right + left) / 2)],
    i = left,
    j = right;
  while (i <= j) {
    while (items[i][field] < pivot[field]) {
      i++;
    }
    while (items[j][field] > pivot[field]) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }
  return i;
};

export const quickSort = (items, field, left, right) => {
  let index;
  if (items.length > 1) {
    index = partition(items, field, left, right);
    if (left < index - 1) {
      quickSort(items, field, left, index - 1);
    }
    if (index < right) {
      quickSort(items, field, index, right);
    }
  }
  return items;
};
