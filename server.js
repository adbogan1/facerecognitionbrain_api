const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()

        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'banana',
            entries: 0,
            joined: new Date()

        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }

    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    bcrypt.compare("apples", '$2b$10$pVmiwLZ/qJWXSKZmmvd/heZCS6XdQkta2NKdRwU1qsA5jDqIwq0k.', function(err, result) {
        console.log('first guess', result)
    });
    bcrypt.compare("veggies", '$2b$10$pVmiwLZ/qJWXSKZmmvd/heZCS6XdQkta2NKdRwU1qsA5jDqIwq0k.', function(err, result) {
        console.log('second guess', result)
    });

    if(req.body.email === database.users[0].email && 
       req.body.password === database.users[0].password)
    {
        res.json("success");
    } else {
        res.status(400).json("error logging in");
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body; 
    bcrypt.hash(password, saltRounds, function(err, hash) {
        console.log(hash);
    });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            return res.json(user);
        } 
    })
    if(!found) {
        res.status(404).json('user not found');
    }
})

app.post('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        } 
    })
    if(!found) {
        res.status(404).json('user not found');
    }
})

// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//     // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
//     // result == false
// });

app.listen(3000, () => {
    console.log('app is working');
})