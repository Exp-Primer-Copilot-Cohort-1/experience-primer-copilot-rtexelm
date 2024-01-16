// Create web server

// Import express
const express = require('express');
// Create app
const app = express();

// Import router
const router = require('./routes');

// Import path module
const path = require('path');

// Import body-parser
const bodyParser = require('body-parser');

// Import cookie-parser
const cookieParser = require('cookie-parser');

// Import mongoose
const mongoose = require('mongoose');

// Import config
const config = require('./config/config').get(process.env.NODE_ENV);

// Import models
const { User } = require('./models/user');
const { Comment } = require('./models/comment');

// Import middleware
const { auth } = require('./middleware/auth');

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, { useNewUrlParser: true }, function(err) {
  if (err) console.log(err);
  console.log('Connected to database');
});

// Configure express
app.use(bodyParser.json());
app.use(cookieParser());

// Configure express static
app.use(express.static('client/build'));

// Configure router
app.use('/api', router);

// Configure react
if (process.env.NODE_ENV === 'production') {
  const indexPath = path.join(__dirname, '../client/build/index.html');
  app.use((req, res) => res.sendFile(indexPath));
}

// Configure port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});