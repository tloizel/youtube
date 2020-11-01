var donationCost = 10; //this has to be added to save()

function donate() {
    if (cashAmount >= donationCost) {
        let nextDonationCost = donationCost * 2;
        cashAmount -= donationCost;
        donationCost = nextDonationCost;
        likeDislikeFactor += 0.01;
        document.getElementById("cashAmount").innerHTML = numeral(cashAmount).format('$0,0.00');
        document.getElementById("donationButton").value = "Donate $"+ donationCost;
        document.getElementById("likeDislikeFactor").innerHTML = numeral(likeDislikeFactor).format('0.00');
    }
}

function donationButtonState() {
    if (cashAmount >= donationCost && visibleDonationBox == true) {
        disableButton("donationButton",false);
        disableDiv("donationButton","auto");
    } 
    else {
        disableButton("donationButton",true);
        disableDiv("donationButton","none");
    }
}