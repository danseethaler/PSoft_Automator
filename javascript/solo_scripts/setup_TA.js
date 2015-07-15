

var empIDs = "EmpIDListGoesHere".split("','");

// Initialize force change event code
var changeEvent = document.createEvent("HTMLEvents");
changeEvent.initEvent("change", true, true);

for (var i = 0; i < empIDs.length; i++) {
    setTimeout(function(s){
        var fieldID = "TL_RUN_CTRL_GRP_EMPLID$" + s
        document.getElementById(fieldID).value = empIDs[i];
        document.getElementById(fieldID).dispatchEvent(changeEvent);

        var eyeGlass = "TL_RUN_CTRL_GRP_EMPLID$prompt$" + s
        document.getElementById(eyeGlass).click();
        document.getElementById(eyeGlass).dispatchEvent(changeEvent);

        var plusID = "TL_RUN_CTRL_GRP$new$" + s + "$$0"
        document.getElementById(plusID).click();
        document.getElementById(plusID).dispatchEvent(changeEvent);
    }(i),1000*i)
}
