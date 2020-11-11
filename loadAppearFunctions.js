//functions for block appears
function prestigeAppear(){
  document.getElementById("prestige").innerHTML = "P" + prestige;
  flickAppear('reveal',0);
  visiblePrestige = true;
  document.getElementById("creativityLvl").innerHTML = creativity;//for creativity bonus at start
}

function analyticsAppear(){
  flickAppearOnce('reveal',1);
  visibleAnalyticsBlock = true;
}

function alarmAppear(){
  flickAppearOnce('reveal',2);
  alarmClock = true;
}

function napAppear(){
  flickAppearOnce('reveal',3);
  powerNap = true;
}

function editAppear(){
  flickAppearOnce('reveal',4);
  memoryBlockRefresh();
  disableDiv("childFlexEdit",'auto');
  visibleEditBlock = true;
}
function uploadAppear(){
  flickAppearOnce('reveal',7);
  disableDiv("uploadB",'auto');
  visibleUploadBlock = true;
}

function projectedAverageAppear() {
  flickAppearOnce('reveal',8);
  visibleProjectedAverage = true;
}

function cashAppear() {
  flickAppearOnce('reveal',9);
  disableDiv('cashProjectsB','auto');
  disableDiv("subAdButton",'auto');
  disableDiv("addAdButton",'auto');
  visibleCash = true;
}

function incomeAppear() {
  flickAppearOnce('reveal',10);
  visibleIncome = true;
}

function adAmountAppear() {
  flickAppearOnce('reveal',12);
  disableButton('subAdButton',false);
  disableButton('addAdButton',false);
  visibleAdAmount = true;
}

//function concerns autoEdit switch and editor expenses
function autoEditAppear() {
  flickAppearOnce('reveal',5); //autoedit
  flickAppearOnce('reveal',11); //expenses
  flickAppearOnce('reveal',6); //autoedit
  disableButton('myonoffswitch',false);
  disableDiv('onOffSwitchContainer','auto');
  visibleAutoEdit = true;
}

function expensesUpdate(){
  const checkBox = document.getElementById("myonoffswitch");
  if (checkBox.checked == true && cashAmount > 0) {
    expensesComp = 0;
    document.getElementById("extraExpenses").innerHTML = "Editor (-$"+expenses+"/sec)";
  }
  else {
    expensesComp = expenses;
    document.getElementById("extraExpenses").innerHTML = "None (yay)";
  }
  document.getElementById("editorSpeed").innerHTML = editorSpeed+" clicks/sec";
}

function incomeUpdate(){
  if(income == 1){
  document.getElementById("extraIncome").innerHTML = "Merch (+$"+income+"/sec)";
  }
  else if (income > 1){
  document.getElementById("extraIncome").innerHTML = "Patreon (+$"+income+"/sec)";
  }
}

function donationBoxAppear() {
  flickAppearOnce('reveal',13);
  visibleDonationBox = true;
  document.getElementById("donationContainer").value = "Donate $"+ donationCost;
  drawCheque();
}


function loadVisibleDivs() {
  if(visiblePrestige == true){prestigeAppear()};
  if(visibleEditBlock == true){editAppear()};
  if(visibleUploadBlock == true){uploadAppear()};
  if(visibleAnalyticsBlock == true){analyticsAppear()};
  if(visibleAutoEdit == true){autoEditAppear()};
  if(visibleCash == true){cashAppear()};
  if(visibleAdAmount == true){adAmountAppear()};
  if(visibleProjectedAverage == true){projectedAverageAppear()};
  if(visibleIncome == true){incomeAppear()};
  if(autoUploadActivated == true){autoUpload()};
  if(visibleDonationBox == true){donationBoxAppear()};
  if(powerNap == true){napAppear()};
  if(alarmClock == true){alarmAppear()};
  memoryBlockRefresh();
  if(visibleAutoEdit == false){// to fix the autoedit bug
    disableButton("myonoffswitch",true); //autoEdit switch disabled
    disableDiv("onOffSwitchContainer","none"); //autoEdit switch div non clickable
  }; 
}