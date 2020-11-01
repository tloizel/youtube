var donationCost = 10;

function donate() {
    if (cashAmount >= donationCost) {
        let nextDonationCost = donationCost * 2;
        cashAmount -= donationCost;
        donationCost = nextDonationCost;
        likeDislikeFactor += 0.01;
        document.getElementById("cashAmount").innerHTML = numeral(cashAmount).format('$0,0.00');
        //document.getElementById("donationButton").value = "Donate $"+ donationCost;
        document.getElementById("likeDislikeFactor").innerHTML = numeral(likeDislikeFactor).format('0.00');
    }
}

function donationButtonState() {
    if (cashAmount >= donationCost && visibleDonationBox == true) {
        signaturePad.on();
        drawCheque(); //ADD BORDER COLOR CHANGE TO RED TO NOTIFY
        clearInterval(checkChequeTimer);
        //ADD MOUSEDOWN EVENTLISTENER -> DELETES TEXT
        //ADD MOUSEUP EVENTLISTENER -> donate() & relaunches checkChequeTimer & changes back border color

        //disableButton("donationButton",false);
        //disableDiv("donationButton","auto");
    }
    else {
        signaturePad.off();
        signaturePad.clear();

        //disableButton("donationButton",true);
        //disableDiv("donationButton","none");
    }
}

var signatureCanvas = document.getElementById("signatureCanvas");
var signaturePad = new SignaturePad(signatureCanvas, {
    minWidth: 1,
    maxWidth: 2,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    penColor: 'rgb(0, 0, 0)'
});

function drawCheque() {
    var ctx = signatureCanvas.getContext("2d");
    ctx.font = "15px Rubik, sans-serif";
    ctx.textAlign = "center";
    let chequeText = "to donate $" + donationCost;
    ctx.fillText("Sign this cheque",signatureCanvas.width/2.5,signatureCanvas.height/3);
    ctx.fillText(chequeText,signatureCanvas.width/2.5,signatureCanvas.height/1.65);
}

function resizeCanvas() {
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    signatureCanvas.width = signatureCanvas.offsetWidth * ratio;
    signatureCanvas.height = signatureCanvas.offsetHeight * ratio;
    signatureCanvas.getContext("2d").scale(ratio, ratio);
    signaturePad.clear(); //otherwise isEmpty() might return incorrect value
}

window.addEventListener("resize", function() {
    resizeCanvas();
    drawCheque();
});

resizeCanvas();
drawCheque();