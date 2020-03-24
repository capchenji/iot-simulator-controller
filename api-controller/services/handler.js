'use strict';
var mysql = require('mysql');


module.exports.handler= function (event, context, callback) {
  
  let body = JSON.parse(event.body)
  // console.log(body)
  // console.log(body.id)
  // console.log(body.status)

  // console.log(event.header)
  
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
    var checkid = body.id
    var checkstatus = body.status
    var querysql = `UPDATE device_status SET devicestatus = ${checkstatus} WHERE sensorid=${checkid}`
    console.log(querysql)
    connection.query(querysql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      connection.end();
    });
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Sensor status has been updated',
    }, null, 2),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
