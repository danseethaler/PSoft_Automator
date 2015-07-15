// Initialize force change event code
var changeEvent = document.createEvent("HTMLEvents");
changeEvent.initEvent("change", true, true);

var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

psIframe.getElementById("TL_TSKPRF_EFFDT$0").value = "1/1/1999";
psIframe.getElementById("TL_TSKPRF_EFFDT$0").dispatchEvent(changeEvent);
psIframe.getElementById("TL_TSKPRF_DESCR$0").value = "5025";
psIframe.getElementById("TL_TSKPRF_DESCR$0").dispatchEvent(changeEvent);
psIframe.getElementById("TL_TSKPRF_TASK_PRFL_TMPLT_ID$0").value = "BASIC";
psIframe.getElementById("TL_TSKPRF_TASK_PRFL_TMPLT_ID$0").dispatchEvent(changeEvent);
psIframe.getElementById("AMT$0").value = "100.00";
psIframe.getElementById("AMT$0").dispatchEvent(changeEvent);
psIframe.querySelector("#PTGRIDTAB > table > tbody > tr > td:nth-child(2) > a").click();

setTimeout(function(){
    psIframe.getElementById("BUSINESS_UNIT$0").value = "STDTL";
    psIframe.getElementById("BUSINESS_UNIT$0").dispatchEvent(changeEvent);
    psIframe.getElementById("DEPTID$0").value = psIframe.getElementById("TL_TSKPRF_TASK_PROFILE_ID").innerHTML.substring(0,7);
    psIframe.getElementById("DEPTID$0").dispatchEvent(changeEvent);
    psIframe.getElementById("CUSTOMER$0").value = "5025";
    psIframe.getElementById("CUSTOMER$0").dispatchEvent(changeEvent);
    psIframe.getElementById("#ICSave").click();
},800);
