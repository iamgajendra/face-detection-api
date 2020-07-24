const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');

const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'gajju',
    database : 'smartbrain'
  }
});

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=> {res.send(database.users)})

app.post('/signin' ,(req, res)=> {signin.handleSignin(req,res,db,bcrypt)} )

app.post('/register' ,(req, res) => {register.handleRegister(req,res, db, bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req,res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req,res) => {image.handleApiCall(req, res)})
/*
bcrypt.hash("bacon", null, null, function(err, hash) {
	// Store hshs in your password DB.
})

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err,res){
	// res==true
})
bcrypt.compare("veggies", hash, function(err,res){
	// res ==  false
})*/


app.listen(3001, ()=> {
	console.log('app is running on port 3001');
})


/*
/--> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user 
/image --> PUT --> user

*/