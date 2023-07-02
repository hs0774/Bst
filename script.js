class Node {
    constructor(data){
        this.left=null;
        this.data=data;
        this.right=null;
    }
}

class Tree {
    constructor(array) {
      this.root = null;
      if (Array.isArray(array) && array.length > 0) {
        this.root = this.buildTree(array,0,array.length-1);
      }
    }
    buildTree(array,start,end){
        if (start>end){
            return null;
        }
        let mid = Math.floor((start+end)/2);
        let node = new Node(array[mid]);
        node.left=this.buildTree(array,start,mid-1);
        node.right=this.buildTree(array,mid+1,end);
        return node;
    }
    insertRecursive(node=this.root,data){
        if(node===null){
            return new Node(data);
        }
        if (data < node.data) {
            node.left = this.insertRecursive(node.left, data);
        } else if (data > node.data) {
            node.right = this.insertRecursive(node.right, data);
        }
    
        return node;
    }
    deleteNodeRecursive(node=this.root,data){
        if(node===null){
            return null;
        }
        if (data < node.data) {
             node.left = this.deleteNodeRecursive(node.left, data);
        } else if (data > node.data) {
              node.right = this.deleteNodeRecursive(node.right, data);
        } else {
            if(node.left===null){
                return node.right;
            }
            if(node.right===null){
                return node.left;
            }
    
            let minNode = this.findMinNode(node.right);
            node.data= minNode.data;
            node.right=this.deleteNodeRecursive(node.right,minNode.data);
       }
        
       return node;
    }
    findMinNode(node) {
        if (node.left === null) {
            return node;
        }
        return this.findMinNode(node.left);
    }
    findRecursive(node=this.root,data){
        if(node === null || data === node.data ){
            return node;
        }
        if(data<node.data){
            return this.findRecursive(node.left,data);
        }
        else if(data > node.data){
           return this.findRecursive(node.right,data);
        }
        return null;
    }
    depth(data){
        let count =0;
        return this.finddepth(this.root,data,count);
    }
    finddepth(node,data,count){
        if(node ===null){
            return -1;
        }
        if(data===node.data){
            return count;
        }
        if(data<node.data){
            count++;
            return this.finddepth(node.left,data,count);
        }
        else if(data > node.data){
            count++
            return this.finddepth(node.right,data,count);
        }
        return -1;
    }
    levelOrder(node=this.root){
        if(node===null){
            return;
        }
        const queue = new Queue();
        queue.enqueue(node);
        while(!queue.isEmpty()){
            const current = queue.dequeue();
            console.log(current.data);
            if(node.left!=null){
            queue.enqueue(current.left);
            }
            if(node.right !=null){
            queue.enqueue(current.right);
            }
        }
    }
    inorder(node=this.root){
        if(node === null){
            return null;
        }

        this.inorder(node.left);
        console.log(node.data);
        this.inorder(node.right);
    }
    preorder(node=this.root){
        if(node === null){
            return null;
        }

        console.log(node.data);
        this.preorder(node.left);
        this.preorder(node.right);
    }
    postorder(node=this.root){
        if(node === null){
            return null;
        }

        this.postorder(node.left);
        this.postorder(node.right);
        console.log(node.data);
    }
    height(node = this.root){
        if(node === null){
            return -1;
        }
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return Math.max(leftHeight,rightHeight)+1;
    }
    isbalanced(node = this.root){
        if(node === null){
            return;
        }
        let leftHeight = node.left;
        let rightHeight = node.right;
        if(Math.abs(this.height(leftHeight) - this.height(rightHeight)) <= 1 ){
            console.log('Balanced')
            return true;
        }else{
            console.log('Not balanced');
            return false;
        }
    }
    rebalance(node = this.root){
        let check = this.isbalanced(node);
        if (check === false){
            let inOrderStore = [];
            this.inorderBalanceHelper(node,inOrderStore);
            this.buildTree(inOrderStore,0,inOrderStore.length-1);
        }else {
            return;
        }
    }
    inorderBalanceHelper(node,inOrderStore){
        if(node === null){
            return null;
        }

        this.inorderBalanceHelper(node.left);
        inOrderStore.push(node.data);
        this.inorderBalanceHelper(node.right);
    }
}

class Queue {
    constructor(){
        this.items=[];
    }
    enqueue(element){
        this.items.push(element);
    }
    dequeue(){
        return this.items.shift();
    }
    get isEmpty() {
        return this.items.length === 0;
      }
}
