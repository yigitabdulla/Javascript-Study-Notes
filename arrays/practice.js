const users = [
    { id: 1, name: "Alice", age: 25, count: 1 },
    { id: 2, name: "Bob", age: 30, count: 1 },
    { id: 3, name: "Charlie", age: 22, count: 1 },
    { id: 4, name: "Tom", age: 17, count: 1 }
];

const newUsers = users.map(user => ({
    ...user, // Spread the existing user properties
    adult: user.age < 18 ? false : true
}));



//console.log(newUsers.findIndex(user => user.id == 4))

function filterObject(id, array) {
    return array.filter(value => value.id != id)
}

//console.log(filterObject(1, newUsers))

function addObject(id,value=1,array) {
    const index = array.findIndex(user => user.id == id)
    if(index>0) {
        array[index].count += value
    } else return console.log('Not found')
}

addObject(1,5,newUsers)

