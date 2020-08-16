function cashAppear() {
  flickAppear('reveal',3);
  disableDiv('cashProjectsB','auto');
  visibleCash = true;
}

function adAmountAppear() {
  flickAppear('reveal',6);
  disableButton('subAdButton',false);
  disableButton('addAdButton',false);
  visibleAdAmount = true;
}

//function concerns autoEdit switch and editor expenses
function autoEditAppear() {
  flickAppear('reveal',0);
  flickAppear('reveal',5);
  flickAppear('reveal',1);
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
  flickAppear('reveal',2);
  visibleProjectedAverage = true;
}

function incomeAppear() {
  flickAppear('reveal',4);
  visibleIncome = true;
}

function loadVisibleDivs() {
  if(visibleAutoEdit == true){autoEditAppear()};
  if(visibleCash == true){cashAppear()};
  if(visibleAdAmount == true){adAmountAppear()};
  if(visibleProjectedAverage == true){projectedAverageAppear()};
  if(visibleIncome == true){incomeAppear()};
  if(autoUploadActivated == true){autoUpload()};
  memoryBlockRefresh();
}