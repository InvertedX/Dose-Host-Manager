export const parsePlainHost = (stringData)=> {
  var array = stringData.split("\n");
  var filtered = array.filter(($item)=>( $item[0] != "#"))
    .filter(($item)=>($item.trim() != ""))
    .map(($item)=>($item.trim())); 
  
  var OBJ = {};
  filtered.forEach(($item)=> {
    var SPLIT = $item.split(' ');
    var filter_empty = SPLIT.filter(($item_)=> {
      return $item_.trim() != "";
    });
    if (filter_empty.length == 2) {
      var key = filter_empty[1];
      OBJ[key] = filter_empty[0];
    }
  });
  return OBJ;
};
