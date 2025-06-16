const app = require('./app');

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Task Service running on port ${PORT}`);
});
