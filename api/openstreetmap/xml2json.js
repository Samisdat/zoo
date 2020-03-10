var parser = require('fast-xml-parser');
var fs = require('fs');

const xmlData = fs.readFileSync('./map.osm', {encoding:'utf8'});

try{
    var jsonObj = parser.parse(xmlData,{
        ignoreAttributes : false,
    });

    fs.writeFileSync('./map.json', JSON.stringify(jsonObj.osm, null, 4), {encoding: 'utf8'});
}catch(error){
    console.log(error.message)
}
