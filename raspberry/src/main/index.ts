const {app, BrowserWindow} = require('electron');
const path = require('path');

app.whenReady().then(() => {
	const window = new BrowserWindow({
		width: 1024,
		height: 600
	});

	window.loadFile(path.join(__dirname, '../renderer/index.html'));
});
