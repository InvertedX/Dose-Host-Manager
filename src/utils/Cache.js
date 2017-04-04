var Cache = { 
  get: function (id) { //Load cache if found
    return (localStorage.getItem(id) !== null) ? JSON.parse(localStorage.getItem(id)) : null;
  },
  set: function (data, id) { //Cache data with unique id
    
    localStorage.setItem(id, JSON.stringify(data));
  }
};
window.onbeforeunload = ()=> {
   localStorage.removeItem("HOSTS");
   localStorage.removeItem("Categories");
}
export  default Cache;
