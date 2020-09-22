//functions for block appears
function editAppear(){
  flickAppearOnce('reveal',1);
  memoryBlockRefresh();
  disableDiv("childFlexEdit",'auto');
  visibleEditBlock = true;
}
function uploadAppear(){
  flickAppear('reveal',4);
  disableDiv("uploadB",'auto');
  visibleUploadBlock = true;
}
function analyticsAppear(){
  flickAppear('reveal',0);
  visibleAnalyticsBlock = true;
}


function cashAppear() {
  flickAppear('reveal',6);
  disableDiv('cashProjectsB','auto');
  disableDiv("subAdButton",'auto');
  disableDiv("addAdButton",'auto');
  visibleCash = true;
}

function adAmountAppear() {
  flickAppear('reveal',9);
  disableButton('subAdButton',false);
  disableButton('addAdButton',false);
  visibleAdAmount = true;
}

//function concerns autoEdit switch and editor expenses
function autoEditAppear() {
  flickAppear('reveal',2);//autoedit
  flickAppear('reveal',8);//expenses
  flickAppear('reveal',3);//autoedit
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
  if(income==1){
  document.getElementById("extraIncome").innerHTML = "Merch (+$"+income+"/sec)";
  }
  else if (income>1){
  document.getElementById("extraIncome").innerHTML = "Patreon (+$"+income+"/sec)";
  }
}

function projectedAverageAppear() {
  flickAppear('reveal',5);
  visibleProjectedAverage = true;
}

function incomeAppear() {
  flickAppear('reveal',7);
  visibleIncome = true;
}

function loadVisibleDivs() {
  if(visibleEditBlock == true){editAppear()};
  if(visibleUploadBlock == true){uploadAppear()};
  if(visibleAnalyticsBlock == true){analyticsAppear()};
  if(visibleAutoEdit == true){autoEditAppear()};
  if(visibleCash == true){cashAppear()};
  if(visibleAdAmount == true){adAmountAppear()};
  if(visibleProjectedAverage == true){projectedAverageAppear()};
  if(visibleIncome == true){incomeAppear()};
  if(autoUploadActivated == true){autoUpload()};
  memoryBlockRefresh();
}