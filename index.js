//LINKED LIST IMPLEMENTATION

class LinkedList {
  size =0;
  head=null;
   
get isEmpty(){
    return this.size===0;
}

toString(){
    if(!this.size) return ''; 
    
    let str=`${this.head.element}`;
    let current = this.head;
 
    for(let i=0;i<this.size-1;i++){
     current=current.next;
     str+=`,${current.element}`;
 }
    return str;
 }
 print(){
    let arr =[];
    if(this.size){
        let current = this.head;

        for(let i=0;i<this.size;i++){
            arr.push(current);
            current = current.next;
        }
    }
    console.log(arr);
}

createNode(element){
    return {element,next:null};
}

get(index){
  return this.getNodeAt(index).element;
   
}

getNodeAt(index){

    if(index===undefined || index<0||index>=this.size) return null;

    if(index===0){
          return this.head;
    }

    let current = this.head;
    for(let i=0;i<index;i++){
       current = current.next;
    }
    return current;
}

indexOf(element){
    let current = this.head;

    if(element ===current.element) return 0;
    
    for(let i=0;i<this.size;i++){
        if(current.element ===element) return i;
        current = current.next;
    }
    return -1;
}

contains(element){
    return this.indexOf(element) !==-1;
}
push(element){

   const node = this.createNode(element);

   if(this.head===null){
    this.head=node;
   }else{
    // let  current = this.head;

    // while(current.next!==null){
    //     current = current.next;
    // }
    let current = this.getNodeAt(this.size-1);  
    current.next = node;
   
   }
   this.size +=1;
   return this.size;
}

insert(element,index=0){
   
    if(index<0||index>this.size) return false;

    const node = this.createNode(element);
    if(index==0){
        node.next = this.head;
        this.head = node;
    }else{
        // let previous =this.head;
        // for(let i=0;i<index-1;i++){
        //     previous =previous.next;
        // }
        let previous = this.getNodeAt(index-1);
        node.next = previous.next;
        previous.next = node;
    }
    this.size+=1;
    return true;
}

remove(index){
    if(index<0||index>this.size) return null;
     let removedNode = this.head;

     if(index===0){
        this.head =this.head.next;
     }else{
        let previous = this.getNodeAt(index-1);
        removedNode = previous.next;
        previous.next = removedNode.next;
     }
     this.size-=1;
     return removedNode.element;
}
}


//INITIALISING LINKED LIST

// const list = new LinkedList();
// list.push("start");
// list.push(42);
// list.push(78);
// list.push("end");

// list.print();

// list.insert(55,2);
// list.insert("middle",3);


// // console.log(list.get(3));
// list.print();

// list.remove(3);

// list.print();

// console.log(list.indexOf(55))
// console.log(list.contains(55))
// console.log(list.indexOf("middle"))
// console.log(list.contains("middle"))


//SORTING SSINGLE LINKED LSIT 


class SortedLinkedList extends LinkedList{

    constructor(sortingFunction=null){
        super();

        this._sortingFunction = sortingFunction;
        if(!sortingFunction ||typeof sortingFunction!=='function' ){
            this._sortingFunction =(a,b)=>{
                if(a===b) return 0;
                return a>b ?1:-1;
            }
        }
        this.push =undefined;
    }

  insert(element){
      if(this.isEmpty){
        return super.insert(element);
      }

      const index = this._getNextElementIndex(element);
      return super.insert(element,index);
  }

    _getNextElementIndex(element){
        let current = this.head;
        let i=0;
        for(;i<this.size;i++){
            const res = this._sortingFunction(element,current.element);
            if(res===false||res===-1) return i;
            current=current.next;
        }
        return i;
    }
};



// const list = new SortedLinkedList((a,b)=>a<b);

// list.insert(34);
// list.insert(32);
// list.insert(3);
// list.insert(24);
// list.insert(134);
// list.insert(24);

// list.print();


//DOUBLELINKED LIST


class DoubleLinkedList extends LinkedList{

    tail = null;

    createNode(element){
        return {element,next:null,prev:null};
    }
    
    push(element){
     const node = this.createNode(element);

     if(!this.head){
        this.head = node;
     }else{
        const current = this.getNodeAt(this.size - 1);
        current.next = node;
        node.prev = current;
     }
     this.tail=node;

     this.size+=1;
     return this.size;
    }
     
    insert(element,index=0){
    if(index<0||index>this.size) return false;

    const node = this.createNode(element);
    if(index===0){
        if(this.head){
            node.next = this.head;
            this.head.prev = node;
        }else{
            this.tail= node;
        }
        this.head=node;
    }else if( index===this.size){
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }else{
      const current = this.getNodeAt(index-1);
      const prev = current.prev;

      prev.next = node;
      current.prev=node;
      node.prev = prev;
      node.next=current;
    }
    this.size+=1;
    return true;
    }

    remove(index=0){
        if(index<0||index>this.size) return null;

        let removedNode = this.head;

        if(index===0){
            this.head = removedNode.next;
            if(this.size===1){
                this.tail=null;
            }else{
                this.head.prev=null;
            }
        }else if(index===this.size-1){
             removedNode = this.tail;
             this.tail= removedNode.prev;
             this.tail.next=null;
        }else{
           removedNode = this.getNodeAt(index);
           const previous = removedNode.prev;
           const next = removedNode.next;

           previous.next = next;
           next.prev=previous;
        }

        this.size-=1;
        return removedNode.element;
    }

    reverse(){
        let current =this.head;
        this.head=this.tail;
        this.tail =current;

        for(let i=0;i<this.size;i++){
            const {prev,next} = current;

            current.prev = next;
            current.next = prev;
            current = next;
        }
    }
}



// const list = new DoubleLinkedList();

// list.push("start");
// list.push(23);
// list.push(2);
// list.push(53);
// list.push(2233);
// list.push("end");

// list.insert("between",3);

// console.log(list.toString())
// list.reverse()
// console.log(list.toString())


//CIRCULARLINKED LIST

