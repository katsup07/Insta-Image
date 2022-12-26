const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const pictureRoutes = require('./routes/pictures.cjs');
const homeRoutes = require('./routes/home.cjs');
const authRoutes = require('./routes/auth.cjs');
const { router: adminRoutes } = require('./routes/admin.cjs');

app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended: false}));

// === Middleware Routes ===
// app.use('/admin/add-picture', adminRoutes);
// app.use('/admin/add-comment', adminRoutes);
app.use('/admin', adminRoutes);
app.use('/pictures', pictureRoutes);
app.use('/auth', authRoutes);
app.use('/', homeRoutes);

app.use((req, res) => {
	res.status(404).send('<h2>404 - Page not found<h2>');
});

app.listen(3000, () => {
	console.log('listening on port 3000');
});
