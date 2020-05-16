'use strict';

const { MongoClient } = require('mongodb');

const getSeats = async (req, res) => {
    const uri = "mongodb+srv://dbAdmin:lizard882@cluster0-1tqzq.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });



    await client.connect();
    console.log('connected!');

    const db = client.db('exercises');

    let seats = await db.collection('mongo2').find().toArray()

    let seatObject = {}

    seats.map(seat => {
        seatObject[seat._id] = seat
    })
    seats = seatObject

    res.json({ seats: seats, numOfRows: 8, seatsPerRow: 12 })


    await client.close();
    console.log('disconnected!');

    /*  return res.json({
         seats: seats,
         numOfRows: 8,
         seatsPerRow: 12,
     }) */

};




module.exports = { getSeats };
