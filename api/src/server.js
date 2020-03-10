const PORT = require( './constants').PORT;

const app = require( './app');

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
