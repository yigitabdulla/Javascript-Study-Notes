class MyArray {

    constructor() {
        this.length = 0;
        this.data = {};
    }

    push(item) {
        this.data[this.length] = item
        this.length++
        return this.length
    }

    get(item) {
        for (let index = 0; index < this.length; index++) {
            if(item == this.data[index]) return index
        }
        return 'Not found'
    }

    pop() {
        delete this.data[this.length-1]
        this.length--
        return this.length
    }

    shift() {
        if (this.length === 0) return undefined; // Handle empty array case

        const firstItem = this.data[0]; // Store first item to return

        // Shift all items forward
        for (let i = 0; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }

        delete this.data[this.length - 1]; // Remove last item
        this.length--; // Decrease length

        return firstItem; // Return removed element
    }

    deleteByIndex(num) {

        const deletedItem = this.data[num];
        delete this.data[num];

        for (let index = 0; index < this.length; index++) {
            if(index >= num) {
                this.data[index] = this.data[index+1];
            }
        }
        delete this.data[this.length-1]
        this.length--;
        return deletedItem
    }
}

const myNewArray = new MyArray();
myNewArray.push("apple")
myNewArray.push("asdasd")
myNewArray.push("dddddd")
myNewArray.push("ffffffff")
//myNewArray.pop()
//myNewArray.shift()
console.log(myNewArray.data)
console.log(myNewArray.deleteByIndex(2))
console.log(myNewArray.data)