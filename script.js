class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = null;
  }

  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    this.root = root;
    return root;
  }

  insert(value) {
    this.root = this.insertRec(this.root, value);
  }

  insertRec(root, value) {
    if (root === null) {
      root = new Node(value);
      return root;
    }

    if (value < root.data) {
      root.left = this.insertRec(root.left, value);
    } else if (value > root.data) {
      root.right = this.insertRec(root.right, value);
    }

    return root;
  }

  deleteNode(root, value) {
    if (root === null) {
      return root;
    }
    if (root.data > value) {
      root.left = this.deleteNode(root.left, value);
    } else if (root.data < value) {
      root.right = this.deleteNode(root.right, value);
    } else {
      if (root.left === null) {
        root = root.right;
        return root;
      } else if (root.right === null) {
        root = root.left;
        return root;
      }
      let succ = this.findMin(root.right);

      root.data = succ.data;

      root.right = this.deleteNode(root.right, succ.data);
    }

    return root;
  }

  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  find(value) {
    const result = this.findRec(this.root, value);
    if (result) {
      console.log(result);
    } else {
      console.log(`There are no node with${value}`);
    }
  }

  findRec(root, value) {
    if (root.data === null) {
      return null;
    }
    if (root.data < value) {
      return this.findRec(root.right, value);
    } else if (root.data > value) {
      return this.findRec(root.left, value);
    } else {
      return root;
    }
  }

  levelOrder(callback) {
    if (this.root === null) {
      return;
    }
    const values = [];
    const queue = [];
    queue.push(this.root);
    while (queue.length !== 0) {
      let current = queue[0];
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
      if (callback) {
        callback(current.data);
      }
      values.push(current.data);
      queue.shift();
    }
    console.log(values);
  }

  values = [];

  inOrder(callback) {
    const values = [];
    const traverse = (node) => {
      if (node === null) {
        return;
      }
      traverse(node.left);
      if (typeof callback === "function") {
        callback(node.data);
      } else {
        values.push(node.data);
      }
      traverse(node.right);
    };
    traverse(this.root);
    console.log(values);
    return values;
  }

  preOrder(callback) {
    const values = [];

    const traverse = (node) => {
      if (node === null) {
        return;
      }
      if (typeof callback === "function") {
        callback(node.data);
      } else {
        values.push(node.data);
      }
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
    console.log(values);
    return values;
  }

  postOrder(callback) {
    const values = [];
    const traverse = (node) => {
      if (node === null) {
        return;
      }
      traverse(node.left);
      traverse(node.right);
      if (typeof callback === "function") {
        callback(node.data);
      } else {
        values.push(node.data);
      }
    };
    traverse(this.root);
    console.log(values);
    return values;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return null;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const array = [1, 4, 5, 7, 8, 9, 23, 67, 6345];

const end = array.length - 1;

const binary = new Tree(array);
binary.buildTree(array, 0, end);
binary.insert(555);
binary.deleteNode(binary.root, 7);
binary.find(555);
binary.postOrder();
prettyPrint(binary.root);
