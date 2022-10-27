const swap = (items, leftIndex, rightIndex) => {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
};

const partition = (items, field, left, right, order) => {
  var pivot = items[Math.floor((right + left) / 2)],
    i = left,
    j = right;
  while (i <= j) {
    while (
      order === "dec"
        ? items[i][field] > pivot[field]
        : items[i][field] < pivot[field]
    ) {
      i++;
    }
    while (
      order === "dec"
        ? items[j][field] < pivot[field]
        : items[j][field] > pivot[field]
    ) {
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

export const quickSort = (items, field, left, right, order) => {
  let index;
  if (items.length > 1) {
    index = partition(items, field, left, right, order);
    if (left < index - 1) {
      quickSort(items, field, left, index - 1, order);
    }
    if (index < right) {
      quickSort(items, field, index, right, order);
    }
  }
  return items;
};
