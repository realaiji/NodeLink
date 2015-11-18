var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

var fs = require('fs');
var path = require('path');
var fse = require('fs-extra');
var ipc = require('ipc');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

  var dataPath = app.getPath('appData');
  var appPath = path.join(dataPath, 'nodelink2');
  var configFile = path.join(appPath, 'config.json');

  fse.ensureDirSync(appPath);

  fs.access(configFile, fs.W_OK && fs.R_OK, function(err) {
      if (err) {
          var defaultConfig = {
              db: {
                  host: 'localhost',
                  database: 'hos',
                  port: 3306,
                  user: 'sa',
                  password: 'sa'
              }
          };

          fse.writeJsonSync(configFile, defaultConfig);
      }
  });

  // ipc modules
  ipc.on('get-app-path', function(event, arg) {
      event.returnValue = appPath;
  });

  ipc.on('get-config-file', function(event, arg) {
      event.returnValue = configFile;
  });

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
