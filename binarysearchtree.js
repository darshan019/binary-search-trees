function Tree() {

    function buildTree(arr, start, end) {
        if(start > end) return null

        let mid = parseInt((start+end)/2)

        let node = Node(arr[mid])

        node.left = buildTree(arr, start, mid - 1)
        node.right = buildTree(arr, mid + 1, end)

        return node
    }
    
    const insert = (root, value) => {
        if(root == null) {
            root = Node(value)
            return root
        }

        let currentNode = root
        let parentNode = null
        
        while(currentNode !== null) {
            if(value == currentNode.data) {
                console.log('Value already exists')
                return
            }

            else if(value < currentNode.data) {
                parentNode = currentNode
                currentNode = currentNode.left
            }
            else if(value > currentNode.data) {
                parentNode = currentNode
                currentNode = currentNode.right
            }

        }

        if(value < parentNode.data) parentNode.left = Node(value)
        else if(value > parentNode.data) parentNode.right = Node(value)


    }

    const deleteNode = (rootNode, value) => {
        let current = rootNode
        let parent = null

        while(current.data !== value) {
            if(value < current.data) {
                parent = current
                current = current.left
            }
            else if(value > current.data) {
                parent = current
                current = current.right
            }
        }

        if(current == null) return rootNode
        
        if(current.left === null && current.right === null) {
            if(parent === null) return null
            else if(current === parent.left) parent.left == null
            else parent.right = null
        }

        else if(current.left === null) {
            if(parent === null) return current.right
            if(current === parent.left) parent.left = current.right
            else parent.right = current.right
        }

        else if(current.right === null) {
            if(parent === null) return current.left
            if(current === parent.left) parent.left == current.left
            else parent.right = current.left
        }

        else {
            let successorParent = current
            let successor = current.right

            while(successor.left !== null) {
                successorParent = successor
                successor = successor.left
            }

            current.data = successor.data

            if(successorParent.left === successor) successorParent.left = successor.right
        }
    }

    const find = (root, val) => {
        let current = root
        while(current !== null) {
            if(val < current.data) current = current.left
            else current = current.right

            if(current.data == val) return current
        }
        
    }

    const levelOrder = (root, func) => {
        let queue = [root]
        let result = []
        if(root == null) return []
        
        while(queue.length > 0) {
            const node = queue.shift()
            if(func) func(node)
            else result.push(node.data)

            if(node.left) queue.push(node.left)
            if(node.right) queue.push(node.right)
        }
        return result


    }
    let results = []
    const preOrder = (currentRoot, fn) => {
        if(currentRoot == null) return
        if(fn) fn(currentRoot)
        else {
            results.push(currentRoot.data)
        }
        preOrder(currentRoot.left, fn)
        preOrder(currentRoot.right, fn)
        return results
    }

    const inOrder = (currentRoot, func) => {
        if(currentRoot == null) return

        inOrder(currentRoot.left, func)
        if(func) func(currentRoot)
        else results.push(currentRoot.data)
        inOrder(currentRoot.right, func)

        return results
        
    }

    const postOrder = (currentRoot, func) => {
        if(currentRoot == null) return
        postOrder(currentRoot.left, func)
        postOrder(currentRoot.right, func)

        if(func) func(currentRoot)
        else results.push(currentRoot.data)

        return results
    }

    const height = (currentRoot) => {
        if(currentRoot == null) return 0

        let left = height(currentRoot.left)
        let right = height(currentRoot.right)

        return Math.max(left, right) + 1

    }

    const depth = (currentNode,node) => {
        let newNode = currentNode
        let d2 = 0
        let d1 = 0
        if(node < currentNode.data) {
            while(currentNode.data !== node) {
                currentNode = currentNode.left
                d1++
            }
            return d1
        }
        else if(node > newNode.data) {
            while(newNode.data !== node) {
                newNode = newNode.right
                d2++
            }
            return d2
        }
        else return 0
    }

    const isBalanced = (currentRoot) => {
        if(currentRoot == null) return true
        let leftheight = height(currentRoot.left)
        let rightheight = height(currentRoot.right)

        let diff = Math.abs(leftheight-rightheight)
        if(diff > 1) return false
        
        return isBalanced(currentRoot.left) && isBalanced(currentRoot.right)
        
    }

    const rebalance = (current) => {
        let arr = inOrder(current)
        let tree = buildTree(arr, 0, arr.length - 1)
        prettyPrint(tree)
        return tree
    }

    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    return {
        buildTree,
        insert,
        prettyPrint,
        deleteNode,
        find,
        levelOrder,
        preOrder,
        inOrder,
        postOrder,
        height,
        depth,
        isBalanced,
        rebalance,
    }

}

function Node(value) {
    return {
        left: null,
        data: value,
        right: null
    }
}

function mergesort(arr) {
    if(arr.length < 2) return arr

    let mid = parseInt(arr.length/2)

    let left = arr.slice(0,mid)
    let right = arr.slice(mid)

    function merge(arr1, arr2) {
        let mergedArr = []
        let i = 0;
        let j = 0;

        while(i < arr1.length && j < arr2.length) {
            if(arr1[i] < arr2[j]) {
                mergedArr.push(arr1[i])
                i++
            }
            else {
                mergedArr.push(arr2[j])
                j++
            }
        }

        while(i < arr1.length) {
            mergedArr.push(arr1[i])
            i++
        }

        while(j < arr2.length) {
            mergedArr.push(arr2[j])
            j++
        }

        return mergedArr
    }

    return merge(mergesort(left), mergesort(right))
}

//let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67]

function arrGenerator() {
    let arr = []
    let len = 9
    for(let i = 0; i <= len; i++) {
        arr.push(Math.floor(Math.random()*100))
    }
    return arr
}

let arrForTree = arrGenerator()


function filterArray() {
    const filterArr = mergesort(arrForTree)
    return filterArr.filter((value, index, self) => {
        return self.indexOf(value) == index
    })
}

const displayArr = filterArray()
const binarytree = Tree()
let theMainTree = binarytree.buildTree(displayArr, 0, displayArr.length - 1)
binarytree.prettyPrint(theMainTree)
console.log('level order')
binarytree.levelOrder(theMainTree,(node) => console.log(node.data))
console.log('pre order')
binarytree.preOrder(theMainTree,(node) => console.log(node.data))
console.log('post order')
binarytree.postOrder(theMainTree,(node) => console.log(node.data))
console.log('In order')
binarytree.inOrder(theMainTree,(node) => console.log(node.data))

binarytree.insert(theMainTree, 260)
binarytree.insert(theMainTree, 210)
binarytree.insert(theMainTree, 145)
binarytree.insert(theMainTree, 350)
binarytree.insert(theMainTree, 241)
binarytree.insert(theMainTree, 135)
console.log(binarytree.isBalanced(theMainTree))
theMainTree = binarytree.rebalance(theMainTree)
console.log(binarytree.isBalanced(theMainTree))
console.log('level order')
binarytree.levelOrder(theMainTree,(node) => console.log(node.data))
console.log('pre order')
binarytree.preOrder(theMainTree,(node) => console.log(node.data))
console.log('post order')
binarytree.postOrder(theMainTree,(node) => console.log(node.data))
console.log('In order')
binarytree.inOrder(theMainTree,(node) => console.log(node.data))
