const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
    id:4
}

let token = jwt.sign(data, 'some123');
console.log(token);

var decoded = jwt.verify(token, 'some123');
console.log(decoded);

// let msg = "I am Nikhil";
// let result = SHA256(msg).toString();

// console.log('msg',msg);
// console.log('result',result);

// var data = {
//     id: 4
// }

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash){
//     console.log('data was not changed');
// } else{
//     console.log('data was changed');
// }

