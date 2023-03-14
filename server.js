const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const db = knex({
    client: 'pg',
    connection: {
      host : 'dpg-cg8b09vdvk4ljrhe5k0g-a',
      user : 'facerecognitionbrain_data_user',
      password : 'ZjRNZPuhvAmOndsuqjU7a43vTNCqY4Pa',
      database : 'facerecognitionbrain_data'
    }
});
const PORT = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send("successfully navigated to root route"); })

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt, saltRounds))

app.get('/profile/:id', profile.handleProfile(db))

app.put('/image', image.handleImage(db))

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(PORT, () => { console.log('app is working'); })