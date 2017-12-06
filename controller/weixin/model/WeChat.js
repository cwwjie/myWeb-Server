const path = require('path');
const mongodb = require(path.relative(__dirname, './model/mongodb'));

const WeChatSchema = new mongodb.Schema({
    jsapi_ticket: String,
    access_token: String,
    expires_timestamp: Number
}, { versionKey: false });

const WeChat = mongodb.connection.model('WeChat', WeChatSchema);

module.exports = WeChat;

// new WeChat({
//     jsapi_ticket: "bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA",
//     access_token: "06Jz31pCs9zKP-9PELdlpAvQjEEFhOg-E-eJP2jfFf5pJdypD1hohIFxiwUsdts302SVQVlGWHM02uPpWY4eFpUvuMRe_db4KG9gOrPkz1gKXUhAJANAX",
//     expires_timestamp: 1512411774000
// })
// .save()
// .then(
//     (val) => console.log(val),
//     (error) => console.log(error)
// )


