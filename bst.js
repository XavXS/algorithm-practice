const Node = (newValue = null) => {
    let value = newValue;
    let left = null;
    let right = null;
    return {
        value,
        left,
        right,
    }
}

const Tree = (arr = []) => {
    arr.sort((a, b) => a - b);
    let root = buildTree([...new Set(arr)]);
    function buildTree(arr) {
        const midIndex = Math.floor(arr.length / 2)
        const mid = Node(arr[midIndex]);
        if(midIndex === 0) return mid;
        if(midIndex === arr.length-1) {
            mid.left = Node(arr[0]);
            return mid;
        }
        mid.left = buildTree(arr.slice(0, midIndex));
        mid.right = buildTree(arr.slice(midIndex+1, arr.length));
        return mid;
    }

    const find = (value, rootNode = root) => {
        if(!rootNode) return rootNode;
        if(value > rootNode.value)
            return find(value, rootNode.right);
        if(value < rootNode.value)
            return find(value, rootNode.left);
        return rootNode;
    }

    const insert = (value, rootNode = root) => {
        if(!root) {
            root = Node(value);
            return;
        }
        if(!rootNode) return Node(value);
        if(value > rootNode.value)
            rootNode.right = insert(value, rootNode.right);
        else if(value < rootNode.value)
            rootNode.left = insert(value, rootNode.left);
        return rootNode;
    }

    const remove = (value, rootNode = root) => {
        if(!rootNode) return rootNode;
        if(rootNode.value > value) {
            rootNode.left = remove(value, rootNode.left);
        } else if(rootNode.value < value) {
            rootNode.right = remove(value, rootNode.right);
        } else {
            if(!rootNode.left)
                return rootNode.right;
            if(!rootNode.right)
                return rootNode.left;
            let successor = rootNode.right;
            while(successor.left !== null)
                successor = successor.left;
            rootNode.value = successor.value;
            rootNode.right = remove(rootNode.value, rootNode.right);
        }
        return rootNode;
    }

    const levelOrder = (cb) => {
        let current = root;
        let arr = [];
        const queue = [current];
        while(queue.length) {
            current = queue.shift();
            if(current.left) queue.push(current.left);
            if(current.right) queue.push(current.right);
            if(!cb) arr.push(current.value);
            else cb(current.value);
        }
        if(!cb) return arr;
    }

    const height = (rootNode = root) => {
        if(!rootNode) return 0;
        leftHeight = height(rootNode.left);
        rightHeight = height(rootNode.right);
        if(leftHeight > rightHeight) return leftHeight + 1;
        return rightHeight + 1;
    }

    const depth = (node, current = root) => {
        if(!current) return null;
        if(node.value < current.value)
            return depth(node, current.left) + 1;
        else if(node.value > current.value)
            return depth(node, current.right) + 1;
        return 0;
    }
    
    const isBalanced = () => {
        lh = height(root.left);
        rh = height(root.right);
        return Math.abs(lh - rh) <= 1;
    }

    const rebalance = () => {
        root = buildTree(preOrder());
    }

    const levelOrderRec = (cb = null) => {
        const arr = [];
        const h = height();
        for(let i=0; i<=h; ++i)
            processLevel(root, i);

        function processLevel(rootNode, h) {
            if(!rootNode) return;
            if(h === 0) {
                if(!cb) arr.push(rootNode.value);
                else cb(rootNode.value);
                return;
            } else if(h > 0) {
                processLevel(rootNode.left, h-1);
                processLevel(rootNode.right, h-1);
            }
        }

        if(!cb) return arr;
    }

    const inOrder = (cb = null, rootNode = root, arr = []) => {
        if(!rootNode) return;
        inOrder(cb, rootNode.left, arr);
        if(!cb) arr.push(rootNode.value);
        else cb(rootNode.value);
        inOrder(cb, rootNode.right, arr);
        if(!cb) return arr;
    }

    const preOrder = (cb = null, rootNode = root, arr = []) => {
        if(!rootNode) return;
        if(!cb) arr.push(rootNode.value);
        else cb(rootNode.value);
        preOrder(cb, rootNode.left, arr);
        preOrder(cb, rootNode.right, arr);
        if(!cb) return arr;
    }

    const postOrder = (cb = null, rootNode = root, arr = []) => {
        if(!rootNode) return;
        postOrder(cb, rootNode.left, arr);
        postOrder(cb, rootNode.right, arr);
        if(!cb) arr.push(rootNode.value);
        else cb(rootNode.value);
        if(!cb) return arr;
    }

    return {
        root,
        find,
        insert,
        remove,
        height,
        isBalanced,
        rebalance,
        levelOrder,
        levelOrderRec,
        inOrder,
        preOrder,
        postOrder,
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

let tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324], '', false);
prettyPrint(tree.root);
tree.remove(67);
prettyPrint(tree.root);
console.log(tree.levelOrder())
console.log(tree.levelOrderRec())
console.log(tree.preOrder())
console.log(tree.inOrder())
console.log(tree.postOrder())
