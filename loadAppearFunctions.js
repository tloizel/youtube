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
function editAppear(){
  flickAppearOnce('reveal',2);
  memoryBlockRefresh();
  disableDiv("childFlexEdit",'auto');
  visibleEditBlock = true;
}
function uploadAppear(){
  flickAppearOnce('reveal',5);
  disableDiv("uploadB",'auto');
  visibleUploadBlock = true;
}

function projectedAverageAppear() {
  flickAppearOnce('reveal',6);
  visibleProjectedAverage = true;
}

function cashAppear() {
  flickAppearOnce('reveal',7);
  disableDiv('cashProjectsB','auto');
  disableDiv("subAdButton",'auto');
  disableDiv("addAdButton",'auto');
  visibleCash = true;
}

function incomeAppear() {
  flickAppearOnce('reveal',8);
  visibleIncome = true;
}

function adAmountAppear() {
  flickAppearOnce('reveal',10);
  disableButton('subAdButton',false);
  disableButton('addAdButton',false);
  visibleAdAmount = true;
}

//function concerns autoEdit switch and editor expenses
function autoEditAppear() {
  flickAppearOnce('reveal',3); //autoedit
  flickAppearOnce('reveal',9); //expenses
  flickAppearOnce('reveal',4); //autoedit
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
  flickAppearOnce('reveal',11);
  visibleDonationBox = true;
  document.getElementById("donationButton").value = "Donate $"+ donationCost;
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
  memoryBlockRefresh();
}