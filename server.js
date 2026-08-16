const express = require('express');
const session = require('express-session');
const sequelize = require('./config/database');
const authRouter = require('./routes/auth');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// ԱՅՍՊԵՍ ՊԵՏՔ է ԼԻՆԻ ԱՄԵՆԱՍԿԶԲՈՒՄ (Մինչև ռոութերը միացնելը)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true
}));

// Այժմ միացնում ենք ռոութերը
app.use('/', authRouter);

// Գլխավոր էջի ռոութը
app.get('/', (req, res) => {
    res.render('index');
});

// New Arrivals էջի ռոութը
app.get('/new-arrivals', (req, res) => {
    res.render('new-arrivals');
});

// Ապրանքի մանրամասն էջի բացում
app.get('/product/timex-automatic-e-line', (req, res) => {
    res.render('product-detail');
});

// Բազայի սինխրոնիզացիա և սերվերի գործարկում (Render-ի և տեղայինի համար)
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});