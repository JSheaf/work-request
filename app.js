const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path'); 
const app = express();

// View project setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get ('/', (req, res) => {
    res.render('index');
});
app.get ('/contact', (req, res) => {
    res.render('contact');
});
app.get ('/request-type', (req, res) => {
    res.render('request-type', {title: 'Request type | ', header_application_title: 'Interaction design work request'});
});
app.get ('/project-info', (req, res) => {
    res.render('project-info', {title: 'Project information | ', header_application_title: 'Interaction design work request'});
});
app.get ('/your-details', (req, res) => {
    res.render('your-details', {title: 'Your details | ', header_application_title: 'Interaction design work request'});
});
app.get ('/check-your-answers', (req, res) => {
    res.render('check-your-answers', {title: 'Check your answers | ', header_application_title: 'Interaction design work request'});
});
app.get ('/success', (req, res) => {
    res.render('success', {title: 'Success | ', header_application_title: 'Interaction design work request'});
});

app.post ('/success', (req, res) => {
    const output = `
        <style>
            h1 {
                font-weight: 500;
                color: #097567;
                margin-top: 1.25em;
                margin-bottom: 0.25em;
                font-size: 40px;
                line-height: 48px;
                letter-spacing: -0.3px;
                margin-top: 1em;
                margin-bottom: 0.2em;
            }
            .lede {
                font-size: 24px;
                line-height: 36px;
                letter-spacing: 0.3px;
                font-weight: normal;
            }
            .list-sml {
                width: 100%;
                color: #0B0C0C;
                margin-top: 0;
                margin-bottom: 40px;
                padding-left: 0;
            }
            .list-title-row {
                height: 36px;
                border-bottom: 2px solid #BFC1C3;
                box-sizing: border-box;
                display: flex;
            }
            .list-title {
                font-weight: bold;
                font-size: 20px;
                flex: 1 1 50%;
            }
            .list-row {
                border-bottom: 1px solid #BFC1C3;
                font-size: 16px;
                padding: 6px;
                padding-left: 12px;
                display: flex;
            }
            .list-property {
                min-height: 16px;
                flex: 1 1 50%;
            }
            .list-data {
                font-weight: bold;
                min-height: 16px;
                flex: 1 1 50%;
            }
        </style>

        <h1>Interaction design work request</h1>

        <p class="lede">Request by ${req.body.name} from ${req.body.projectname}</p>
        <p class="lede">Reference <strong>${req.body.reference}</strong></p>

        <ul class="list-sml">
            <li class="list-title-row">
                <span class="list-title">Request details</span>
                <span class="list-change"></span>
            </li>
            <li class="list-row">
                <span class="list-property">Request type</span>
                <span class="list-data">${req.body.requesttype}</span>
            </li>
            <li class="list-row">
                <span class="list-property">Project name</span>
                <span class="list-data">${req.body.projectname}</span>
            </li>
            <li class="list-row">
                <span class="list-property">Project phase</span>
                <span class="list-data">${req.body.projectphase}</span>
            </li>
            <li class="list-row">
                <span class="list-property">Next milestone</span>
                <span class="list-data">${req.body.nextmilestone}</span>
            </li>
            <li class="list-row">
                <span class="list-property">User testing</span>
                <span class="list-data">${req.body.nextmilestone2}</span>
            </li>
            <li class="list-row">
                <span class="list-property">Testing date</span>
                <span class="list-data">${req.body.testingdate}</span>
            </li>
            <li class="list-row">
                <span class="list-property">Resource duration</span>
                <span class="list-data">${req.body.resourceduration}</span>
            </li>
            <li class="list-row">
                <span class="list-property">Meeting planned</span>
                <span class="list-data">${req.body.meetingplanned}</span>
            </li>
            <li class="list-row">
                <span class="list-property">Meeting date</span>
                <span class="list-data">${req.body.meetingdate}</span>
            </li>
            <li class="list-row">
                <span class="list-property">Meeting location</span>
                <span class="list-data">${req.body.meetinglocation}</span>
            </li>
            <li class="list-row">
                <span class="list-property">Requirements</span>
                <span class="list-data">${req.body.requirements}</span>
            </li>
        </ul>

        <ul class="list-sml">
            <li class="list-title-row">
                <span class="list-title">Contact details</span>
                <span class="list-change"></span>
            </li>
            <li class="list-row">
                <span class="list-property">Name</span>
                <span class="list-data">${req.body.name}</span>
            </li>
            <li class="list-row">
                <span class="list-property">Role</span>
                <span class="list-data">${req.body.role}</span>
            </li>
            <li class="list-row">
                <span class="list-property">Email</span>
                <span class="list-data">${req.body.email}</span>
            </li>
            <li class="list-row">
                <span class="list-property">Phone</span>
                <span class="list-data">${req.body.phone}</span>
            </li>
        </ul>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'stantondevicelab@gmail.com', // generated ethereal user
            pass: 'DrBetsworth1955'  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    var toCc = req.body.email;
    var ref = 'FAO David Hannify, ref: ' + req.body.reference;
    let mailOptions = {
        from: '"Interaction design work request" <stantondevicelab@gmail.com>', // sender address
        to: 'wayne.esmonde@digital.dvla.gov.uk', // list of receivers
        cc:  toCc,
        subject: ref, // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        res.render('success', {msg:'We have sent you a confirmation email.'});
        // res.render('contact', {msg:'Email has been sent'});
    });

})

app.listen(3000, () => console.log('Server started...'));