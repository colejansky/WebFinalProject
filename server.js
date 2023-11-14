const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('login', { pageTitle: 'Login Page' });
});

app.get('/taskview', (req, res) => {
  res.render('taskview', { pageTitle: 'Task Manager View' });
});

app.get('/index', (req, res) => {
  res.render('index', { pageTitle: 'Task Manager Home' });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
