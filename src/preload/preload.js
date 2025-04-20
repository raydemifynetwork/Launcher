const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('launcherAPI', {
  listPlugins: ()      => ipcRenderer.invoke('plugins:list'),
  install:     (id)    => ipcRenderer.invoke('game:install', id),
  update:      (id)    => ipcRenderer.invoke('game:update',  id),
  launch:      (id)    => ipcRenderer.invoke('game:launch',  id),
});

// expose: controles da janela (framelss)
contextBridge.exposeInMainWorld('windowControls', {
  minimize: () => ipcRenderer.send('window:minimize'),
  close:    () => ipcRenderer.send('window:close'),
});
