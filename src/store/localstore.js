
const  useLocalStore = true;
const foowwLocalStorage = {
  set: function (key, value, ttl_ms) {
    var data = { value: value, expirse: new Date(ttl_ms).getTime() };
    localStorage.setItem(key, JSON.stringify(data));
  },
  get: function (key) {
    var data = JSON.parse(localStorage.getItem(key));
    if (data !== null) {
      debugger
      if (data.expirse != null && data.expirse < new Date().getTime()) {
        localStorage.removeItem(key);
      } else {
        return data.value;
      }
    }
    return null;
  }
}
exports.getLocalData = function(name) {
  if(!window.localStorage)  return null;
  if (useLocalStore) { return localStorage.getItem("name");}
  return null;
};

exports.setLocalData = function(name,data) {

  if(!window.localStorage)  return  ;
  if (useLocalStore) { return localStorage.setItem(name,data);}

};

exports.removeItem = function(name) {
  if(!window.localStorage)  return  ;
  if (useLocalStore) {localStorage.removeItem(name);}
};


 export default {
   useLocalStore,
 }
