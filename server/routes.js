const router = require('express').Router();
const { MongoClient } = require('mongodb');
const { getSeats } = require('./handlers');
// Code that is generating the seats.
// ----------------------------------
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
// ----------------------------------

router.get('/api/seat-availability', getSeats);


router.post('/api/book-seat', async (req, res) => {
  const uri = "mongodb+srv://dbAdmin:lizard882@cluster0-1tqzq.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log(req.body)

  const { email, fullName, seatId, creditCard, expiration } = req.body;

  updatedObject = {
    _id: seatId,
    isBooked: true,
    email: email,
    fullName: fullName


  }

  await client.connect();
  console.log('connected!');

  const db = client.db('exercises');

  let bookedSeat = await db.collection('mongo2').findOneAndReplace(
    { "_id": `${seatId}` },
    { "_id": `${seatId}`, "price": 225, "isBooked": true, "email": email, "fullName": fullName }
  )
  console.log(bookedSeat)

  await client.close();
  console.log('disconnected!');







  if (!creditCard || !expiration) {
    return res.status(400).json({
      status: 400,
      message: 'Please provide credit card information!',
    });
  }

  return res.status(200).json({
    status: 200,
    success: true,
  });
});

module.exports = router;
