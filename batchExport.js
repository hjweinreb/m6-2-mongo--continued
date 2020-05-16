/* 
const seats = {};
const row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
for (let r = 0; r < row.length; r++) {
    for (let s = 1; s < 13; s++) {
        seats[`${row[r]}-${s}`] = {
            price: 225,
            isBooked: false,
        };
    }

}
 */

const { MongoClient } = require('mongodb');
const assert = require('assert');

const batchExport = async () => {
    const uri = "mongodb+srv://dbAdmin:lizard882@cluster0-1tqzq.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


    let seatObject = {};

    const seats = {};
    const row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (let r = 0; r < row.length; r++) {
        for (let s = 1; s < 13; s++) {
            seats[`${row[r]}-${s}`] = {
                price: 225,
                isBooked: false,
            };
        }
    }

    // open the connection to the database server
    await client.connect();
    console.log('connected!');

    const db = client.db('exercises');

    const r = await db.collection('mongo2').insert(seats);
    assert.equal(seats.length, r.insertedCount);

    // close the connection to the database server
    await client.close();
    console.log('disconnected!');


}

batchExport();