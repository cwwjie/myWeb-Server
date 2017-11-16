const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : '119.29.140.46',
  port     : '2333',
  user     : 'Rejiejay',
  password : '~!Qq1938167@#0o',
  database : 'myweb',
  charset  : 'utf8'
});

module.exports = (data) => (new Promise((resolve, reject) => {
  const sql = `INSERT INTO dynamics(title, content, date, upvote, thoughtsCount) VALUES${
    data.map((val, key) => {
      if (key === ( data.length -1 )) {
        return ` ("${val.title}", "${val.content}", ${val.date}, ${val.upvote}, ${val.thoughtsCount});`
      } else {
        return ` ("${val.title}", "${val.content}", ${val.date}, ${val.upvote}, ${val.thoughtsCount}),`
      }
    }).join('')
  }`;

  connection.connect();
  console.log('MySQL数据库 连接成功');

  connection.query(sql, (error, results) => {
    if (error) {
      console.log('MySQL数据库 插入失败');
      console.log(error)
      connection.end();
      reject(error);
      return false;
    };

    connection.end();
    resolve(results);
  });

}));
