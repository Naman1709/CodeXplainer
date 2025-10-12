const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 4000;


// Improt routes
const explainCodeRoute = require('./routes/explainCode.route.js');


// Security middleware
app.use(helmet());
app.use((cors({
    origin: function(origin, callback) {
        if (!origin || origin.includes(process.env.CORS_ORIGIN)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
})))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
})
app.use(limiter);

app.use(express.json({
    limit: '10mb', // Limit body size to 10mb
    message: 'Payload too large',
}));


// explainCode route
app.use("/api/explaincode", explainCodeRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});