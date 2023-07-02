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
