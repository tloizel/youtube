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
}