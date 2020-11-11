var donationCost = 100;

function donate() {
    if (cashAmount >= donationCost) {
        let nextDonationCost = donationCost * 2;
        cashAmount -= donationCost;
        donationCost = nextDonationCost;
        likeDislikeFactor += 0.02;
        document.getElementById("cashAmount").innerHTML = numeral(cashAmount).format('$0,0.00');
        document.getElementById("likeDislikeFactor").innerHTML = numeral(likeDislikeFactor).format('0.00');
        LDR();
    }
}

function donationButtonState() {
    if (cashAmount >= donationCost && visibleDonationBox == true) {
        signaturePad.on();
        signatureCanvas.style.border = "solid green";
    }
    else {
        signaturePad.off();
        signatureCanvas.style.border = "solid rgb(189, 94, 94)";
    }
}

function clearSignatureCanvas(){
    clearInterval(checkChequeTimer);
    let ctx = signatureCanvas.getContext("2d");
    ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
}

function signedCheque(){
    var element = document.getElementById("signatureCanvas");
    element.classList.add("borderFlash");
    setTimeout(function(){ element.classList.remove("borderFlash"); }, 1000);
    donate();
    clearSignatureCanvas();
    signatureCanvas.style.border = "solid rgb(189, 94, 94)";
    drawCheque();
    commentBox.unshift({comment:"Thank you for the donation! <span class='boldRed'>[+0.02 Popularity]</span>",source:"callProject"});
    commentArrayShift();
    checkChequeTimer = setInterval(donationButtonState, 500);

}


var signatureCanvas = document.getElementById("signatureCanvas");
var signaturePad = new SignaturePad(signatureCanvas, {
    minWidth: 0.5,
    maxWidth: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    penColor: 'black',
    onBegin: clearSignatureCanvas,
    onEnd: signedCheque
});

function drawCheque() {
    let ratio = window.devicePixelRatio;
    let ctx = signatureCanvas.getContext("2d");
    ctx.font = "15px Rubik, sans-serif";
    ctx.textAlign = "center";
    let chequeText = "to donate " + numeral(donationCost).format('$0,0');
    signaturePad.clear();
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

