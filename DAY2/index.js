const express = require('express');      // Import Express framework
const app = express();                   // Create Express application instance
const studentRoutes = require("./routes/studentRoutes"); // Import student routes
const logger = require("./middleware/logger"); // Import logger middleware

app.use(express.json());                 // Middleware to parse incoming JSON data
app.use(logger);
app.use("/students",studentRoutes)

app.listen(3000, () => {                 // Start server on port 3000
    console.log('Server is running on http://localhost:3000'); // Console message
});
