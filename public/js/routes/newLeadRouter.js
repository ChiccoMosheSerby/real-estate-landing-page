const express = require("express");
const router = express.Router();
const leadsCollection = require('../db/schema').leadsSchema;


router.post('/', (req, res) => {
    let newLeadObj = req.body;
    if (newLeadObj.email &&
        newLeadObj.name &&
        newLeadObj.phone) {

        //Add lead to DB
        leadDoc = new leadsCollection(newLeadObj);
        leadDoc.save().then(doc => {
            console.log('added: ', doc);
           
        })

        const nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            type: "SMTP",
            host: "smtp.gmail.com",
            secure: true,
            auth: {
                user: 'chiccomosheserby@gmail.com',
                pass: 'dagvwlhmgzmhcgvw'
            }
        });

        let mailOptions = {
            from: 'some@tst.com',
            to: newLeadObj.email,
            subject: 'We recived your message  - thanks from DEMO Real Estate' ,
            text: 'Hi '+newLeadObj.name +'\nDEMO Real Estate got your message . \nthanks !' +  '\nWe will contact you very soon!'
        };
        
        let mailOptionsOwner = {
            from: 'some@tst.com',
            to: 'chiccomoshe@gmail.com',
            subject: 'new lead! - Chicco - DEMO Real Estate ' ,
            text:  "name : " + newLeadObj.name +"\nemail : " + newLeadObj.email + " \nphone : " + newLeadObj.phone + " \nmessage  : " +'\n'+ newLeadObj.message
        };

        // let mailOptionsAlon = {
        //     from: 'some@tst.com',
        //     to: 'alon@dgtl7.net',
        //     subject: ' Hi Alon : new lead! - (Chicco) - DEMO Real Estate ' ,
        //     text:  "name : " + newLeadObj.name +"\nemail : " + newLeadObj.email + " \nphone : " + newLeadObj.phone + " \nmessage  : " +'\n'+ newLeadObj.message
        // };


        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);

            } else {

                console.log('Email sent');
            }
        });
        transporter.sendMail(mailOptionsOwner, function (error, info) {
            if (error) {
                console.log(error);

            } else {

                console.log('mailOptionsOwner - Email sent');
            }
        });

        // transporter.sendMail(mailOptionsAlon, function (error, info) {
        //     if (error) {
        //         console.log(error);

        //     } else {

        //         console.log('mailOptionsOwner - Email sent');
        //     }
        // });

        
    
        //--------------- END - email ------------------//

    }


})


module.exports = router;
