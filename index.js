const { app, BrowserWindow } = require('electron')
var path = require('path')

function createWindow () {
    const win = new BrowserWindow({
      	width: 1500,
    	height: 1000 ,
		icon: path.join(__dirname, './assets/favicon.png')
	})
	win.setMenu(null);
	win.loadFile('index.html')
}

app.whenReady().then(() => {
	console.log('ready to create');
	createWindow()
	console.log('create finish');
})

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
	createWindow()
  
	app.on('activate', function () {
	  	if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})
  