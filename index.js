const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// usertask
// RIi5X6EgOqWjkiQh
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@learning2023.svtmaib.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(express.json());
app.use(cors());

async function run() {
  try {
    await client.connect();
    const taskCollection = client.db("taskDB").collection("taskCollection");

    app.post("/task", async (req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task);
      res.send(result);
    });
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`
    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓    
    ┃       DATABASE CONNECTED 🎉     ┃        
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    `);
});
