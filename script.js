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
  insert(value, root = this.root) {
    if (root === null) {
      root = new Node(value);
      return root;
    }

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  // Deleting node method
  deleteNode(value, root = this.root) {
    if (root === null) {
      return root;
    }
    if (root.data > value) {
      root.left = this.deleteNode(value, root.left);
    } else if (root.data < value) {
      root.right = this.deleteNode(value, root.right);
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

      root.right = this.deleteNode(succ.data, root.left);
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
  find(value, root = this.root) {
    if (root === null) {
      return null;
    }
    if (root.data < value) {
      return this.find(value, root.right);
    } else if (root.data > value) {
      return this.find(value, root.left);
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

  //  3 methods for depth-first traversal

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
    let heightNode = 0;
    const findHeight = (node, root = this.root) => {
      if (root === null) {
        return -1;
      }
      const leftHeight = findHeight(node, root.left);
      const rightHeight = findHeight(node, root.right);
      const currentHeight = Math.max(leftHeight, rightHeight) + 1;
      if (root.data === node) {
        heightNode = currentHeight;
      }
      return currentHeight;
    };
    findHeight(node);
    return heightNode;
  }

  // Finding depth method
  depth(node, root = this.root) {
    if (root === null) {
      return -1;
    }
    let depth = -1;
    if (
      root.data === node ||
      (depth = this.depth(node, root.left)) >= 0 ||
      (depth = this.depth(node, root.right)) >= 0
    ) {
      return depth + 1;
    }
    return depth;
  }

  // Checking if tree is balanced method
  isBalanced() {
    const checkBalance = (root = this.root) => {
      if (root === null) {
        return 0;
      }

      const leftHeight = checkBalance(root.left);
      const rightHeight = checkBalance(root.right);
      if (leftHeight === -1 || rightHeight === -1) {
        return -1;
      }

      const balance = Math.abs(leftHeight - rightHeight);

      if (balance > 1) {
        return -1;
      }

      return Math.max(leftHeight, rightHeight) + 1;
    };
    return checkBalance() !== -1;
  }

  // Rebalancing method
  rebalance() {
    let values = this.inOrder();
    let sorted = this.mergeSort(values);
    let sortedNoDuplicates = this.removeDuplicates(sorted);
    this.root = this.buildTree(
      sortedNoDuplicates,
      0,
      sortedNoDuplicates.length - 1
    );
  }

  // Getting array of random numbers method
  randomNumbers() {
    const arrayRandom = [];
    for (let i = 0; i < 20; i++) {
      let num = Math.random() * 100;
      arrayRandom.push(Math.round(num));
    }
    const array = this.removeDuplicates(arrayRandom);
    return this.mergeSort(array);
  }

  // Remove duplicates method
  removeDuplicates(array) {
    array = array.filter((item, index) => array.indexOf(item) === index);
    return array;
  }

  // Driver script
  driverScript() {
    const array = this.randomNumbers();

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

// Testing

const binary = new Tree();
binary.driverScript();
prettyPrint(binary.root);
