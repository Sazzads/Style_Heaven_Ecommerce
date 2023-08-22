const express = require('express')
const app = express();
const cors = require('cors')
const SSLCommerzPayment = require('sslcommerz-lts')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const port = process.env.PORT || 5000;



//middlewere
app.use(cors())
app.use(express.json())

const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: true, message: 'unauthorized access' });
    }
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: true, message: 'unauthorized access' });
        }
        req.decoded = decoded;
        next()
    })
}




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zbcvy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASS
const is_live = false //true for live, false for sandbox

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        /*---------------------------------------------
       --------------db collection ------------- 
       -----------------------------------------------*/
        const productCollection = client.db("styleHeaven").collection("product")
        const cartCollection = client.db("styleHeaven").collection("carts")
        const usersCollection = client.db("styleHeaven").collection("users")
        const paymentCollection = client.db("styleHeaven").collection("payments")



        /*---------------------------------------------
        --------------verify jwt related api------------- 
        -----------------------------------------------*/
        // jwt api 
        app.post('/jwt', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1hr' })
            res.send({ token })
        })

        //verify admin
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email }
            const user = await usersCollection.findOne(query)
            if (user?.role !== 'admin') {
                return res.status(403).send({ error: true, message: 'forbidden message' })
            }
            next()

        }
        //verify seller
        const verifySeller = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email }
            const user = await usersCollection.findOne(query)
            if (user?.role !== 'seller') {
                return res.status(403).send({ error: true, message: 'forbidden message' })
            }
            next()

        }
        //verify seller
        const verifyAdminSeller = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email }
            const user = await usersCollection.findOne(query)
            if (user?.role !== 'admin' && user?.role !== 'seller') {
                return res.status(403).send({ error: true, message: 'forbidden message' })
            }
            next()

        }

        /*---------------------------------------------
        --------------product related api------------- 
        -----------------------------------------------*/
        //get product
        app.get('/products', async (req, res) => {
            const result = await productCollection.find().toArray()
            res.send(result)
        })

        //post product
        app.post('/product', verifyJWT, verifySeller, async (req, res) => {
            const newItem = req.body;
            const result = await productCollection.insertOne(newItem)
            res.send(result)

        })

        //search product by email
        app.get('/products/:email', async (req, res) => {
            const email = req.query.email;
            // console.log(req.params.email);
            const result = await productCollection.find({ email: req.params.email }).toArray()
            res.send(result)
        })
        //search product by id
        app.get('/product/:id', async (req, res) => {
            const id = (req.params.id);
            const result = await productCollection.find({ _id: new ObjectId(id) }).toArray()
            res.send(result)
            console.log(result);
        })
        //update product
        app.put('/product/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const saveProduct = req.body;
            const product = {
                $set: {
                    name: saveProduct.name,
                    category: saveProduct.category,
                    details: saveProduct.details,
                    photo: saveProduct.photoUrl,
                    price: saveProduct.price,
                    email: saveProduct.email,
                    quantity: saveProduct.quantity,
                }
            }
            const result = await productCollection.updateOne(filter, product, options);
            res.send(result)

        })

        //dellete products
        app.delete('/products/:id', verifyJWT, verifyAdminSeller, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await productCollection.deleteOne(query)
            res.send(result)
        })
        //approved or reject product
        app.put("/productstat/:id", async (req, res) => {
            const id = req.params.id;
            const newStatus = req.body.status;

            const filter = { _id: new ObjectId(id) };
            const updatedStatus = {
                $set: {
                    status: newStatus // Update the role field with the new role value
                }
            };
            const options = { upsert: true };
            const result = await productCollection.updateOne(filter, updatedStatus, options);
            res.send(result)
        });
        //feedback product
        app.put('/productfeedback/:id', async (req, res) => {
            const id = req.params.id;
            const feedback = req.body;
            // console.log(id, feedback);
            const filter = { _id: new ObjectId(id) }
            options = { upsert: true }
            const updatedFeedback = {
                $set: {
                    feedback: feedback.feedback
                }
            }
            const result = await productCollection.updateOne(filter, updatedFeedback, options)
            res.send(result)
        })
        //get approve products 
        app.get(('/productsapproved/:text'), async (req, res) => {
            // console.log(req.params.text);
            if (req.params.text == 'approved') {
                const result = await productCollection.find({ status: req.params.text }).toArray()
                return res.send(result)
            }
        })

        //get tops product
        app.get(('/tops/:text'), async (req, res) => {
            // console.log(req.params.text);
            if (req.params.text == 'tops') {
                const result = await productCollection.find({ category: req.params.text }).toArray()
                return res.send(result)
            }
        })


        /*------------------------------------------------
         ---------cart collection related api------------- 
         -----------------------------------------------*/
        // add cart
        app.post('/carts', async (req, res) => {
            const item = req.body;
            // console.log(item);
            const result = await cartCollection.insertOne(item)
            res.send(result);
        })
        //newss test
        app.put("/updatecart/:id", async (req, res) => {
            const id = req.params.id;
            const newquantity = req.body.productquantity;

            const filter = { _id: new ObjectId(id) };
            const updatedquantity = {
                $set: {
                    cartquantity: parseInt(newquantity), // Update the role field with the new role value

                }
            };
            const options = { upsert: true };
            const result = await cartCollection.updateOne(filter, updatedquantity, options);
            res.send(result)
        });



        //get cart data
        app.get('/carts', verifyJWT, async (req, res) => {
            const email = req.query.email;
            if (!email) {
                res.send([])
            }
            const decodedEmail = req.decoded.email;
            if (email !== decodedEmail) {
                return res.status(403).send({ error: true, message: 'forbidden access' })
            }
            const query = { email: email }
            const result = await cartCollection.find(query).toArray();
            res.send(result)

        })
        //delete cart 
        app.delete("/carts/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await cartCollection.deleteOne(query)
            res.send(result)
        })


        /* --------------------------------------------
        ------------payment related api----------------
        ---------------------------------------------- */
        app.post('/create-payment-intent', verifyJWT, async (req, res) => {
            const { price } = req.body;
            const amount = parseInt(price * 100);
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                payment_method_types: ['card']
            });

            res.send({
                clientSecret: paymentIntent.client_secret
            })
        })

        //payment api
        app.post('/payments', async (req, res) => {
            const payment = req.body;
            payment.createAt = new Date()
            const insertResult = await paymentCollection.insertOne(payment)

            const query = { _id: { $in: payment.CartItems.map(id => new ObjectId(id)) } }
            const deleteResult = await cartCollection.deleteMany(query)

            // 

            res.send({ insertResult, deleteResult })
        })

        //payment update
        app.put('/paymentsprductupdate/:id', async (req, res) => {
            const id = req.params.id;
            const soldproduct = req.body.newSoldProduct; // Read the newSoldProduct from the request body
            const filter = { _id: new ObjectId(id) };

            try {
                const result = await productCollection.updateOne(filter, { $inc: { soldproduct: soldproduct } });
                res.send(result);
            } catch (error) {
                console.error('Error updating soldproduct:', error);
                res.status(500).send('Error updating soldproduct');
            }
        });
        //payment history
        app.get("/paymenthistory/:email", async (req, res) => {
            const email = req.query.email;
            // console.log(req.params.email);
            const result = await paymentCollection.find({ email: req.params.email }).toArray()
            res.send(result)
        })

        //ssl ecommerze
        //generate unique id
        const tran_id = new ObjectId().toString()
        //post
        app.post("/order", async (req, res) => {
            const order = req.body
            // console.log(order);
            const data = {
                total_amount: order.price,
                currency: 'BDT',
                tran_id: tran_id, // use unique tran_id for each api call
                success_url: `http://localhost:5000/payment/success/${tran_id}`,
                fail_url: 'http://localhost:3030/fail',
                cancel_url: 'http://localhost:3030/cancel',
                ipn_url: 'http://localhost:3030/ipn',
                shipping_method: 'Courier',
                product_name: "name",
                product_category: 'Electronic',
                product_profile: 'general',
                cus_name: 'Customer Name',
                cus_email: order.email,
                cus_add1: 'Dhaka',
                cus_add2: 'Dhaka',
                cus_city: 'Dhaka',
                cus_state: 'Dhaka',
                cus_postcode: '1000',
                cus_country: 'Bangladesh',
                cus_phone: '01711111111',
                cus_fax: '01711111111',
                ship_name: 'Customer Name',
                ship_add1: 'Dhaka',
                ship_add2: 'Dhaka',
                ship_city: 'Dhaka',
                ship_state: 'Dhaka',
                ship_postcode: 1000,
                ship_country: 'Bangladesh',
            };
            // console.log(data);
            const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
            sslcz.init(data).then(apiResponse => {
                // Redirect the user to payment gateway
                let GatewayPageURL = apiResponse.GatewayPageURL
                res.send({ url: GatewayPageURL })
                const finalOrder = {
                    email: order.email,
                    trxID: tran_id,
                    price: order.price,
                    date: order.date,
                    quantity: order.quantity,
                    names: order.names,
                    CartItems: order.CartItems,
                    productItems: order.productItems,
                    delevaryStatus: order.delevaryStatus,
                    paidStatus: false,
                }
                // const result = paymentCollection.insertOne(finalOrder)
               

                console.log('Redirecting to: ', GatewayPageURL)
            });
            app.post("/payment/success/:tranId", async (req, res) => {
                const tranId = req.params.tranId
                // console.log(tranId);
                const result = await paymentCollection.updateOne({ trxID: req.params.tranId }, {

                    $set: {
                        paidStatus: true
                    },
                })
                if (result.modifiedCount > 0) {

                    res.redirect(`http://localhost:5173/dashboard/paymenthistory`,)
                }
                const query = { _id: { $in: order.CartItems.map(id => new ObjectId(id)) } }
                const deleteResult = cartCollection.deleteMany(query)
                // res.redirect({ deleteResult })
                
            })
        })

        //get all payment history
        app.get("/allpaymenthistory", async (req, res) => {
            const result = await paymentCollection.find().toArray()
            res.send(result)
        })

        /*----------------------------------------------
        ----------users collection related api-------
        ---------------------------------------------*/
        //post users
        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user.email }
            const existingUser = await usersCollection.findOne(query)
            if (existingUser) {
                return res.send({ message: 'user already exists' })
            }
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })
        //get users
        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray()
            res.send(result)
        })
        //edit users
        app.put("/users/:id", async (req, res) => {
            const id = req.params.id;
            const newRole = req.body.role;

            const filter = { _id: new ObjectId(id) };
            const updatedRole = {
                $set: {
                    role: newRole // Update the role field with the new role value
                }
            };
            const options = { upsert: true };
            const result = await usersCollection.updateOne(filter, updatedRole, options);
            res.send(result)
        });

        /*---------------------------------------------
         --------------chacking related api------------- 
         -----------------------------------------------*/
        //check admin
        app.get('/users/admin/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;
            if (req.decoded.email !== email) {
                res.send({ admin: false })
            }
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            const result = { admin: user?.role === 'admin' }
            res.send(result)
        })

        //check seller
        app.get('/users/seller/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;
            if (req.decoded.email !== email) {
                res.send({ seller: false })
            }
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            const result = { seller: user?.role === 'seller' }
            res.send(result)
        })
        //check customer
        app.get('/users/customer/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;
            if (req.decoded.email !== email) {
                res.send({ customer: false })
            }
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            const result = { customer: user?.role === 'customer' }
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
    res.send('server is running')
})
app.listen(port, () => {
    console.log("server is running on port", port);
})