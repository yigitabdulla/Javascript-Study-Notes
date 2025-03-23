class Node{

    constructor(value) {
        this.head = value
        this.next = null
    }

}

class LinkedList {

    constructor(value) {
        if(!value) return

        this.head = new Node(value)
        this.tail = this.head
        this.length = 1
    }

    push(value) {
        let node = new Node(value)
        if(!this.head) {
            this.head = node
            this.tail = node
        } else {
            this.tail.next = node
            this.tail = node
            this.length++
        }
    }

    pop() {
        let startNode = this.head
        if(this.length == 1) {
            this.head = null
            this.tail = null
            this.length = 0
            return
        }
        for (let index = 0; index < this.length-2; index++) {
            startNode = startNode.next
        }
        startNode.next = null
        this.tail = startNode
        this.length--
        
    }

    unShift(value) {
        let newHead = new Node(value)
        if(!this.head) {
            this.head = newHead
            this.tail = newHead
            this.length = 1
            return
        }
        newHead.next = this.head
        this.head = newHead
        this.length++
    }

    shift() {
        if(!this.head) return

        let newHead = this.head.next
        this.head = newHead
        this.length--
        if(this.length == 0) this.tail = null
    }

    getFirst() {
        return this.head
    }

    getLast() {
        let first = this.head
        if(!this.head) return
        while(first.next != null) {
            first = first.next
        }
        return first
    }

    get(index) {
        if(!this.head) return
        let first = this.head
        for (let i = 0; i < index; i++) {
            if(first.next == null) return 'Not found'
            first = first.next
        }
        
        return first
    }

    set(index,value) {
        if(!this.head) return
        let changed = this.get(index)
        changed.head = value
    }

    insert(index,value) {
        
        if(index == 0 ) return this.unShift(value)
        
        if(index == this.length) return this.push(value)

        const newElement = new Node(value)
        const temp = this.get(index-1)
        newElement.next = temp.next
        temp.next = newElement
        this.length++
        
    }

    size() {
        return this.length
    }

    clear() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    reverse() {
        let current = this.head;
        this.tail = this.head; // The old head will become the new tail
        let prev = null;
        let next = null;
    
        while (current !== null) {
            next = current.next; // Store the next node
            current.next = prev; // Reverse the pointer
            prev = current; // Move prev to current
            current = next; // Move current to next
        }
    
        this.head = prev; // The last processed node is the new head
    }
    
}

const myLinkedList = new LinkedList(1)

myLinkedList.push(2)
myLinkedList.push(3)
myLinkedList.push(4)
myLinkedList.push(5)
myLinkedList.reverse()

console.log(myLinkedList)