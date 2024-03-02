// Node class
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Tree class
class Tree {
  constructor(array) {
    this.array = array;
    this.root = null;
  }

  // Sorting method
  mergeSort(array) {
    if (array.length <= 1) {
      return array;
    }

    const mid = Math.floor(array.length / 2);
    const left = this.mergeSort(array.slice(0, mid));
    const right = this.mergeSort(array.slice(mid));
    return this.merge(left, right);
  }

  // Merge sorting helper func
  merge(left, right) {
    const mergedArray = [];

    while (left.length > 0 && right.length > 0) {
      const arrayMin = left[0] < right[0] ? left : right;
      const mergeElement = arrayMin.shift();
      mergedArray.push(mergeElement);
    }

    return mergedArray.concat(left, right);
  }

  // Building tree method
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

  // Inserting value method
  insert(value) {
    this.root = this.insertRec(this.root, value);
  }

  // Inserting value helper recursive method
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

  // Deleting node method
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

  // Finding min node fore deleting method
  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // Finding node in tree method
  find(value) {
    const result = this.findRec(this.root, value);
    return result;
  }

  // Finding recursive helper method
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

  // Lever Order Traversal
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
      if (typeof callback === "function") {
        callback(current.data);
      } else {
        values.push(current.data);
      }
      queue.shift();
    }
    return values;
  }

  // In Order traversal
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
    return values;
  }

  // Pre Order traversal
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
    return values;
  }

  // Post Order traversal
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
    return values;
  }

  // Finding height of node method
  height(node) {
    this.heightNode = 0;
    this.heightRec(this.root, node);
    return this.heightNode;
  }

  // Finding height recursive helper method
  heightRec(root, node) {
    if (root === null) {
      return -1;
    }

    const leftHeight = this.heightRec(root.left, node);
    const rightHeight = this.heightRec(root.right, node);

    const currentHeight = Math.max(leftHeight, rightHeight) + 1;

    if (root.data === node) {
      this.heightNode = currentHeight;
    }
    return currentHeight;
  }

  // Finding depth method
  depth(node) {
    let result = this.depthRec(this.root, node);
    return result;
  }

  // Finding depth recursive helper method
  depthRec(root, node) {
    if (root === null) {
      return -1;
    }
    let depth = -1;
    if (
      root.data === node ||
      (depth = this.depthRec(root.left, node)) >= 0 ||
      (depth = this.depthRec(root.right, node)) >= 0
    ) {
      return depth + 1;
    }
    return depth;
  }

  // Checking if tree is balanced method
  isBalanced() {
    return this.checkBalance(this.root) !== -1;
  }

  // Helper method for checking if tree is balanced
  checkBalance(node) {
    if (node === null) {
      return 0;
    }

    const leftHeight = this.checkBalance(node.left);
    const rightHeight = this.checkBalance(node.right);
    if (leftHeight === -1 || rightHeight === -1) {
      return -1;
    }

    const balance = Math.abs(leftHeight - rightHeight);

    if (balance > 1) {
      return -1;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Rebalancing method
  rebalance() {
    let values = this.inOrder();
    this.root = this.buildTree(values, 0, values.length - 1);
  }

  // Getting array of random numbers method
  randomNumbers() {
    const array = [];
    for (let i = 0; i < 20; i++) {
      let num = Math.random() * 100;
      array.push(Math.round(num));
    }
    return this.mergeSort(array);
  }

  // Driver script
  driverScript() {
    const arrayDuplicates = this.randomNumbers();
    const array = arrayDuplicates.filter(
      (item, index) => arrayDuplicates.indexOf(item) === index
    );

    this.buildTree(array, 0, array.length - 1);

    console.log(this.isBalanced());

    console.log(this.levelOrder());
    console.log(this.inOrder());
    console.log(this.preOrder());
    console.log(this.postOrder());

    this.insert(121);
    this.insert(129);
    this.insert(105);
    this.insert(102);

    console.log(this.isBalanced());

    this.rebalance();

    console.log(this.isBalanced());
    console.log(this.levelOrder());
    console.log(this.inOrder());
    console.log(this.preOrder());
    console.log(this.postOrder());
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

const binary = new Tree();
binary.driverScript();
