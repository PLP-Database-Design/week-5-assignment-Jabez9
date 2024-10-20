const express = require('express');
const app = express();
const mysql = require ('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

const db = mysql.createConnection(
    {
        host:process.env.DB_HOST,
        user:process.env.DB_USERNAME,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME
    }
);

//checking the connection
db.connect((err) => {
     if (err) return console.log("Error connecting to the database",err);
     console.log("Success connecting to the database as ID: ",db.threadId)

     //question 1
     app.set('view engine', 'ejs');
     app.set('views', __dirname + '/views');

     app.get('/patients', (req,res) => {
        db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, results) => {
            if (err){
                console.log(err);
                res.statusMessage(500).send('Error getting data');
            }
            else{
                res.render('patients', {results: results});
            }
        });
     });

     //question 2
     app.get('/providers', (req,res) => {
        db.query('SELECT * FROM providers', (err,rst) => {
            if (err){
                console.log(err);
                res.statusMessage(500).send("Error retreiving the providers' data");
            }
            else {
                res.render('providers', {rst: rst});
            }
        });
     });

     //question 3
     app.get('/sortpatient', (req,res) => {
        db.query('SELECT * FROM patients ORDER BY first_name',(err,sortedpatient) => {
        if(err){
            console.log(err);
            res.statusMessage(500).send("Could not sort the patients by name");
        }
        else{
            res.render('sortpatient', {sortedpatient:sortedpatient});
        }
        });
     });

    //  question 4
    app.get("/sortprovider", (req,res) => {
        db.query('SELECT * FROM providers ORDER BY provider_specialty', (err,providerspecialty) => {
            if(err){
                console.log(err);
                res.statusMessage(500).send("did not load the provider data in the sorted manner whatsoever");
            }
            else{
                res.render('sortprovider', {providerspecialty:providerspecialty});
            }
        });
    });

   



const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    console.log('Sending message to the Browser');
    app.get('/',(req,res) => {
        res.send('Server is up and running.')
    })

});
});
