const nodemailer = require("nodemailer");
const express = require("express");
require("dotenv").config(); 
const router = express.Router();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "anarish.com", // Replace with your SMTP host
  port: 587,            // Port 587 is commonly used for sending emails with STARTTLS
  secure: false,        // This should be false for port 587 (STARTTLS)
  auth: {
    user: process.env.EMAIL_USER,  // Set the email address in the .env file
    pass: process.env.EMAIL_PASS,  // Set the password in the .env file
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// const transporter = nodemailer.createTransport({
//   host: "anarish.com",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
//   pool: true, // Use connection pooling for better performance
//   maxConnections: 5, // Maximum number of concurrent connections
//   // connectionTimeout: 10000, // Increase timeout (in ms)
//   // greetingTimeout: 20000, // Increase greeting timeout (in ms)
// });

// Route to handle POST requests for sending emails
router.post("/", async (req, res) => {
  console.log("Request received");

  try {
    const data = req.body;

    // Define mail options
    const mailOptions1 = {
      from: {
        name: "Anarish",
        address: "mail@anarish.com",
      },
      to: data.email,
      subject: "Welcome to Anarish Innovation - We are excited to Connect!",
      html: `
        Hi ${data.name} <br/>
        Welcome to Our Platform! We're thrilled to have the opportunity to work with you! <br/>
        We have received your inquiry and one of our team members will get in touch with you soon to discuss your needs in more detail.
        <br/><br/>
        Warm Regards,<br/> Team Anarish
      `,
    };

    const mailOptions2 = {
      from: {
        name: "Anarish",
        address: "mail@anarish.com",
      },
      to: "marketing@anarish.com",
      cc: "charu.maheshwari@anarish.com",
      subject: "New Query from Website",
      html: `
        Following user has tried to contact Anarish on ${data.date} : <br/><br/>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone Number:</b> ${data.phoneNumber}</p>
        <p><b>Interested In:</b> ${data.interests}</p>
        <p><b>Message Shared:</b> ${data.projectRequirements}</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptions1);
    await transporter.sendMail(mailOptions2, (error, info) => {
      console.log("Processing email sending...");
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
      transporter.close();
    });

   
    return res.status(200).json({ message: "Sending emails" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ errMessage: "Failed to send email", err: error.message });
  }
});

module.exports = router;

// const express = require("express");
// const nodemailer = require("nodemailer");
// require("dotenv").config(); 
// const router = express.Router();

// // Configure nodemailer transporter
// const transporter = nodemailer.createTransport({
//   host: "anarish.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
//   pool: true,
//   maxConnections: 5,
// });

// // Route to handle POST requests for sending emails
// router.post("/", async (req, res) => {
//   try {
//     const { name, email, phoneNumber, interests, projectRequirements, date } = req.body;

//     // Validate input
//     if (!name || !email || !phoneNumber || !interests || !projectRequirements || !date) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     // Validate email format
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ error: "Invalid email format." });
//     }

//     // Define email options
//     const mailOptions = [
//       {
//         from: { name: "Anarish", address: "mail@anarish.com" },
//         to: email,
//         subject: "Welcome to Anarish Innovation - We are excited to Connect!",
//         html: `
//           Hi ${name},<br/>
//           Welcome to Our Platform! We're thrilled to have the opportunity to work with you.<br/><br/>
//           Warm Regards,<br/> Team Anarish
//         `,
//       },
//       {
//         from: { name: "Anarish", address: "mail@anarish.com" },
//         to: "marketing@anarish.com",
//         cc: "charu.maheshwari@anarish.com",
//         subject: "New Query from Website",
//         html: `
//           Following user has tried to contact Anarish on ${date}:<br/><br/>
//           <p><b>Name:</b> ${name}</p>
//           <p><b>Email:</b> ${email}</p>
//           <p><b>Phone Number:</b> ${phoneNumber}</p>
//           <p><b>Interested In:</b> ${interests}</p>
//           <p><b>Message Shared:</b> ${projectRequirements}</p>
//         `,
//       },
//     ];

//     // Send all emails concurrently
//     await Promise.all(mailOptions.map(async (options) => {
//       try {
//         await transporter.sendMail(options);
//       } catch (error) {
//         console.error(`Error sending email to ${options.to}:`, error);
//         throw error;  // Handle or continue based on your needs
//       }
//     }));

//     res.status(200).json({ message: "Emails sent successfully." });
//   } catch (error) {
//     console.error("Error sending emails:", error);
//     res.status(500).json({ error: "Failed to send emails.", details: error.message });
//   }
// });

// module.exports = router;

