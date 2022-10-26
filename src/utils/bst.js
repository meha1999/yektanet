class Node {
  constructor(data) {
    this.right = null;
    this.left = null;
    this.data = data;
  }
}

class Bst {
  constructor() {
    this.root = null;
  }

  insert(data) {
    var node = new Node(data);
    if (!this.root) {
      this.root = node;
      return this;
    }
    let current = this.root;
    while (current) {
      if (data.date < current.data.date) {
        if (!current.left) {
          current.left = node;
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = node;
          break;
        }
        current = current.right;
      }
    }
  }

  find(data,rootData) {
    if (!rootData) return null;
    let current = rootData;
    let finalData = [];
    while (current) {
      if (data === current.data.date) {
        finalData.push(current.data);
      }

      if (current.right && data < current.data.date) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return finalData;
  }

  contains(data) {
    const found = this.find(data);

    if (found) {
      return true;
    }

    return false;
  }
}

export default Bst;
