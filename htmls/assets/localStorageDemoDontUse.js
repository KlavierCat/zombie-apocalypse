window.onload = function(){



var carousel = document.getElementById("carousel");
var leftButton = document.getElementById("left");
var rightButton = document.getElementById("right");



//user.add(testObject)

  var user = new userStorage();
  function userStorage() {
    this.store = {};
    var testingKey = parseInt(localStorage.testingKey) || 0;
    var that = this;

    this.pushToLocalStorage = function(){
      
      
      //localStorage[testingKey] = JSON.stringify(that.store);
      localStorage.setItem(String(testingKey), JSON.stringify(that.store));
      //alert(localStorage[testingKey]);
      alert("testingKey" + testingKey);

      alert("this is what is stored in localStorage" + localStorage[testingKey]);
      alert(localStorage.length);
      alert(JSON.parse(localStorage[testingKey]));
      //localStorage.setItem("clientData", data);
      //localStorage.setItem("data", JSON.stringify(store));
      
      var tabData = JSON.parse(localStorage[testingKey]);

      //JSON.parse(localStorage[testingKey]);
      alert("this is what tabdata looks like: " + tabData);
      var newTab = document.createElement("li");
      
      newTab.className = newTab.className + "carouselTab";
      var numberListValue = document.createTextNode(tabData);
      carousel.insertAdjacentHTML("afterbegin", newTab);
      
      newTab.appendChild(numberListValue);
      alert("code works");
};


  this.add = function(){
     var obj = {
    Faulkner: "<a href=\"www.youtube.com\">Faulkner's v-log</a>",
    Casper:{
      v_log1: "<a href=\"www.youtube.com\">Faulkner's v-log</a>",
      v_log2: "<a href=\"www.youtube.com\">Faulkner's v-log</a>"
    }
  };
     console.log(obj);
    alert(JSON.stringify(obj));
    
    that.store[testingKey] = (JSON.stringify(obj));
    ++testingKey;
    //alert(that.store[key]);
  };
}


if(document.addEventListener)
  {
   
  leftButton.addEventListener("click", user.add, false);
  rightButton.addEventListener("click", user.pushToLocalStorage, false);
}
else if(document.attachEvent)
 {
  alert("change browers, no one uses IE7 anymore");
  leftButton.attachEvent("onclick", user.add);
  rightButton.attachEvent("onclick", user.pushToLocalStorage);
}
};