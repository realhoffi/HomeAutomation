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

Windows:

1.  cd 'C:\Program Files\MongoDB\Server\3.6\bin'
2.  .\mongod.exe --dbpath C:\Projects\HomeAutomation\mongo\database
3.  cd C:\Projects\HomeAutomation\build\
4.  nodemon.cmd app.js


    Step 1: cd 'C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe' --dbpath C:\Projects\HomeAutomation\mongo\database
    Step 2: .\mongo.exe homeautomation
    Step 2.1 .\mongo.exe 192.168.178.43:27017/homeautomation
    -- .\C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe --dbpath C:\Projects\HomeAutomation\mongo\database
    Step 3: rename database: db.adminCommand( { renameCollection: "homeautomation.test", to: "homeautomation.sensors" } )
