// amount defined by input box ? Or force the player to give everything at once ? Or give options of 1, 10, 100, 1000, 10k, 100k
// Once amount clicked, it disappears from cash and goes into ?
// Donation box appears when player needs to improve their public image
// Reward at certain lvls? Milestones to reach?

let donationCost = 10; //this has to be added to save()

function donate() {
    if (cashAmount >= donationCost) {    
        let nextDonationCost = donationCost * 2;
        cashAmount -= donationCost;
        donationCost = nextDonationCost;
        likeDislikeFactor += 0.01;
        document.getElementById("cashAmount").innerHTML = numeral(cashAmount).format('$0,0.00');
        document.getElementById("donationButton").value = "Donate: $"+donationCost;
        document.getElementById("likeDislikeFactor").innerHTML = numeral(likeDislikeFactor).format('0.00');
    }
}