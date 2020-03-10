import app from "../../app";
import {WELCOME_MESSAGE} from "../../constants";
const supertest = require('supertest')
const request = supertest(app)
import mongoose, {MongooseDocument} from 'mongoose';
import {Building} from "../../model/building";
import {Enclosure} from "../../model/enclosure";

describe('Enclosures', () => {

    describe('delete building', ()=>{

        let buildingId:string;

        beforeEach(async ()=>{

            await mongoose.connect('mongodb://mongo/jest', { useNewUrlParser: true });

            const building = new Building({
                'name':'Südamerikahaus'
            });

            await building.save();

            buildingId = building._id;

            console.log(building);

            const halsbandpekaris = new Enclosure({
                name:'Halsbandpekaris',
                building:buildingId
            });

            await halsbandpekaris.save();

            console.log(halsbandpekaris.id)

            buildingId = halsbandpekaris.id;

        });


        test('delete with not existing id', async (done)=>{


            const fromDb = Enclosure.findOne({'_id':buildingId}).populate('building').exec(function (err, enclosure) {
                if (err) return console.log(err);


                console.log(enclosure)
                done();

            })




        });

    });

})
