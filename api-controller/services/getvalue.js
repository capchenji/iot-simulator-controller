'use strict';
var mysql = require('mysql');


module.exports.handler= function (event, context, callback) {
  
  let body = JSON.parse(event.body)
  
  //######################
  //CAUTION: 
  //NEED TO ADD REAL AUTHENTICATION METHOD HERE
  //######################

  if (body.auth!=1024){
    callback(null, {
      statusCode: '401',
      body: "Auth failed",
      headers: {
          "Access-Control-Allow-Origin": "*"
      }
    });
  }
  
  var connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT,
    database : process.env.RDS_DB_NAME
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    
    console.log('Connected to database.');
    var checktime = body.timestamp
    var querysql = `SELECT * FROM iot WHERE Time=${checktime}`
    console.log(querysql)
    connection.query(querysql, function (err, result, fields) {
      if (err) throw err;
      console.log(result.Value);
      let output = result.Value
      connection.end();
    });
  });
  
  callback(null, {
    statusCode: '200',
    body: "value is XXX",
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
