
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId, } = require('mongodb');
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ugs5uur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const servideCollection = client.db("CarDoctorDB").collection('service')

    // service related api
    app.get('/services',async(req,res)=>{
     const result = await servideCollection.find().toArray()
     res.send(result)
    })
    
    app.get('/services/:id',async(req,res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await servideCollection.findOne(query)
      res.send(result)
    })



    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('car and doctor comming soon')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})