const path = require('path')
const express = require('express')
const jwt = require('jsonwebtoken')
const { MongoClient } = require('mongodb')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const bcrypt = require('bcrypt')
const multer = require('multer')
require('dotenv').config()
const uri = process.env.URI
const PORT = process.env.PORT

const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}))
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) });
} else {
    app.get('/', (req, res) => res.send('Server is ready'));
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        // console.log(file);
        cb(null, Date.now() + "--" + file.originalname);
    }
})

const upload = multer({
    storage: storage,
});

app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body

    const generatedUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const existingUser = await users.findOne({ email })

        if (existingUser) {
            return res.status(409).send('User already exists. Please login')
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword,
        }

        const insertionResult = await users.insertOne(data);

        if (insertionResult.insertedCount !== 1) {
            return res.status(500).json({ message: 'User registration failed. Please try again later.' });
        }

        const payload = { userId: generatedUserId, email: sanitizedEmail }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 60 * 24,
        })

        res.status(201).json({ token, userID: generatedUserId, email: sanitizedEmail })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'An error occurred. Please try again later.' });
    } finally {
        await client.close();
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body

    const client = new MongoClient(uri)

    try {
        await client.connect()

        const database = client.db('app-data')
        const users = database.collection('users')

        const user = await users.findOne({ email })

        if (user) {
            const correctPassword = await bcrypt.compare(password, user.hashed_password);

            if (correctPassword) {
                const payload = { userId: user.user_id, email: user.email };
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: 60 * 24 // Token expires in 24 hours
                });
                res.status(201).json({ token, userId: user.user_id, email: user.email });
            } else {
                res.status(401).json({ message: "Invalid password" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "An error occurred. Please try again later." });
    } finally {
        await client.close();
    }
})

app.post('/logout', async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(201).json({ message: 'User logged out' })
})

app.put('/query', upload.single('file'), async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body
    // console.log(req.file)
    // console.log(formData)
    try {
        await client.connect()
        const database = client.db('app-data')
        const quotes = database.collection('quote-requests')
        const data = {
            user_id: formData.user_id,
            name: formData.full_name,
            type: formData.type,
            date: formData.date,
            pages: formData.pages,
            topic: formData.topic,
            details: formData.details,
            files: req.file,
            email: formData.email,
        }
        // console.log(data)
        const insertedUser = await quotes.insertOne(data)
        res.send(insertedUser)
    } finally {
        await client.close()
    }
})

app.listen(PORT, () => { console.log(`server running on ${PORT}`) })