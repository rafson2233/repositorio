require('dotenv').config();
const app = require('./app');
const connectDB = require('./mongo');

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
