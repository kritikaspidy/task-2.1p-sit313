const express = require('express')
const bodyParser = require('body-parser')
const mailgun = require('mailgun-js')
const path = require('path');

var api_key = '190212d79d9afd4a99494ec6974d0324-f0e50a42-5d46f0e9';
var domain = 'sandbox23de7e7b94004dffb835519562ee2e18.mailgun.org';

const mail = mailgun({ apiKey: api_key, domain: domain });


const application = express();
application.use(bodyParser.urlencoded({ extended: true }));

application.use(express.static(path.join(__dirname, 'public')));
application.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
});


application.post('/subscribe', (req, res) => {
    const Email = req.body.Email

    const to_say = {
        from: 'Kritika Garg <kritikagarg351@gmail.com>',
        to: Email,
        subject: "Welcome",
        text: "Welcome, Thanks to Subscribing you will get daily ipdates here."
    };

    mail.messages().send(to_say, (error,body) => {

        if(error) {
            console.log(error);
            return res.status(500).send('There was an error');
        }

        console.log(body);
        res.send(__dirname + '/index.html');
    });

});

application.listen(5500, () => {
    console.log("Server is running at port 8080")
})