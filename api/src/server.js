const PORT = require( './constants').PORT;
const DATABASE_URL = require( './constants').DATABASE_URL;

const app = require( './app').app;
const initMongose = require( './app').initMongose;

initMongose(DATABASE_URL).then(()=>{

    app.listen(PORT, () => {
        console.log("Listening on port " + PORT);
    });

})
