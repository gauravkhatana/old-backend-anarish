const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./api/routes/users");
const mailRoutes = require("./api/routes/mail");
require("dotenv").config(); 


const app = express();

// const corsOptions = {
//   origin: 'https://www.anarish.com', // Allow only this origin
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
//   allowedHeaders: 'Content-Type,Authorization', // Allowed headers
//   credentials: true, // Allow cookies to be sent
// };


// CORS options to allow all origins
const corsOptions = {
  origin: '*',  // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization',  // Allowed headers
  credentials: true,  // Allow credentials like cookies
  preflightContinue: false,  // Automatically handle OPTIONS requests
  optionsSuccessStatus: 204,  // Status code for successful OPTIONS requests
}

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded payloads
app.use(cors(corsOptions));// Enable Cross-Origin Resource Sharing (CORS)

// API Routes
app.use("/users", usersRoutes);
app.use("/sendmail", mailRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const port = process.env.PORT || 8080;

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connection successful");
   // app.listen(port,()=>{console.log("listening on port http://localhost:8080")});
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
  });

// Export the app object for Vercel to use
module.exports = app;





// const cors = require("cors");
// const express = require("express");
// const mongoose = require("mongoose");
// const usersRoutes = require("./api/routes/users");
// const mailRoutes = require("./api/routes/mail");
// require("dotenv").config(); 

// const app = express();

// // CORS Configuration
// const corsOptions = {
//   origin: process.env.ALLOWED_ORIGIN || '*',  // Use an environment variable for allowed origins
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
//   credentials: true,
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };
// app.use(cors(corsOptions));

// // Middleware
// app.use(express.json()); // Parse incoming JSON requests
// app.use(express.urlencoded({ extended: false })); // Parse URL-encoded payloads

// // Routes
// app.use("/users", usersRoutes);
// app.use("/sendmail", mailRoutes);

// // Global Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
// });

// // Database Connection and Server Start
// const port = process.env.PORT || 8080;
// mongoose
//   .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Database connection successful");
//     app.listen(port, () => {
//       console.log(`Server is running at http://localhost:${port}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Database connection error:", error.message);
//   });

// // Export the app object for Vercel
// module.exports = app;
