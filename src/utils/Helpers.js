import fs from "fs";
import {parsePlainHost} from "./parser";
export const CreateHostFileData = (hosts)=> {
  var hostFileData = "";
  hosts.forEach((host)=> {
    hostFileData += "\n";
    hostFileData += `${host.ip} ${host.domain}`;
  });
  return hostFileData.trim();
};

const getHostFileURI = ()=> {
  switch (window.process.platform) {
    case "win32":
    {
      return window.process.env.SystemRoot + '/System32/drivers/etc/hosts';
    }
    case "linux":
    {
      return null;

    }
    case "darwin":
    {
      return null;

    }
    default:
    {
      alert("Platform Not Supported");
      return null;
    }

  }
};

export const writeToHostFile = (HostData)=> {
  new Promise((reject, resolve)=> {
    fs.writeFileSync(getHostFileURI(), HostData);
  }).then();

};

export const readHostFile = (callback) => {
  fs.readFile(getHostFileURI(), 'utf8', (err, data)=> {
    callback(ObjectifyHosts(data.toString()));
  })
};

//Kinda bad naming hah..,this is used to convert plain Host file data to Objects
export const ObjectifyHosts = (plainHosts) => {
  let hostObjects = [];
  let parsed = parsePlainHost(plainHosts);
  Object.keys(parsed).forEach((key)=> {
    hostObjects.push({
      domain: key,
      ip: parsed[key],
      active: true
    })
  });
   return hostObjects;
};

