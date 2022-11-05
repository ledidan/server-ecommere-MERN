const nodemailer = require("nodemailer");

// VERIFY EMAIL

const Email = (options) => {
  let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

// SEND EMAIL
const EmailSender = ({ name, email, subject, message }) => {
  const options = {
    from: `🛍️ User from Dan's Store`,
    to: process.env.EMAIL_SENDER,
    subject: subject,
    html: `
        <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
        <div style="max-width: 700px; background-color: white; margin: 0 auto">
          <div style="width: 100%; background-color: #333; padding: 20px 0">
          <a href="${process.env.CLIENT_URL}"><img
              src="https://res.cloudinary.com/dfaejacdn/image/upload/v1667615733/Dan-Logo/logo_x77sj3.png"
              style="width: 100%; height: 70px; object-fit: contain"
            /></a>

          </div>
          <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
            <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
              Form Shoeshop Store
            </p>
            <div style="font-size: .8rem; margin: 0 30px">
              <p>FullName: <b>${name}</b></p>
              <p>Email: <b>${email}</b></p>
              <p>Subject: <b>${subject}</b></p>
              <p>Message: <i>${message}</i></p>
            </div>
          </div>
        </div>
      </div>
        `,
  };
  Email(options);
};

module.exports = EmailSender;
