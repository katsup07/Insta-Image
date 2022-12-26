const path = require('path');

const rootDir = path.dirname(require.main.filename); // returns the directories leading into index.js
// res.sendFile('add-picture-form.html', {root: path.join(rootDir, 'views')});

module.exports = rootDir;