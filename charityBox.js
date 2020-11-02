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
        clearInterval(checkChequeTimer);
        signatureCanvas.style.border = "solid red";
        signatureCanvas.addEventListener("mousedown", clearSignatureCanvas);
        commentBox.unshift({comment:"Thank you for the donation! <span class='boldRed'>[+0.01 Popularity]</span>",source:"callProject"});
        commentArrayShift();
    }
    else {
        signaturePad.off();
    }
}

function clearSignatureCanvas(){
    let ctx = signatureCanvas.getContext("2d");
    ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
    window.addEventListener("mouseup", signedCheque);
}
function signedCheque(){
    donate();
    checkChequeTimer = setInterval(donationButtonState, 500);
    signatureCanvas.style.border = "solid grey";
    clearSignatureCanvas();
    drawCheque();
}


var signatureCanvas = document.getElementById("signatureCanvas");
var signaturePad = new SignaturePad(signatureCanvas, {
    minWidth: 1,
    maxWidth: 2,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    penColor: 'rgb(0, 0, 0)'
});

function drawCheque() {
    let ratio = window.devicePixelRatio;
    let ctx = signatureCanvas.getContext("2d");
    ctx.font = "15px Rubik, sans-serif";
    ctx.textAlign = "center";
    let chequeText = "to donate $" + donationCost;
    ctx.fillText("Sign this cheque",signatureCanvas.width/ratio/2,signatureCanvas.height/ratio/2.5);
    ctx.fillText(chequeText,signatureCanvas.width/ratio/2,signatureCanvas.height/ratio/1.5);
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

