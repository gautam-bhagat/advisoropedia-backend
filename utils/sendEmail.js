const nodemailer = require('nodemailer')
const {EMAIL_ID,EMAIL_PASS} = require('./constants')
const sendEmail = async (receipentEmail,emailSubject,emailBody) =>{

    console.log(" Email : "+receipentEmail)
    console.log(" Subject : "+emailSubject)
    console.log(" Body : "+emailBody)
    
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port:465,
            host:'smtp.gmail.com',
            secure: true, // true for 465, false for other ports
            secureConnection: false,
            auth: {
                user: EMAIL_ID, // generated ethereal user
                pass: EMAIL_PASS, // generated ethereal password
               
            },
            tls:{
                rejectUnAuthorized:true
            }
        })
        // console.log(transporter.options.host)
        transporter.verify((err, success) => {
            if (err) console.error(err);
            console.log('Your config is correct');
        });

        var info = await transporter.sendMail({
            from: EMAIL_ID, // sender address
            to: receipentEmail, // list of receivers
            subject: emailSubject, // Subject line
            text:  emailBody
    });

        // console.log();
        // res.status(200).send("Email sent Sucessfully")
    } catch (error) {
        // res.status(500).send("Email not sent Sucessfully");
        console.log(error);
    }

}

module.exports = sendEmail