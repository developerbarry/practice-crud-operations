const express = require('express');
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://ujjalchandra30:zuAGIstreltD4Lfn@cluster0.iam7h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("usersDB");
        const ourUsers = database.collection("our-users");

        app.get('/users', async (req, res) => {
            const cursor = ourUsers.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await ourUsers.findOne(query)
            res.send(result)
        })

        app.post('/users', async (req, res) => {
            console.log(req.body)
            const user = req.body;
            const result = await ourUsers.insertOne(user)
            res.send(result)
        
        })


        app.put(`/users/:id`, async (req, res) => {
            const id = req.params.id;
            const updated = req.body;
            console.log(id, updated)
        
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updated.name,
                    email: updated.email
                }
            };
            const result = await ourUsers.updateOne(filter, updateDoc, options);
            res.send(result)
        })


        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: new ObjectId(id) }
            const result = await ourUsers.deleteOne(query)
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("OUR CRUD OPERATION")
})


app.listen(port, () => {
    console.log(`You opended: ${port}`)
})