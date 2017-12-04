const path = require('path');
const mongodb = require(path.relative(__dirname, './model/mongodb'));

let WeChat_Access_Token = new mongodb.Schema({
    access_token: String,
    expires_timestamp: Number
}, { versionKey: false });

module.exports = mongodb.connection.model('WeChat_Access_Token', WeChat_Access_Token);

// new AccessToken({
//     access_token: "06Jz31pCs9zKP-9PELdlpAvQjEEFhOg-E-eJP2jfFf5pJdypD1hohIFxiwUsdts302SVQVlGWHM02uPpWY4eFpUvuMRe_db4KG9gOrPkz1gKXUhAJANAX",
//     expires_timestamp: 1512411774000
// })
// .save()
// .then(
//     (val) => console.log(val),
//     (error) => console.log(error)
// )
