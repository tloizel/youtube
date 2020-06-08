//GENERAL
var ticker = 0;

//IDEA
var ideaTimer = null;
var ideaGenCueTimer = null;
let ideaGenCueHeight = null;
var creativity = 1; //creativity level
var rangeIdea = 1; //value of Qt on range
var ideaQl =  5; //value of Ql on range
var ideasQt = 0; //amount of ideas ready to edit
var ideasQtTotal = 0; //amount of ideas since beginning
var ideaSpeed = 60000; //speed of idea generation

//SHOOT AND EDIT
var shootEdit = 200; //clicks required to edit a video
var shootEditRem = 200; //number of remaining clicks
var videosEdited = 0; //number of videos edited
var videosEditedTotal = 50; //TOTAL number of videos edited
var computerMemory = 1; //max videos edited 
var editorSpeed = 1; //how many times to call the function

//UPLOAD
var ideaQlArray = newArray();
var ideaQlArrayView = newArray();
var videosUploaded = 0; //Videos online
var averageQlNum = 0; //average Ql numerator
var averageQl = 0; //average video quality after upload
var likeDislikeFactor = 1; //factor used to change LDR directly
var uploadSpeed = 1; //*100
var loadState = 0;//load state of progress bar

//SUBS
var views = 0;
var likeDislikeRatio = 0;
var subscribers = 0;

//CASH
var adAmount = 0;
var cashAmount = 0;
var adLoadMax = 1;
var income = 0;
var expenses = 0;
var expensesComp = 0;
var youtubePartner = 0;


//COMMENTS
var comments = [
{name: "love your content, subscribed!", type: "positive"},
{name: "keep it up son! Love, Dad", type: "positive"},
{name: "great vid, you deserve more views", type: "positive"},
{name: "hahah that moment at 2min37 XD", type: "positive"},
{name: "first", type: "positive"},
{name: "I've been watching you from your humble beginnings, so glad you've come this far you deserve it", type: "positive"},
{name: "thumbs up!", type: "positive"},
{name: "beautiful editing", type: "positive"},
{name: "best channel out there", type: "positive"},
{name: "can you do a meet up? ", type: "positive"},
{name: "i didn't understand this video...", type: "negative"},
{name: "This is terrible, unsubbed", type: "negative"},
{name: "why was this in my recommendations?", type: "negative"},
{name: "I never subbed to this channel", type: "negative"},
{name: "check out my channel Thomas Loizel on youtube", type: "negative"},
{name: "you remind me of thumbsupmovies", type: "negative"},
{name: "was this filmed with a potato?", type: "negative"},
{name: "why am I watching this", type: "negative"},
  ];
var commentBox = [{comment:"",source:""},
                  {comment:"",source:""},
                  {comment:"",source:""},
                  {comment:"",source:""},
                  {comment:"",source:""},
                  {comment:"",source:""},
                  {comment:"",source:""},
                  {comment:"",source:""},
                  {comment:"",source:""},
                  {comment:"",source:""},
                  ];

//PAGE LOAD FUNCTIONS
memoryBlockRefresh();//refreshes the memory block canvas
ideasGen(); //generate one idea to start off with
startIdeaTicker(); //start idea ticker
disableButton("subAdButton",true);
disableButton("addAdButton",true);
disableDiv("cashProjectsB","none");
disableButton("startTimer",true);
disableButton("myonoffswitch",true); //autoEdit switch disabled
disableDiv("onOffSwitchContainer","none"); //autoEdit switch div non clickable

//TIMERS
  //Function for ticker NOT USED
function autoticker(number){
  ticker = ticker + number
  document.getElementById("ticker").innerHTML = ticker;
}

//start idea ticker
function startIdeaTicker(){
  ideaTimer = setInterval(function(){
              //TEMP autoticker(1);
              ideasGen();
              },ideaSpeed);
  disableButton("startTimer",true);
  disableButton("stopTimer",false);
  clearInterval(ideaGenCueTimer);
  ideaGenCueTimer = setInterval(ideaGenCueFill,ideaSpeed/100);
}

//stop idea ticker
 function stopIdeaTicker() {
   clearInterval(ideaTimer);
   disableButton("startTimer",false);
   disableButton("stopTimer",true);
   clearInterval(ideaGenCueTimer);
   ideaGenCueHeight = 100;
   ideaGenCueFill();
  }

//Idea Generation symbol filling up (Timer & separate function)
function ideaGenCue() {
  ideaGenCueTimer = setInterval(ideaGenCueFill(),ideaSpeed/100);
  }
    
function ideaGenCueFill() {
  if (ideaGenCueHeight <= 0){ideaGenCueHeight = 100} 
    else {
    ideaGenCueHeight--;
    let progressBarFull = document.getElementById("ideaGenCueProgressBarFull");
    progressBarFull.style.height = ideaGenCueHeight + "%";
  }
  let ideaGenCueProgressBar = document.getElementById("ideaGenCueProgressBar");
  if (ideaGenCueHeight < 100 && ideaGenCueHeight >= 66){
    ideaGenCueProgressBar.style.backgroundColor = "red";
  } if (ideaGenCueHeight < 66 && ideaGenCueHeight >= 33){
    ideaGenCueProgressBar.style.backgroundColor = "orange";
  } if (ideaGenCueHeight < 33){
    ideaGenCueProgressBar.style.backgroundColor = "green";
  }
}

//start auto edit
function autoEdit(){
  const checkBox = document.getElementById("myonoffswitch");
      if (checkBox.checked == true && cashAmount > 0) {
        expensesComp = 0;
        for (var i = 0; i < editorSpeed; i++) {
          clicksLeft();
        }
      }
      else {
        expensesComp = expenses;
      }
}

//start auto upload
function autoUpload(){
var uploaderTimer = setInterval(function(){
                   if (loadState == 0){
                   uploadVideo();};
                   },1000/uploadSpeed);
}

  //start timer2 _ NOT A FUNCTION
window.setInterval(function(){
                   SubsRefresh();
                   viewsRefresh();
                   cashGen();
                   autoEdit();
                   cashRefresh();
                   },1000);

//refreshes cashAmount with income and expenses per min AND COMMENTS
window.setInterval(function(){
                   callComment();
                   },60000);

//converts views into string with commas
//function numberWithCommas(views) {
//  let viewsCommas = views.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
//  document.getElementById("views").innerHTML = viewsCommas;
//}

//Function to manually add views NOT USED
function addition(number){
  views = views + number;
  views = Math.floor(views);
  document.getElementById("views").innerHTML = views;
}

//Upgrade CREATIVITY according to views NOT USED
function upgradeCrea(){
  var upCost = Math.floor(10* Math.pow(1.2,creativity));
    if(views >= upCost){
     creativity += 1;
     views -= upCost;
     document.getElementById("views").innerHTML = views;
     document.getElementById("creativityLvl").innerHTML = "Creativity Level : " + creativity;
   }
  var nextCost = Math.floor(10 * Math.pow(1.2,creativity));
  document.getElementById('upgradeCreativityCost').innerHTML = "<em> Cost </em>: " + nextCost;
}

//Upgrades creativity
function upgradeCreativity(num){
  creativity += num;
  document.getElementById("creativityLvl").innerHTML = "Creativity Level : " + creativity;
}

//idea range
function ideaRangeMax(rangeValue) {
  rangeIdea = rangeValue; //stores range value quantity
  document.getElementById("idea").innerHTML = rangeValue;
  var maxRangeValue = creativity + 5; //increases slider max value
  document.getElementById("ideaRange").max = maxRangeValue;
  ideaQl = maxRangeValue - rangeValue;
  document.getElementById("ideaQl").innerHTML = ideaQl;
}

//Adds up range value quantities in ideas generated and calculates Ql array
function ideasGen() {
  rangeIdea = parseInt(rangeIdea);
  var arrayAdd = newArray(ideaQl, rangeIdea);
  ideaQlArray = ideaQlArray.concat(arrayAdd);
  document.getElementById("arrayQl").innerHTML = ideaQlArray;
  ideasQt = ideasQt + rangeIdea;
  document.getElementById("ideasGen").innerHTML = ideasQt;
  ideasQtTotal = parseInt(rangeIdea) + ideasQtTotal;
  document.getElementById("ideasGenTotal").innerHTML = ideasQtTotal;
  updateArrayQlView();
  ideaGenCueHeight = 0; //for synchronisation issues
}

//limits idea array displayed
function updateArrayQlView() {
if (ideaQlArray.length<=10){
  ideaQlArrayView = ideaQlArray;
}
else {
  let length = ideaQlArray.length - 10;
  let txt = " ... " + length + " more";
  ideaQlArrayView = ideaQlArray.slice(0,10);
  ideaQlArrayView.push(txt);
}
document.getElementById("arrayQlView").innerHTML = ideaQlArrayView;
}

//to de-group Qt into correct array
function newArray(value, len) {
  var arr = [];
    for (var i = 0; i < len; i++) {
       arr.push(value);
      }
  return arr;
}

//changes idea speed in set interval & updates "ideas/min"
function changeIdeaSpeed(time) {
  ideaSpeed = time;
  let ideaSpeedConversion = ideaSpeed/1000;
  document.getElementById("ideaSpeed").innerHTML = "ideas/" + ideaSpeedConversion + "s";
}

//change editor speed NOT USED
function upgradeEditSpeed(number){
  if(number==1){
    if (editorSpeed < 5){
      editorSpeed++;
    }
  }
  else {
    if (editorSpeed > 1 ){
      editorSpeed--; 
    }
  }
  document.getElementById("editorSpeed").innerHTML = editorSpeed+" clicks/sec";
}

//Shoot & Edit
function clicksLeft(){
  if(shootEditRem < 0){
    shootEditRem = 0 ;
    document.getElementById("editClicks").innerHTML = shootEditRem;
   }
  else if(shootEditRem > 0 && ideasQt>0){
    shootEditRem -= 1 ;
    document.getElementById("editClicks").innerHTML = shootEditRem;
   }
  else if(shootEditRem == 0 && ideasQt > 0 && videosEdited < computerMemory){
    shootEditRem = shootEdit;
    document.getElementById("editClicks").innerHTML = shootEditRem; 
    videosEdited += 1;
    videosEditedTotal += 1;
    document.getElementById("videosEdited").innerHTML = videosEdited;
    document.getElementById("videosEditedTotal").innerHTML = videosEditedTotal;
    ideasQt = ideasQt - 1;
    document.getElementById("ideasGen").innerHTML = ideasQt;
    }
  var clicksPercentage = Math.round((1-shootEditRem/shootEdit)*100);
  setPercentage(clicksPercentage);
  memoryBlockRefresh();
}

//draw all memory blocks empty and full
function memoryBlockRefresh() {
  var memoryCanvas = document.getElementById("memoryCanvas");
  var ctx = memoryCanvas.getContext("2d");
  ctx.clearRect(0,0,memoryCanvas.width,memoryCanvas.height);
  memoryEmpty();
  memoryFill();
}

//draws emptymemory squares
function drawMemory(x, y, w, h){
    var cns1 = document.getElementById("memoryCanvas");
    var ctx = cns1.getContext("2d");
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.stroke();
}

//draws empty memory slots at start
function memoryEmpty(){
  var width = memoryCanvas.width;
  var height = memoryCanvas.height;
  var numberSquares = computerMemory;
   for (var j=0; j<3; j++){
     let squaresHeight = 10+50*j+30;
     if (numberSquares>0 && squaresHeight<height) {
      for ( var i=0; i < 20; i++) {
      let squaresWidth = 10+40*i+30;
        if (numberSquares>0 && squaresWidth<width) {
        drawMemory(10+40*i,10+50*j,30,30);
        numberSquares -= 1;
        }
      }
     }
   }
}

//draws memory squares
function drawSquare(x, y, w, h){
    var cns1 = document.getElementById("memoryCanvas");
    var ctx = cns1.getContext("2d");
    ctx.fillStyle = "red";
    ctx.fillRect(x,y,w,h);
}

//draws memory squares in canvas
function memoryFill() {
  var width = memoryCanvas.width;
  var height = memoryCanvas.height;
  var numberSquares = videosEdited
   for (var j=0; j<3; j++){
     let squaresHeight = 10+50*j+30;
     if (numberSquares>0 && squaresHeight<height) {
      for ( var i=0; i < 20; i++) {
      let squaresWidth = 10+40*i+30;
        if (numberSquares>0 && squaresWidth<width) {
        drawSquare(10+40*i,10+50*j,30,30);
        numberSquares -= 1;
        }
      }
     }
   }
}

//Upgrades MEMORY by num & Refreshes Computer Memory canvas
function upgradeMemory(num){
  computerMemory += num;
  memoryBlockRefresh();
}

//NOT USED Upgrade MEMORY according to cashAmount
function upgradeMemoryCash(){
  var upCost = Math.floor(10* Math.pow(1.2,computerMemory));
    if(cashAmount >= upCost){
     computerMemory += 1;
     cashAmount -= upCost;
     document.getElementById("cashAmount").innerHTML = "$" + cashAmount;
     document.getElementById("computerMemory").innerHTML = computerMemory + "Gb";
   }
  var nextCost = Math.floor(10 * Math.pow(1.2,computerMemory));
  document.getElementById('upgradeMemoryCost').innerHTML = "<em> Cost </em>: " + "$" + nextCost;
  memoryBlockRefresh();
}

//change upload speed
function upgradeUploadSpeed(para){
  uploadSpeed = para;
  let uploadSpeedConversion = uploadSpeed*100;
  document.getElementById("uploadSpeed").innerHTML = uploadSpeedConversion+" kB/s";
}

//change upload speed
function upgradeEditorSpeed(para){
  editorSpeed = para;
  let editorSpeedConversion = editorSpeed;
  document.getElementById("editorSpeed").innerHTML = editorSpeedConversion+" clicks/sec";
}


//Upload video
function uploadVideo() {
   if (videosEdited > 0 && loadState == 0) {
     loadState = 1;
     document.getElementById("uploadB").disabled = true; 
     var elem = document.getElementById("myBar");
     var width = 1;
     var id = setInterval(frame, 1000/uploadSpeed);
 function frame() {
   if (width >= 100) {
     clearInterval(id);
     loadState = 0;
     elem.style.width = 0 + "%";
     videosUploaded++;
     document.getElementById("videos").innerHTML = videosUploaded;
     videosEdited--;
     document.getElementById("videosEdited").innerHTML = videosEdited;
     averageQlCalculation();//calculated average Ql at each upload
     updateArrayQlView();//update array to view
     LDR();//calculated new ratio at each upload
     SubsFromUpload();//calculated sub count at each upload
     viewsFromSubs();//calculated view count at each upload
     memoryBlockRefresh();//refreshes the memory block canvas
     document.getElementById("uploadB").disabled = false; 
     } 
   else {
     width++;
     elem.style.width = width + "%";
     }
   }
 }
}

//calculate average video quality
function averageQlCalculation(){
  var nextQl = ideaQlArray[0];
  averageQlNum = averageQlNum + nextQl;
  averageQl = averageQlNum/videosUploaded;
  ideaQlArray.shift();
  document.getElementById("averageQl").innerHTML = averageQl.toFixed(2);
  document.getElementById("arrayQl").innerHTML = ideaQlArray;
}

//change ad load
function changeAdLoad(number){
  if(number==1){
    if (adAmount < adLoadMax){
      adAmount++;
      LDR();
    }
  }
  else {
    if (adAmount > 0){
      adAmount--; 
      LDR();
    }
  }
  document.getElementById("adLoad").innerHTML = adAmount;
}

//Like Dislike ratio calculation
function LDR() {
  likeDislikeRatio = Math.floor((averageQl*10 - adAmount*10)*likeDislikeFactor); 
    if (likeDislikeRatio < 0){
     likeDislikeRatio = 0;
    } 
    else if (likeDislikeRatio > 100){
     likeDislikeRatio = 100;
    }
  document.getElementById("likeDislikeRatio").innerHTML = likeDislikeRatio + "%";
}

//Change LDRF
function LDRF(factor){
  likeDislikeFactor = factor;
  document.getElementById("likeDislikeFactor").innerHTML = likeDislikeFactor;
}

//increase subscriber count
function SubsFromUpload(){
  var subInitial = subscribers;
    if(likeDislikeRatio >= 50){
      subscribers += videosUploaded * parseInt(likeDislikeRatio/10);
    }
    if(likeDislikeRatio >= 30 && likeDislikeRatio < 50){
      subscribers += videosUploaded * parseInt(likeDislikeRatio/10)/2;
    }
    else {
      subscribers -= videosUploaded * parseInt(5-likeDislikeRatio/10);
    }
    if (subscribers < 0){
      subscribers = 0;
    }
  var subsRound = subscribers.toFixed();
  document.getElementById("subscriberAmount").innerHTML = subsRound;
  var subDiff = subscribers - subInitial;
  subDifferenceColor(subDiff);
}

//subs from ticker
function SubsRefresh(){
  var subInitial = subscribers;
    if (likeDislikeRatio >= 50){
      subscribers += videosUploaded * parseInt(likeDislikeRatio/10)*0.01;
    }
    else {
      subscribers -= videosUploaded * parseInt(5-likeDislikeRatio/10)*0.01;
    }
    if (subscribers < 0){
      subscribers = 0;
    }
  var subsRound = subscribers.toFixed();
  document.getElementById("subscriberAmount").innerHTML = subsRound;
 //var subDiff = subscribers - subInitial;
 //subDifferenceColor(subDiff);
}

//subs difference formatting
function subDifferenceColor(v){
    var vRound = v.toFixed();
    var element = document.getElementById("subDifference");
    var clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);
    if (v < 0){
      clone.innerHTML = vRound;
      clone.classList.remove("animatedGreen");
      clone.classList.add("animatedRed");
    }
    else{
      clone.innerHTML = "+"+vRound;
      clone.classList.remove("animatedRed");
      clone.classList.add("animatedGreen");
    }
}

//Views from subs
function viewsFromSubs(){
  views += subscribers;
  views = Math.floor(views);
  document.getElementById("views").innerHTML = views;
}

//views calculation
function viewsRefresh(){
  views += 0.05*subscribers;
  var viewsRound = views.toFixed();
  document.getElementById("views").innerHTML = viewsRound;
}

//videos * adload = cash
function cashGen(){
  cashAmount += 0.01*videosUploaded*Math.log(views+1)*adAmount;
  document.getElementById("cashAmount").innerHTML = "$"+cashAmount.toFixed(2);
}
  
// refreshes cash amount with income and expenses
function cashRefresh() {
    cashAmount += income - expenses + expensesComp; //expenses corresponds to AutoEdit
    document.getElementById("cashAmount").innerHTML = "$" + cashAmount.toFixed(2);
}

//function for cicular progress bar
function setPercentage(v){
  $('.mask span').html(v+'%');
  var perct = v*3.6;
    if(v >= 50){
       $('.right-block').css('background','inherit'); 
       perct = perct - 180;
    }
    else{
       $('.right-block').css('background','#ccc'); 
    }
  $('.right-block').css('transform','rotate('+perct+'deg)'); 
}

//call comments
function callComment(){
  if(videosUploaded>0){
  commentBox.unshift({comment:commentType(),source:"callComment"});
  commentArrayShift();
  }
}
  
//décaler comments
function commentArrayShift(){
  var i = 0;
  do {
     var commentId = "comment" + (i+1);
      commentStyle(commentBox[i].source,commentId);
      document.getElementById(commentId).innerHTML = commentBox[i].comment;
      i++;
  } while(i < 10);
  
  if (commentBox.length > 10){
      commentBox.pop();
  }
}

//comment css style
function commentStyle(commentSource,id){
  var element = document.getElementById(id);
  if(commentSource == "callComment"){
    element.classList.remove("projectCommentcolor");
    element.classList.add("callCommentcolor");
  }
  else if (commentSource == "callProject"){
    element.classList.remove("callCommentcolor");
    element.classList.add("projectCommentcolor");
  }
}

//generate random positive or negative comment
function commentType() {
  var com;
  if (likeDislikeRatio >= 50){
     var positiveComment = comments.filter(function(e) {
     return e.type === "positive";
     });
      let x = getRandomInt(0,positiveComment.length)
      com = positiveComment[x].name;
  }else{
      var negativeComment = comments.filter(function(e) {
      return e.type === "negative";
      });
      let x = getRandomInt(0,negativeComment.length)
      com = negativeComment[x].name;
  }
  return com;
}

//Gets a random integer between `min` and `max` 
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//Call Projects
function callProject(array,title,desc,num) {
  var projectTitle = title.id;
  var projectDesc = desc.id;
    if (eval(array[0][2]) == true && array.length>0) {
        eval(array[0][3]);
        var com = array[0][0].concat(" - ",array[0][4]);
        commentBox.unshift({comment:com,source:"callProject"});
        commentArrayShift();
        array.shift();
        flickAppear("project",num);
        document.getElementById(projectTitle).innerHTML = array[0][0];
        document.getElementById(projectDesc).innerHTML = array[0][1];
  }
}

//flickering effect on appearing objects
function flickAppear(class1,num) {
  var element = document.getElementsByClassName(class1)[num];
  var clone = element.cloneNode(true);
  element.parentNode.replaceChild(clone, element);
  clone.classList.remove("animated");
  clone.classList.add("animated");
}

//function to enable/disable buttons : the button will not be clickable
function disableButton(button,state){
  document.getElementById(button).disabled = state;
}

//function to enable/disable divs : the mouse pointer will not appear (chose "none" or 'auto')
function disableDiv(div,state){
  document.getElementById(div).style.pointerEvents = state;
}



//project arrays
var ideaProjects = [
  ["Binge watch Youtube","5 Total Ideas Generated","ideasQtTotal>=5","upgradeCreativity(1);ideaRangeMax(rangeIdea)","17 hours later, inspiration is flowing [+1 Creativity]"],
  ["Invite a mate over","20 Total Ideas Generated","ideasQtTotal>=20","upgradeCreativity(1);ideaRangeMax(rangeIdea)","You brainstorm until dawn [+1 Creativity]"],
  ["Watch the OGs of Youtube","5.5 Average Video Quality","averageQl>=5.5","upgradeCreativity(2);ideaRangeMax(rangeIdea)","Rhett and who?  [+2 Creativity]"],
  ["Take guitar lessons","100k Views & 5k Subscribers & $500","views>=100000 && subscribers>=5000 && cashAmount >=500","upgradeCreativity(2);cashAmount-=2000;ideaRangeMax(rangeIdea)","Music channels seem to be a thing [+2 Creativity & -$500]"],
  ["Creative block","Less than 2 Average Video Quality","averageQl<=2","creativity+=0","Happens to the best of us [absolutely nothing]"],
  ["Finish Netflix","500 Total Ideas Generated & 7 Average Video Quality","averageQl>=7 && ideasQtTotal>=500","ideaSpeed-=10000","Get that inspo [-10s Speed]"],
  ["Buy a kitten","2k Total Ideas Generated & 500k views & $1k","views>=500000 && ideasQtTotal=2000 && cashAmount >=1000","upgradeCreativity(2);ideaRangeMax(rangeIdea)","They're the real OGs of Youtube [+2 Creativity & -$1k]"],
  ["Buy a greenscreen","8 Average Video Quality & $2k","averageQl>=8 && ideasQtTotal>=2000","upgradeCreativity(3);ideaRangeMax(rangeIdea)","Your bedroom is now a creative cocoon [+3 Creativity]"],
  ["Figure out translating isn't plagiarism","10k Total Ideas Generated & 50k Subscribers & -1000 moral standards","ideasQtTotal>=10000 && subscribers>=50000","ideaSpeed-=10000","Ask Math Podcast about it [-10s Speed]"],
  ["Start streaming video games","300k Subscribers & $5k","subscribers>=300000 && cashAmount>=5000","upgradeCreativity(3);cashAmount-=5000;ideaRangeMax(rangeIdea)","About to reach the Ender Dragon... [+3 Creativity & -$5k]"],
  ["Start a daily vlog","5M Views & 1M Subscribers","views>=5000000 && subscribers>=1000000","ideaSpeed-=20000","Daily routine and all [-20s Speed]"],
  ["End of projects","","views<1","","Congratulations []"],
];
var shootEditProjects = [
  ["Watch an iMovie tutorial","5 Total Videos Edited","videosEditedTotal>=5","shootEdit-=25;shootEditRem-=25","Two hours later, you're a pro [-25 Clicks]"],
  ["Borrow your sister's USB key","10 Total Videos Edited & Full Memory","computerMemory==videosEdited&&videosEditedTotal>=10","upgradeMemory(1)","It shall never be returned [+1 Memory]"],
  ["Buy a gaming mouse","15 Total Videos Edited & $100","videosEditedTotal>=15&&cashAmount>=100","shootEdit-=25;shootEditRem-=25;cashAmount-=100","For that precious click speed [-25 Clicks & -$100]"],
  ["Laptop upgrade","20 Total Videos Edited & $500","videosEditedTotal>=20&&cashAmount>=500","shootEdit-=50;shootEditRem-=50;cashAmount-=500","Because tools make the man [-50 Clicks & -$500]"],
  ["Hire an editor on Fiverr","-$1 per second","views>=0","expenses=1;flickAppear('onoffswitch',0);disableButton('myonoffswitch',false);disableDiv('onOffSwitchContainer','auto')","You'll pay him with exposure as well [AutoEditor Level 1 & -$1/s Salary]"],
  ["Watch a Final Cut tutorial","30 Total Videos Edited","videosEditedTotal>=30","shootEdit-=50;shootEditRem-=50;","Thirty hours later, you're a master [-50 Clicks]"],
  ["Delete old footage","50 Total Videos Edited & Full Memory","computerMemory==videosEdited&&videosEditedTotal>=50","upgradeMemory(1)","You will live to regret that [+1 Memory]"],
  ["Buy absurd amount of external hard drives","$4k","cashAmount>=4000","upgradeMemory(1);cashAmount-=3000","It shall never be backed up [+1 Memory & -$4k]"],
  ["Hire a 'professional' editor","$5k & 8 Average Video Quality & 100k Subscribers & 5M Views","cashAmount>=5000&&averageQl>=8&&subscribers>=100000&&views>=5000000","upgradeEditorSpeed(2);expenses+=9;cashAmount-=5000","You met him in a bar... [AutoEditor Level 2 & -$10/s Salary]"],
  ["1 month iCloud storage trial","1000 Total Videos Edited & $1k & Full Memory","computerMemory==videosEdited&&videosEditedTotal>=1000&&cashAmount>=1000","upgradeMemory(1);cashAmount-=1000","Forgot to unsubscribe one month later [+1 Memory & -$1k]"],
  ["Switch to Adobe Premiere","$5k","cashAmount>=5000","shootEdit-=50;shootEditRem-=50;cashAmount-=5000","Aaah now that's the sofware you need [-50 Clicks & -$5k]"],
  ["Convince parents that iCloud storage is useful","$7k & Full Memory","computerMemory==videosEdited&&videosEditedTotal&&cashAmount>=7000","upgradeMemory(1);cashAmount-=7000","That was a battle worth fighting for [+1 Memory & -$7k]"],
  ["Hire an experienced editor","$5k & 8.5 Average Video Quality & 1M Subscribers & 50M Views","cashAmount>=5000&&averageQl>=8.5&&subscribers>=1000000&&views>=50000000","upgradeEditorSpeed(3);expenses+=10;cashAmount-=7000","One of Casey's old editors [AutoEditor Level 3 & -$20/s Salary]"],
  ["Google Drive premium account","$10k & Full Memory","computerMemory==videosEdited&&videosEditedTotal&&cashAmount>=10000","upgradeMemory(1);cashAmount-=10000","Data-driven [+1 Memory & -$10k]"],
  ["Hire a badass editor","$10k & 9 Average Video Quality & 10M Subscribers & 500M Views","cashAmount>=10000&&averageQl>=9&&subscribers>=10000000&&views>=500000000","upgradeEditorSpeed(4);expenses+=30;cashAmount-=10000","This is getting real [AutoEditor Level 4 & -$50/s Salary]"],
  ["Get a AWS server","$25k & Full Memory","computerMemory==videosEdited&&videosEditedTotal&&cashAmount>=25000","upgradeMemory(1);cashAmount-=25000","Hopefully Jeff will see this game [+1 Memory & -$25k]"],
  ["Hire Casey himself","$1M & 9.5 Average Video Quality & 50M Subscribers & 1B Views","cashAmount>=1000000&&averageQl>=9.5&&subscribers>=50000000&&views>=1000000000","upgradeEditorSpeed(5);expenses+=50;cashAmount-=1000000","Those vlogs teach you more than film school [AutoEditor Level 5 & -$100/s Salary]"],
  ["End of projects","","views<1","","Congratulations []"],
  ];  
var uploadProjects = [
  ["Upload videos from school library","5 Uploads","videosUploaded>=5","upgradeUploadSpeed(1)","You read books while you're there [+100kB/s Upload Speed]"],
  ["Figure out how to use hotspot","10 Uploads & $100","videosUploaded>=10 && cashAmount>=100","upgradeUploadSpeed(2);cashAmount-=100","Parents weren't please with the phone bill [+200kB/s Upload Speed]"],
  ["Buy an ethernet cable","20 Uploads & $500","videosUploaded>=20 && cashAmount>=500","upgradeUploadSpeed(3);cashAmount-=500","Old school but efficient [+300kB/s Upload Speed]"],
  ["Convince parents that wifi isn't an FBI spying device","50 uploads & $1k","videosUploaded>=50 && cashAmount>=1000","upgradeUploadSpeed(4);cashAmount-=1000","Or is it..? [+400kB/s Upload Speed]"],
  ["Get closer to the wifi","500 Uploads","videosUploaded>=500","upgradeUploadSpeed(5)","harder better faster stronger [+500kB/s Upload Speed]"],
  ["Ask Drew for Javascript lessons","7 Average Video Quality","averageQl>=7","upgradeUploadSpeed(6)","You wonder if this will ever come in handy... [+600kB/s Upload Speed]"],
  ["Code your own AutoUpload program","2k Uploads & 5M Views & 500k Subscribers","views>=5000000 && videosUploaded>=2000 && subscribers>=500000","autoUpload()","Cheers Drew <3 [Activate Auto Upload]"],
  ["Convince mum to upgrade internet plan","10k Uploads & $10k","videosUploaded>=10000 && cashAmount>=10000","upgradeUploadSpeed(7);cashAmount-=10000","Worth it but you're paying boy [+700kB/s Upload Speed]"],
  ["Mum unplugged the wifi","50k Uploads & Get caught on your computer at 3am","videosUploaded>=50000","upgradeUploadSpeed(8)","MUUUUUUUUUUUUUUUUUUUUUM [+800kB/s Upload Speed & Upload off for X time]"],
  ["Your building now has fibre-optic internet","500k Uploads","videosUploaded>=500000","upgradeUploadSpeed(10)","Can't get more efficient [+1000kB/s Upload Speed]"],
  ["End of projects","","views<1","","Congratulations []"],
];
var subProjects = [
["Reply to comments","50 Subscribers","subscribers>=50","views+=200","Love you guys [+200 Views]"],
["Pimp your video intro","100 Subscribers","subscribers>=100","views+=500","Don't make it a minute long tho [+500 Views]"],
["Break the piggy bank","150 subscribers","subscribers>=150","flickAppear('reveal',1);disableDiv('cashProjectsB','auto')","Opening a bank account as we speak [Money Time]"],
["Spam your videos all over social media","200 Subscribers","subscribers>=200","LDRF(0.9)","All your friends unsubed, but it had to be done [Popularity = 0.9]"],
["SMASH THAT LIKE BUTTON","500 Subscribers","subscribers>=500","views+=10000","Reminding never hurts [+10k Views]"],
["Shoutout from Philip DeFranco","3k Subscribers","subscribers>=3000","LDRF(1)","What's up you beautiful bastards [LDRF = 1]"],
["Youtube Partner","10k Subscribers","subscribers>=10000","flickAppear('reveal',2);disableButton('subAdButton',false);disableButton('addAdButton',false);youtubePartner=1","Youtube money is gonna be rolling in booooy [Ad Time]"],
["Write you titles in ALL CAPS","15k Subscribers","subscribers>=15000","views+=50000","Those golden tips [+50k Views]"],
["Write an email to your fave Youtuber","20k Subscribers","subscribers>=20000","subscribers+=0","He never answered. What did you expect? [+Still your fave tho :'(]"],
["Shoutout from Keemstar","50k Subscribers","subscribers>=50000","LDRF(0.8)","You got right into the neeeews [Popularity = 0.8]"],
["Shoutout from MysteryGuitarMan","200k Subscribers","subscribers>=200000","LDRF(1.1)","Will he ever take off his glasses? [LDRF = 1.1]"],
["Master the art of thumbnails","300k Subscribers","subscribers>=300000","views+=100000","Bewbs in thumbnail seems to work... [+100k Views]"],
["Comment sub4sub on every video","400k Subscribers","subscribers>=400000","views+=500000","Hustling hustling [+500k Views]"],
["Shoutout from RayWilliamJohnson","1M Subscribers","subscribers>=1000000","LDRF(1.3)","Doing your mom =3 [LDRF = 1.3]"],
["Shoutout from Logan Paul","1.5M Subscribers","subscribers>=1500000","LDRF(0.7)","Oh no... [Popularity = 0.7]"],
["Accomplish every Youtube challenge","2.0M Subscribers","subscribers>=2000000","views+=1000000","Chubby bunny [+1M Views]"],
["Shoutout from NigaHiga","6M Subscribers","subscribers>=6000000","LDRF(1.1)","Tee Hee! [LDRF = 1.1]"],
["Hit the trending page","7M Subscribers","subscribers>=7000000","views+=3000000","Is that a good thing though?  [+3M Views]"],
["Collab with Shane","15M Subscribers","subscribers>=15000000","views+=20000000","Mr Dawson himself?? [+20M Views]"],
["Shoutout from PewdiePie","45M Subscribers","subscribers>=45000000","LDRF(1.4)","*Drop the mic* [LDRF = 1.4]"],
["Go viral","60M Subscribers","subscribers>=60000000","views+=100000000","If only it was always that easy [+100M Views]"],
["Participate in Youtube Rewind","100M Subscribers","subscribers>=100000000","LDRF(0.6)","They can't seem to get it right [Popularity = 0.6]"],
["Shoutout from Casey","200M Subscribers","subscribers>=200000000","LDRF(1.5)","*Faints* [LDRF = 1.5]"],
["Figure out the algorithm","500M Subscribers","subscribers>=500000000","views+=1000000000","You've just figured out internet's biggest secret [+1B Views]"],
["Overtake T-Series","1B Subscribers","subscribers>=1000000000","views+=10000000000","Thank you [+10B Views]"],
["End of projects","","views<1","","Congratulations []"],
];
var cashProjects = [
["Extra pocket money","5k Views","views>=5000","cashAmount+=20","Mum was feeling generous [+$20]"],
["Christmas","7k Views","views>=7000","cashAmount+=80","Grandma's annual cheque is always appreciated [+$80]"],
["Steal from mum's purse","10k Views","views>=10000","cashAmount+=500","Sacrifices for the better good [+$500]"],
["Steal from dad's wallet","12k Views","views>=12000","cashAmount+=1000","Ready for a whoppin [+$1k]"],
["Sly fox","Be a Youtube Partner & less than 4.5 Average Video Quality","averageQl<=4.5 && youtubePartner==1","adLoadMax+=1","Nothing too intrusive for now... [+1 Ad Amount]"],
["Loan from friends","500k Views & 7 Average Video Quality","views>=500000 && averageQl>=7","cashAmount+=2000","...and never pay them back  [+$2k]"],
["Greedy pig","50k Views","views>=50000","adLoadMax+=5","Getting kind of intrusive now [+4 Ad Amount]"],
["Evening shift waiting tables","500k Views","views>=500000","income+=500","Tables waiting evening shift [+$500/min]"],
["Sign up to a 'get rich quick' course","1M Views","views>=1000000","cashAmount+=5000","That definitely cost you more than you earned [+$5k]"],
["Eat instant noodles for a year","2.5M Views","views>=2500000","cashAmount+=10000","Saved some of that cash [+$10k]"],
["Cash cow","50M Views","views>=50000000","adLoadMax+=5","At least make them skippable [+5 Ad Amount]"],
["Launch a Patreon","100M Views","views>=100000000","income+=19500","Jack Conte 4 life [+$20k/min]"],
["Product placement","500M Views","views>=500000000","cashAmount+=200000 && subscribers-=50000","You hate that app, but it's worth the dough right? [+$200k & -50k Subscribers]"],
["Greed is good","700M Views","views>=700000000","adLoadMax+=5","You've made AdBlock a thing [+5 Ad Amount]"],
["Sell overpriced ice-cream on the beach","1B Views","views>=1000000000","cashAmount+=500000","Supply and demand my friend [+$500k]"],
["Sell you rare Pokemon cards","10B Views","views>=10000000000","cashAmount+=1000000","That wasn't easy... [+$1M]"],
["End of projects","","views<1","","Congratulations []"],
];
