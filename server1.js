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

     app.get('/data', (reg,res) => {
        db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, results) => {
            if (err){
                console.log(err);
                res.statusMessage(500).send('Error getting data');
            }
            else{
                res.render('data', {results: results});
            }
        });
     });


     app.set('view engine', 'ejs');
     app.set('views1', __dirname + '/views1');
     app.get('/data1', (reg,res) => {
        db.query('SELECT first_name,last_name, provider_specialty FROM providers', (err,providerdata) => {
            if (err){
                console.log(err);
                res.statusMessage(500).send('Error retreiving data');
            }
            else {
                res.render('data1', {providerdata: providerdata});
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
