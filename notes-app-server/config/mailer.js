const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'eddelymyamina@gmail.com',
    pass: 'longueuramina', 
  },
});

module.exports = transporter;

