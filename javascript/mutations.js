function startMutationWatchingBody() {

  // configuration of the observer:
  var config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  };

  var bodyObserver = new MutationObserver(function(mutations, bodyObserver) {
    var scriptObserveFunction = "bodyObserver_" + localStorage.scriptAction

    if (typeof window[scriptObserveFunction] == 'function') {
      window[scriptObserveFunction](mutations, bodyObserver);
    }
  });

  // pass in the target node, as well as the observer options
  bodyObserver.observe(document.body, config);
}

function startMutationWatchingIframe() {

  // configuration of the observer:
  var config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  };

  var iframeObserver = new MutationObserver(function(mutations) {
    var scriptObserveFunction = "iframeObserver_" + localStorage.scriptAction

    if (typeof window[scriptObserveFunction] === "function") {
      window[scriptObserveFunction](mutations, iframeObserver);
    }

  });

  // pass in the target node, as well as the observer options
  iframeObserver.observe(document.getElementById("ptifrmtgtframe").contentDocument, config)
}

function bodyObserver_generateRetros(mutations, bodyObserver) {

  if (localStorage.scriptAction === undefined || !!document.getElementById("ptifrmtgtframe").contentDocument.getElementById("PAY_LINE_WORK_EMPLID")) {
    bodyObserver.disconnect();
    return false;
  }

  // Iterate through each mutation node
  for (var i = 0; i < mutations.length; i++) {

    // Check for modal popup
    if (mutations[i].target.id.substring(0, 6) === "ptMod_") {

      // Click through no hourly rate error
      if (checkIframeAndClass("popupText", "<br>Warning -- Regular or O/T Hours entered and no", false)) {
        console.log("Clicked OK on no pay rate specified warning");
        document.getElementById("#ICOK").click();

        // Click through other no hourly rate error
      } else if (checkIframeAndClass("popupText", "<br>Warning -- Other Earnings Hours entered and no", false)) {
        console.log("Clicked OK on both hours and dollar amount warning");
        document.getElementById("#ICOK").click();

        // Click through both hours and dollar amount entered warning
      } else if (checkIframeAndClass("popupText", "<br>Warning -- Both Other Hours and Other Pay ente", false)) {
        console.log("Clicked OK on both hours and dollar amount warning");
        document.getElementById("#ICOK").click();

        // If page has not yet saved
      } else if (checkIframeAndClass("popupText", "You have unsaved data on this page. Click OK to go", false)) {
        if (!!document.getElementsByClassName("popupText")[1]) {
          // Log the message
          console.log("Unidentified error : ", document.getElementsByClassName("popupText")[1].innerHTML);
        }

      } else {

        if (!!document.getElementsByClassName("popupText")[1]) {
          // Log the message
          console.log("Unidentified error : ", document.getElementsByClassName("popupText")[1].innerHTML);
        }
      }

    }
  }
}

function bodyObserver_terminateEmployees(mutations, bodyObserver) {

  if (localStorage.scriptAction === undefined || !!document.getElementById("ptifrmtgtframe").contentDocument.getElementById("EMPLMT_SRCH_COR_EMPLID")) {
    bodyObserver.disconnect();
    return false;
  }

  // Iterate through each mutation node
  for (var i = 0; i < mutations.length; i++) {

    // Check for modal popup
    if (mutations[i].target.id.substring(0, 6) === "ptMod_") {

      // Click through message
      if (checkIframeAndClass("popupText", "<br>Warning -- Grade is invalid for salary plan or", false)) {
        console.log("Clicked OK on Grade is invalid warning");
        document.getElementById("#ICOK").click();

        // Click through message
      } else if (checkIframeAndClass("popupText", "<br>Warning -- The employee's HR primary job (as d", false)) {
        console.log("Clicked OK on employee's primary job is terminated warning");
        document.getElementById("#ICOK").click();

        // Click through message
      } else if (checkIframeAndClass("popupText", "<br>Warning -- Benefit System not unique for curre", false)) {
        console.log("Clicked OK on Benefit System not unique for current Jobs warning");
        document.getElementById("#ICOK").click();

        // Click through message
      } else if (checkIframeAndClass("popupText", "<br>Warning -- date out of range. (15,9) <br><br>T", false)) {
        console.log("Clicked OK on Date Out of Range warning");
        document.getElementById("#ICOK").click();

        // Click through message
      } else if (checkIframeAndClass("popupText", "<br>Warning -- Probation Date must be later than H", false)) {
        console.log("Clicked OK on Probation Date must be later than Hire date warning");
        document.getElementById("#ICOK").click();

      } else if (checkIframeAndClass("popupText", "<br>Warning -- Not all defaulted compensation rows", false)) {
        console.log("Clicked OK on Not all defaulted compensation rows have a comprate warning");
        document.getElementById("#ICOK").click();

      } else if (checkIframeAndClass("popupText", "<br>Warning -- Either person's WorkGroup, TaskGrou", false)) {
        console.log("Clicked OK on Workgroup is not the same as the default value warning");
        document.getElementById("#ICOK").click();

      } else if (checkIframeAndClass("popupText", "<br>Warning -- Employee Directly Tipped Status dev", false)) {
        console.log("Clicked OK on Employee Directly Tipped Status deviates warning");
        document.getElementById("#ICOK").click();

      } else if (checkIframeAndClass("popupText", "<br>Warning -- This employee already has a primary", false)) {
        console.log("Clicked OK on This employee already has a primary job warning");
        document.getElementById("#ICOK").click();

      } else {

        if (!!document.getElementsByClassName("popupText")[1]) {
          // Log the message
          console.log("Unidentified error : ", document.getElementsByClassName("popupText")[1].innerHTML);
        }
      }
    }
  }
}

function iframeObserver_terminateEmployees(mutations, iframeObserver) {
  // Loop through all the changes
  for (var i = 0; i < mutations.length; i++) {

    // Check if there's a change for the SAVED_win0
    if (mutations[i].target.id === "SAVED_win0") {

      // Set the iframe variable
      var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

      // If the style of the SAVED_win0 === block --> the page has been saved
      if (psIframe.getElementById("SAVED_win0").style.display === "block" && psIframe.getElementById("ptStatusText_win0").innerHTML === "Saved") {

        // Disconnect the iframeObserver
        iframeObserver.disconnect();

        // Return to search
        document.getElementById("pthnavbccrefanc_HC_JOB_DATA_GBL").click();


        // If the search field shows up and this code is still running the link didn't initiate a page reload
        var lookingForSearchNode = setInterval(function() {

          // Set the iframe variable
          var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

          if (!!psIframe.getElementById("EMPLMT_SRCH_COR_EMPLID")) {
            console.log("Called pageReady manually");

            clearInterval(lookingForSearchNode);

            // Call pageReady()
            pageReady();
          };
        }, 700);
        return;
      }
    }
  }
}

function bodyObserver_refreshEmployees(mutations, bodyObserver) {

  // If the search field exists there's no longer a need to observe body mutations
  if (!!document.getElementById("ptifrmtgtframe").contentDocument.getElementById("EMPLMT_SRCH_COR_EMPLID")) {
    bodyObserver.disconnect();
    return false;
  }

  // Iterate through each mutation node
  for (var i = 0; i < mutations.length; i++) {

    // Check for modal popup
    if (mutations[i].target.id.substring(0, 6) === "ptMod_") {

      // Click through message
      if (checkIframeAndClass("popupText", "<br>Note: The corresponding Church Service Call in", false)) {
        console.log("Clicked OK on corresponding Church Service warning");
        document.getElementById("#ICOK").click();
      }

      // Click through message
      if (checkIframeAndClass("popupText", "<br>Warning -- Head count of 2 exceeds maximum hea", false)) {
        console.log("Clicked OK on Head Count warning");
        document.getElementById("#ICOK").click();
      }

      // Click through message
      if (checkIframeAndClass("popupText", "<br>Warning -- Combined FTE of active jobs for emp", false)) {
        console.log("Clicked OK on Combined FTE warning");
        document.getElementById("#ICOK").click();
      }

      // Click through message
      if (checkIframeAndClass("popupText", "<br>Warning -- Grade is invalid for salary plan or", false)) {
        console.log("Clicked OK on Combined FTE warning");
        document.getElementById("#ICOK").click();
      }

      // Click through message
      if (checkIframeAndClass("popupText", "<br>Warning -- Benefit System not unique for curre", false)) {
        console.log("Clicked OK on Benefit System warning");
        document.getElementById("#ICOK").click();

      }
      // Click through message
      if (checkIframeAndClass("popupText", "<br>Warning -- Employee Directly Tipped Status dev", false)) {
        console.log("Clicked OK on Employee Directly Tipped warning");
        document.getElementById("#ICOK").click();
      } else {

        if (!!document.getElementsByClassName("popupText")[1]) {
          // Log the message
          console.log("Unidentified error : ", document.getElementsByClassName("popupText")[1].innerHTML);
        }
      }
    }
  }
}

function iframeObserver_refreshEmployees(mutations, iframeObserver) {
  // Loop through all the changes
  for (var i = 0; i < mutations.length; i++) {

    // Check if there's a change for the SAVED_win0
    if (mutations[i].target.id === "SAVED_win0") {

      // Set the iframe variable
      var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

      // If the style of the SAVED_win0 === block --> the page has been saved
      if (psIframe.getElementById("SAVED_win0").style.display === "none" && psIframe.getElementById("ptStatusText_win0").innerHTML === "Saved") {
        console.log("Checking for the page to be saved");
        // Disconnect the iframeObserver
        iframeObserver.disconnect();

        // Return to search
        document.getElementById("pthnavbccrefanc_HC_JOB_DATA_GBL").click();


        // If the search field shows up and this code is still running the link didn't initiate a page reload
        var lookingForSearchNode = setInterval(function() {

          // Set the iframe variable
          var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

          if (!!psIframe.getElementById("EMPLMT_SRCH_COR_EMPLID")) {
            console.log("Called pageReady manually");

            clearInterval(lookingForSearchNode);

            // Call pageReady()
            pageReady();
          };
        }, 700);
        return;
      }
    }
  }
}

function bodyObserver_updatePositions(mutations, bodyObserver) {

  if (localStorage.scriptAction === undefined || !!document.getElementById("ptifrmtgtframe").contentDocument.getElementById("EMPLMT_SRCH_COR_EMPLID")) {
    bodyObserver.disconnect();
    return false;
  }

  // Iterate through each mutation node
  for (var i = 0; i < mutations.length; i++) {

    // Check for modal popup
    if (mutations[i].target.id.substring(0, 6) === "ptMod_") {

      // Click through message
      if (checkIframeAndClass("popupText", "<br>The incumbent update has changed the Salary Pl", false)) {
        console.log("Clicked OK on corresponding Salary Plan Warning Message");
        document.getElementById("#ICOK").click();

        // Call the returnToSearch() function after the call stack clears.
        setTimeout(function() {
          returnToSearch();
        });

        // Click through message
      } else if (checkIframeAndClass("popupText", "<br>Note: The corresponding Church Service Call in", false)) {
        console.log("Clicked OK on corresponding Church Service message");
        document.getElementById("#ICOK").click();

        // Call the returnToSearch() function after the call stack clears.
        setTimeout(function() {
          returnToSearch();
        });

      } else if (checkIframeAndClass("popupText", "<br>Warning -- The Taskgroup does not match the De", false)) {
        console.log("Clicked OK on Probation Date Warning");
        document.getElementById("#ICOK").click();

        // Call the returnToSearch() function after the call stack clears.
        setTimeout(function() {
          returnToSearch();
        });

      } else if (checkIframeAndClass("popupText", "<br>Warning -- The Task_Profile_ID does not match ", false)) {
        console.log("Clicked OK on Probation Date Warning");
        document.getElementById("#ICOK").click();

        // Call the returnToSearch() function after the call stack clears.
        setTimeout(function() {
          returnToSearch();
        });

      } else if (checkIframeAndClass("popupText", "<br>Warning -- The Reports To position has not bee", false)) {
        console.log("Clicked OK on the Reports To Warning");
        document.getElementById("#ICOK").click();

        // Call the returnToSearch() function after the call stack clears.
        setTimeout(function() {
          returnToSearch();
        });

      } else if (checkIframeAndClass("popupText", "<br>Warning -- Probation Date must be later than H", false)) {
        console.log("Clicked OK on Probation Date Warning");
        document.getElementById("#ICOK").click();

        // Call the returnToSearch() function after the call stack clears.
        setTimeout(function() {
          returnToSearch();
        });

      } else {

        if (!!document.getElementsByClassName("popupText")[1]) {
          // Log the message
          console.log("Unidentified error : ", document.getElementsByClassName("popupText")[1].innerHTML);
        }
      }
    }
  }
}

function iframeObserver_updatePositions(mutations, iframeObserver) {
  // Loop through all the changes
  for (var i = 0; i < mutations.length; i++) {

    // Check if there's a change for the SAVED_win0
    if (mutations[i].target.id === "SAVED_win0") {

      // Set the iframe variable
      var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

      // Disconnect the iframeObserver
      iframeObserver.disconnect();

      console.log('SAVED_win0 mutation - caling returnToSearch() function');
      // Call the returnToSearch() function after the call stack clears.
      setTimeout(function() {
        returnToSearch();
      });

      return;

    }
  }
}

function returnToSearch() {

  // Return to search
  document.getElementById("pthnavbccrefanc_HC_POSITION_DATA_GBL5").click();

  var extraMessage = setInterval(function() {

    if (!!document.getElementById('ptpopupmsgbtn1')) {
      document.getElementById('ptpopupmsgbtn1').click();
    }

    if (checkIframeAndClass("popupText", '<br>Warning -- Position ' + JSON.parse(localStorage.thisPosition).dataPoint + ' has over 84 subor', false)) {
      console.log("Clicked OK on the over 84 subordinates warning");
      document.getElementById("#ICOK").click();

      clearInterval(extraMessage);

    }
  }, 500)

  // If the search field shows up and this code is still running the link didn't initiate a page reload
  var lookingForSearchNode = setInterval(function() {

    // Set the iframe variable
    var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

    if (!!psIframe.getElementById("EMPLMT_SRCH_COR_EMPLID")) {
      console.log("Called pageReady manually");

      clearInterval(lookingForSearchNode);

      // Call pageReady()
      pageReady();
    };
  }, 700);
}

function bodyObserver_openJobData(mutations, bodyObserver) {
  console.log("fired bodyObserver_openJobData");
  if (localStorage.scriptAction === undefined) {
    bodyObserver.disconnect();
    return false;
  }

  if (checkIframeAndID("win0divPAGECONTAINER", "indexOf", "No matching values were found.")) {

    // Clear storage and observers
    bodyObserver.disconnect();
    localStorage.clear();
  }

  if (checkIframeAndID("win0divPSPANELTABLINKS")) {
    checkIframeAndClass("PSHYPERLINK", "TL Employee Data")
    console.log("Clearing Storage: search completed for job data.")

    // Clear storage and observers
    bodyObserver.disconnect();
    localStorage.clear();
  }
}

function bodyObserver_openByPayline(mutations, bodyObserver) {
  console.log("fired bodyObserver_openByPayline");
  if (localStorage.scriptAction === undefined) {
    bodyObserver.disconnect();
    iframeObserver.disconnect();
    return false;
  }

  if (checkIframeAndClass("PSSRCHINSTRUCTIONS", "No matching values were found.")) {

    iframeObserver.disconnect();
    bodyObserver.disconnect();


    console.log("Check Canada?");
    quickMessage("There is no result for this search.", "Try Canada?")
  }
}

function bodyObserver_generateCheck(mutations, bodyObserver) {

  if (localStorage.scriptAction === undefined && forceContinue !== true) {
    iframeObserver.disconnect();
    return false;
  }

  if (checkIframeAndClass("popupText", "<br>Do you wish to use the paysheet creation proce", false)) {

    // If manual check then click don't create a payline
    if (localStorage.manualCheck === "true") {
      waitForSaveAndCalc();
      document.getElementById('#ICNo').click();

      // If not manual check then click create a payline
    } else if (localStorage.manualCheck === "false") {
      document.getElementById('#ICYes').click();
    }

    console.log("Clicked first popup");

  } else if (checkIframeAndClass("popupText", "<br>Would you like the process to Load available T", false)) {
    document.getElementById('#ICYes').click();
    console.log("Clicked second popup");

  } else if (checkIframeAndClass("PSSRCHTITLE", "Filter Options")) {
    checkIframeAndID("PAY_OL_WRK_OK_PB$0", "click");
    console.log("Clicked filter options OK");

    waitForPayline();

    bodyObserver.disconnect();
  }
}

function initAMTriggersProcessing() {

  localStorage.scriptAction = "generateAMTriggers";
  localStorage.componentName = "Review Triggers";
  localStorage.pageStay = "true";

  openNewWin(localStorage.componentName);
}

function bodyObserver_generateAMTriggers(mutations) {
  for (var i = 0; i < mutations.length; i++) {

    // If an alert message pops up
    if (mutations[i].target.id === "alertmsg") {

      // Click ok
      document.getElementById("#ALERTOK").click();

      // Try to return to search list again in 300 ms
      setTimeout(function() {
        var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;
        psIframe.getElementById("#ICList").click()
      }, 300);
    }
  }
}

function iframeObserver_generateAMTriggers(mutations, iframeObserver) {

  var psIframe = document.getElementById("ptifrmtgtframe").contentDocument;

  // If the search field exists then search
  if (!!psIframe.getElementById("PERS_SRCH_GBL_EMPLID") && localStorage.nextAction === "search") {

    // If there are no elements left then stop observing and return false
    if (localStorage.AMTriggerList === undefined || localStorage.AMTriggerList.length === 2) {
      iframeObserver.disconnect();
      return false;
    }

    // Get the AMTriggerList string from localStorage and convert it to an object
    var newTriggerlist = JSON.parse(localStorage.AMTriggerList)

    // Remove the first element of the object for this iteration
    localStorage.thisTrigger = JSON.stringify(newTriggerlist.shift());

    // Update the localStorage.thisTrigger with the stringified version of the newTriggerlist
    localStorage.AMTriggerList = JSON.stringify(newTriggerlist);

    // Enter the ID number and click search
    psIframe.getElementById("PERS_SRCH_GBL_EMPLID").value = JSON.parse(localStorage.thisTrigger).empid;
    psIframe.getElementById("#ICSearch").click();

    localStorage.nextAction = "setValues";
  }

  // If the add new row (+) button exists and the nextAction is setValues
  if (psIframe.getElementById("GP_RTO_TRGR$new$0$$0") && localStorage.nextAction === "setValues") {

    localStorage.nextAction = "search";

    // Initialize force change event code
    var changeEvent = document.createEvent("HTMLEvents");
    changeEvent.initEvent("change", true, true);

    // Add a new row
    psIframe.getElementById("GP_RTO_TRGR$new$0$$0").click();

    // Wait for the new row to exists
    var waitingForCountryField = setInterval(function() {

      // Set the values
      if (!!psIframe.getElementById("GP_RTO_TRGR_VW_COUNTRY$1")) {

        clearInterval(waitingForCountryField);

        psIframe.getElementById("GP_RTO_TRGR_VW_COUNTRY$1").value = "USA";
        psIframe.getElementById("GP_RTO_TRGR_VW_COUNTRY$1").dispatchEvent(changeEvent);
        psIframe.getElementById("GP_RTO_TRGR_VW_TRGR_EFFDT$1").value = JSON.parse(localStorage.thisTrigger).triggerDate;
        psIframe.getElementById("GP_RTO_TRGR_VW_TRGR_EFFDT$1").dispatchEvent(changeEvent);
        psIframe.getElementById("GP_RTO_TRGR_VW_TRGR_EVENT_ID$1").value = "LDSUSAABS";
        psIframe.getElementById("GP_RTO_TRGR_VW_TRGR_EVENT_ID$1").dispatchEvent(changeEvent);

        saveAndReturn(400);

      }
    }, 300);
  }
}
