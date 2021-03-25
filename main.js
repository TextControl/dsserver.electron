const { app, Menu, BrowserWindow, dialog } = require('electron');

var fs = require('fs');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: 'favicon_32x32.png',
    webPreferences: {
      nodeIntegration: true,
    }
  })

const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [{
      label: 'Open',
      accelerator: 'CmdOrCtrl+O',
      click() {
        
        dialog.showOpenDialog({
          properties: ['openFile']
        })
        .then(function(fileObj) {
        
          if (!fileObj.canceled) {

            fs.readFile(fileObj.filePaths[0], 'base64', function (err, data) {
              if(err){
                  alert("An error ocurred reading the file :" + err.message);
                  return;
              }
             
              // call external JS to load the document into TXTextControl
              win.webContents.executeJavaScript(
                `loadDocument('${data}', '${fileObj.filePaths[0]}')`
                );
            });
             
          }
        },
        )
        .catch(function(err) {
           console.error(err)  
        })
     } 
    }
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  }
]

const menu = Menu.buildFromTemplate(template)

Menu.setApplicationMenu(menu)
  win.loadFile('index.html')
  win.show()
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      
    }
  })

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})