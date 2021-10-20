// const md5 = require('md5');
//
// let password = 'secret';
// let md5Hash = md5(password);
// console.log('md5Hash.length', md5Hash.length);
// console.log('md5Hash', md5Hash);

/////////////////////////////////////////////////////////////////
const crypto = require('crypto');

let password = 'secret';
let hash = crypto.createHash('md5').update(password).digest('hex');
console.log('hash.length', hash.length);
console.log('hash', hash);

