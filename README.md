# Program Purpose

This program is to run iot simulator and controller API. The overall diagram and DB schema are given here:

IoT generator and controller overview:
![DB schema](/images/overview.png)

DB schema:
![DB schema](/images/DB-schema.png)



## Generator

### Usage

1. Run `npm i` command in root folder
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

If you want to determine number of iot sensors, go to `package.json` and update number:
```
"start": "ts-node src/index.ts --number=3"
```

Go to your database and check whether data is loaded to it.


## Controller

### Usage

We are using serverless framework to deploy control API to AWS environments. For more details, please visit [here](https://serverless.com/blog/node-rest-api-with-serverless-lambda-and-dynamodb/)

1. Go to `./api-controller/` folder
2. Go to `./config` folder and copy `sampleconfig.yml` to `{env name + config}.yml`, fill in corresponding DB information.
3. Check `serverless.yml` and make sure `env name` is same as step 2.
4. Run `npm i` command
5. Config your AWS environment.
6. Run `serverless deploy` command

When the above steps are finished, you should be able to see the following API URL:

Serverless Framework deployment output
![DB schema](/images/deploy-output.png)


## How to test APIs
Go to postman and paste API returned from serverless framework. 

Go to body and use JSON format query like this:
```
{
	"id":1,
	"status": true,
	"auth": xx
}
```
In the sample code, there is one simple auth process. If `auth` is not equal to 1024, it will return 401, please set `auth` to 1024 for normal operation.
Then you should be able to set device status to true for sensor id 1.

I'm using Grafana to test whether data has changed. 
You can use Grafana docker for your local machine:
![DB schema](/images/grafana.png)