const yargs = require('yargs')
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Iot} from "./entity/Iot";
import {DeviceStatus} from "./entity/Status";

var serialize = require('serialize-javascript');
//console.log(yargs.argv)
var iot_num = yargs.argv.number

/**
 * generate a random integer between min and max
 * @param {Number} min 
 * @param {Number} max
 * @return {Number} random generated integer 
 */
function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }


 /**
 * sleep function
 * @param {milliseconds} min
 */
 function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

createConnection().then(async connection => {

    console.log("Inserting new iot record into the database...");
    let i = 0
    let turn_on_count = 0
    while (true){
    // while (i<30){
        sleep(1000*1);
        const iotdump = [];
        for (let loopid=1;loopid<iot_num+1;loopid++){
            console.log(loopid)
            const iot = new Iot();
            iot.sensorid = loopid;
            var now = new Date();
            iot.Time = new Date(now.getTime() + now.getTimezoneOffset() * 60000)

            let statusRepository = connection.getRepository(DeviceStatus);
            let statusdata = await statusRepository.find({ sensorid: loopid });
            let jsontemp = JSON.parse(serialize(statusdata))
            let devicestatus = jsontemp[0]['devicestatus']

            if (devicestatus){
                iot.Value = randomInt(21,24);
            }
            else{
                iot.Value = randomInt(33,36);
            }
            iotdump.push(iot)
        }
        
        await connection.manager.save(iotdump);
        console.log("Saved a new iot with id: " + i);
        i = i+1
        turn_on_count = turn_on_count +1 
    }


}).catch(error => console.log(error));
