var oracledb = require('oracledb');
// var dbConfig = require('./dbconfig.js');
let dbConnection = null;
 async function conn (){
return oracledb.getConnection(
  {
    user          : 'xdb',
    password      : 'xdb',
    connectString : 'localhost/XE'
  }, 
  // function(err, connection) {
  //   if (err) {
  //     console.error(err.message);
  //     return;
  //   }
  //   console.log('Connection was successful!');
  //   dbConnection = connection;
  //   connection.execute(query).then((res) =>{},(err) => {
  //     console.log(err);
  //   });
  //   // connection.close(
  //   //   function(err) {
  //   //     if (err) {
  //   //       console.error(err.message);
  //   //       return;
  //   //     }
  //   //   });
  )
  
}
conn();
module.exports = {'conn': conn,'xec':dbConnection};