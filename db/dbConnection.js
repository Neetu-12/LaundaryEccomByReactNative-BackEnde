const mongoose = require('mongoose')

mongoose.connect(process.env.mongooseMongodbConnection).then(() => {
   console.log('Connected db'); 
}).catch((err) => {
    console.log("Not connected db");
});