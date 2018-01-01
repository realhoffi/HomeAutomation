# HomeAutomation

run npm install
run webpack
navigate to folder
run nodemon -/build/app.js

Goog Links:

https://github.com/Microsoft/TypeScript-Node-Starter/blob/master/src/app.ts
https://html5hive.org/how-to-create-rest-api-with-node-js-and-express/

https://closebrace.com/tutorials/2017-03-02/the-dead-simple-step-by-step-guide-for-front-end-developers-to-getting-up-and-running-with-nodejs-express-and-mongodb

https://docs.mongodb.com/compass/current/connect/

Step 1: cd 'C:\Program Files\MongoDB\Server\3.6\bin'
Step 2: .\mongo.exe homeautomation
Step 3: rename database: db.adminCommand( { renameCollection: "homeautomation.test", to: "homeautomation.sensors" } )

db.getCollection('sensors').updateMany( {}, { $rename: { "insertTime": "timestamp" } } )
