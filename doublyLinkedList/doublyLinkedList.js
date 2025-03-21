class Node {
    constructor(value) {
        this.value = value
        this.next = null
        this.prev = null
    }
}

class DoublyLinkedList {

    constructor(value) {
        const newNode = new Node(value)
        this.head = newNode
        this.tail = newNode
        this.length = 1
    }

    //add new element to the end 

    push(value) {
        let newNode = new Node(value)
        if(!this.head) {
            this.head = newNode
            this.tail = newNode
        } 
        this.tail.next = newNode
        newNode.prev = this.tail
        this.tail = newNode
        this.length++
        return this

    }

    // remove last element

    pop() {

        if(this.length == 0) {
            return undefined
        }

        if(this.length == 1) {
            this.head = null
            this.tail = null
            return
        }

        let tempTail = this.tail.prev
        tempTail.next = null
        this.tail = tempTail
        this.length--
        return tempTail
    }

    //add new element to first index

    unShift(value) {
        let newNode = new Node(value)
        if(!this.head) {
            this.head = newNode
            this.tail = newNode
            this.length = 1
            return
        }

        newNode.next = this.head
        this.head.prev = newNode
        this.head = newNode
        this.length++

    }

    //remove the first element

    shift() {
        if(!this.head) return undefined

        if(this.length == 1) {
            this.head = null
            this.tail = null
            return
        }

        this.head = this.head.next
        this.head.prev = null
        this.length--
    }

}

const doublyLinkedList = new DoublyLinkedList(1)
doublyLinkedList.push(2)
doublyLinkedList.push(3)
doublyLinkedList.pop()
doublyLinkedList.unShift(3)
doublyLinkedList.shift()
console.log(doublyLinkedList)
