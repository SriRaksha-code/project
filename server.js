const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/bookstore', {
	//  useNewUrlParser: true,
	//    useUnifiedTopology: true,
	//    });
	//
	//    app.use('/api', bookRoutes);
	//
	//    app.listen(PORT, () => {
	//      console.log(`Server is running on port ${PORT}`);
	//      });
	//
