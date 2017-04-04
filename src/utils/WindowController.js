const remote = require("electron").remote;
export const Close =  (e)=> {
    if (confirm("are you sure want to exit ?", "Hz"))
      var window = remote.getCurrentWindow();
    window.close();
  }

export const Minimize = () => {
  var window = remote.getCurrentWindow();
  window.minimize();
};
 
export const maximize= (e) => {
  var window = remote.getCurrentWindow();
  if (!window.isMaximized()) {
    window.maximize();
  } else {
    window.unmaximize();
  }
};
