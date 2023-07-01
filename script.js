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
    insertElement(data){
        this.root = this.insertRecursive(this.root, data);
    }
    insertRecursive(node,data){
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
    find(data){
        this.root=this.findRecursive(this.root,data);
    }
    findRecursive(node,data){
        if(data===node.value || node ==null){
            return node;
        }
        if(data<node.data){
            node.left=this.findRecursive(node.left,data);
        }
        else if(data > node.data){
            node.right = this.findRecursive(node.right,data);
        }
        return node;
    }
}