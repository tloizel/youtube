//GENERAL
var testTimer = setInterval(testProjects,1000);

//IDEA
var ideaTimer = null;
var creativity = 1; //creativity level
var rangeIdea = 1; //value of Qt on range
var ideaQl =  5; //value of Ql on range - 5
var ideasQt = 0; //amount of ideas ready to edit
var ideasQtTotal = 0; //amount of ideas since beginning
var ideaSpeed = 60000; //speed of idea generation : the lower the number the faster ideas generate

//SHOOT AND EDIT
var shootEdit = 200; //clicks required to edit a video - 200
var shootEditRem = 200; //number of remaining clicks - 200
var videosEdited = 0; //number of videos edited
var videosEditedTotal = 0; //TOTAL number of videos edited
var computerMemory = 1; //max videos edited 
var editorSpeed = 1; //how many times to call the function

//UPLOAD
var ideaQlArray = newArray();
var videosUploaded = 0; //Videos online
var averageQlNum = 0; //average Ql numerator
var averageQl = 0; //average video quality after upload - 0
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
var youtubePartner = 0; //0 for no 1 for yes

//VISIBLE STATE ON LOAD - functions that change these var are located in loadAppearFunctions.js
var visibleCash = false;
var visibleAdAmount = false;
var visibleAutoEdit = false;
var visibleProjectedAverage = false;
var visibleExpenses = false;
var visibleIncome = false;

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
  {name: "Great vid as usual", type: "positive"},
  {name: "subbed", type: "positive"},
  {name: "So creative! ", type: "positive"},
  {name: "I've been subscribed since the beginning, please reply <3", type: "positive"},
  {name: "One of the best creators out there", type: "positive"},
  {name: "I laughed throughout the entire video", type: "positive"},
  {name: "That ending was so beautiful :')", type: "positive"},
  {name: "check out my channel Thomas Loizel on youtube", type: "positive"},
  {name: "i didn't understand this video...", type: "negative"},
  {name: "This is terrible, unsubbed", type: "negative"},
  {name: "why was this in my recommendations?", type: "negative"},
  {name: "I never subbed to this channel", type: "negative"},
  {name: "was supposed to be funny", type: "negative"},
  {name: "you remind me of thumbsupmovies", type: "negative"},
  {name: "was this filmed with a potato?", type: "negative"},
  {name: "why am I watching this", type: "negative"},
  {name: "unsubbed", type: "negative"},
  {name: "so glad this is over", type: "negative"},
  {name: "Painful to watch", type: "negative"},
  {name: "The cringe was real", type: "negative"},
  {name: "We've seen this kind of content so many times already", type: "negative"},
  {name: "This doesn't deserve more than 7 views", type: "negative"},
  {name: "this is sad to watch", type: "negative"},
  {name: "Worst creator on this platform", type: "negative"},
  {name: "Impressed .. at how bad this is", type: "negative"},
  {name: "unsubscribing as i'm typing", type: "negative"},
  ];
var commentBox = [{comment:"Welcome to YouTube.",source:"story"},
                  {comment:"This is a game of patience, optimisation and problem solving.",source:"story"},
                  {comment:"Once you have unlocked all the projects, a secret code will be revealed.",source:"story"},
                  {comment:"Send us that code at youtubegame@gmail.com",source:"story"},
                  {comment:"We'll know how well you did, best score wins.",source:"story"},
                  {comment:"Good luck!",source:"story"},
                  {comment:"",source:""},
                  {comment:"",source:""},
                  {comment:"",source:""},
                  //{comment:"",source:""},
                  ];

//PAGE LOAD FUNCTIONS
memoryBlockRefresh();//refreshes the memory block canvas
ideasGen(); //generate one idea to start off with
BulbOn();
startIdeaTicker(); //start idea ticker
disableButton("subAdButton",true);
disableButton("addAdButton",true);
disableDiv("cashProjectsB","none");
disableButton("startTimer",true);
disableButton("myonoffswitch",true); //autoEdit switch disabled
disableDiv("onOffSwitchContainer","none"); //autoEdit switch div non clickable
commentArrayShift(); //to show story comments
setTimeout(helpBulbStory, 60100);
loadVisibleDivs(); //if visible variables are true
console.log("This isn't what we meant by problem solving. Get out of here!")


//inital comment on first flash
function helpBulbStory(){
    commentBox.unshift({comment:"Your light bulb just flashed, you have generated one or several new ideas! The light bulb will flash once every minute, as long as you keep thinking.",source:"callProject"});
    commentArrayShift();
}

//start idea ticker
function startIdeaTicker(){
  ideaTimer = setInterval(function(){
              //TEMP autoticker(1);
              ideasGen();
              BulbOn();
              },ideaSpeed);
              BulbOn();
  disableButton("startTimer",true);
  disableDiv("startTimer","none");
  disableButton("stopTimer",false);
  disableDiv("stopTimer","auto");
}

//stop idea ticker
 function stopIdeaTicker() {
   clearInterval(ideaTimer);
   disableButton("startTimer",false);
   disableDiv("startTimer","auto");
   disableButton("stopTimer",true);
   disableDiv("stopTimer","none");
   BulbOff();
  }

//Light up the bulb
function BulbOn() {
  let toBeTurnedUp = ['bulb', 'glow'];
  
  for (const element of toBeTurnedUp) {
  var elem = document.getElementById(element);
  var clone = elem.cloneNode(true);
  elem.parentNode.replaceChild(clone, elem);
  clone.classList.remove("turnUp");
  clone.classList.add("turnUp");
  }
}

//Turn off the bulb
function BulbOff() {
  let toBeTurnedUp = ['bulb', 'glow'];
  
  for (const element of toBeTurnedUp) {
  var elem = document.getElementById(element);
  var clone = elem.cloneNode(true);
  elem.parentNode.replaceChild(clone, elem);
  clone.classList.remove("turnUp");
  clone.style.opacity = 0;
  }
}

//start auto edit
function autoEdit(){
  const checkBox = document.getElementById("myonoffswitch");
      if (checkBox.checked == true && cashAmount > 0) {
        expensesComp = 0;
        document.getElementById("extraExpenses").innerHTML = "Editor (-$"+expenses+"/sec)";
        for (var i = 0; i < editorSpeed; i++) {
          clicksLeft();
        }
      }
      else {
        expensesComp = expenses;
        document.getElementById("extraExpenses").innerHTML = "None (yay)";
      }
}

//start auto upload
function autoUpload(){
var uploaderTimer = setInterval(function(){
                  if (loadState == 0){ //&& cashAmount > 0
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


//Upgrades creativity
function upgradeCreativity(num){
  creativity += num;
  document.getElementById("creativityLvl").innerHTML = creativity;
}

//idea range
function ideaRangeMax(rangeValue) {
  rangeIdea = rangeValue; //stores range value quantity
  document.getElementById("idea").innerHTML = rangeValue;
  var maxRangeValue = creativity + 5; //increases slider max value
  document.getElementById("ideaRange").max = maxRangeValue;
  ideaQl = maxRangeValue - rangeValue;
  document.getElementById("ideaQl").innerHTML = ideaQl;
  ideaRange.value = rangeIdea; //updates the slider thumb when loading save
}

//Adds up range value quantities in ideas generated and calculates Ql array
function ideasGen() {
  rangeIdea = parseInt(rangeIdea);
  var arrayAdd = newArray(ideaQl, rangeIdea);
  ideaQlArray = ideaQlArray.concat(arrayAdd);
  //document.getElementById("arrayQl").innerHTML = ideaQlArray;
  ideasQt = ideasQt + rangeIdea;
  document.getElementById("ideasGen").innerHTML = numeral(ideasQt).format('0,0');
  ideasQtTotal = parseInt(rangeIdea) + ideasQtTotal;
  document.getElementById("ideasGenTotal").innerHTML = numeral(ideasQtTotal).format('0,0');
  updateArrayQlView();
  averageQlCalculationProjected(); //calculate projected average
}

//limits idea array displayed
function updateArrayQlView() {
if (ideaQlArray.length<=9){
  ideaQlArrayView = ideaQlArray;
}
else {
  let length = ideaQlArray.length - 9;
  let txt = " ... " + length + " more";
  ideaQlArrayView = ideaQlArray.slice(0,9);
  ideaQlArrayView.push(txt);
}
pipeline();
}

//pipeline
function pipeline(){
  let pipelineColor = ideaQlArrayView.slice(0,videosEdited);
  let pipelineBlack = ideaQlArrayView.slice(videosEdited,ideaQlArrayView.length);
  if(pipelineBlack.length > 0 && pipelineColor.length > 0){
    pipelineColor.push(" ");
  }
  document.getElementById("arrayQlViewColor").innerHTML = pipelineColor;
  document.getElementById("arrayQlView").innerHTML = pipelineBlack;
}

//to de-group Qt into correct array
function newArray(value, len) {
  var arr = [];
    for (var i = 0; i < len; i++) {
       arr.push(value);
      }
  return arr;
}

//Shoot & Edit
function clicksLeft(){
  if(shootEditRem < 0){
    shootEditRem = 0 ;
    //document.getElementById("editClicks").innerHTML = shootEditRem;
   }
  else if(shootEditRem > 0 && ideasQt>0){
    shootEditRem -= 1 ;
    //document.getElementById("editClicks").innerHTML = shootEditRem;
   }
  else if(shootEditRem == 0 && ideasQt > 0 && videosEdited < computerMemory){
    shootEditRem = shootEdit;
    //document.getElementById("editClicks").innerHTML = shootEditRem; 
    videosEdited += 1;
    videosEditedTotal += 1;
    //document.getElementById("videosEdited").innerHTML = videosEdited;
    document.getElementById("videosEditedTotal").innerHTML = numeral(videosEditedTotal).format('0,0');
    ideasQt = ideasQt - 1;
    document.getElementById("ideasGen").innerHTML = ideasQt;
    pipeline();
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
  var numberSquares = videosEdited;
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

//change upload speed
function upgradeUploadSpeed(para){
  uploadSpeed = para;
  let uploadSpeedConversion = uploadSpeed*100;
  document.getElementById("uploadSpeed").innerHTML = uploadSpeedConversion+" kB/s";
}

//change editor speed
function upgradeEditorSpeed(para){
  editorSpeed = para;
  document.getElementById("editorSpeed").innerHTML = editorSpeed+" clicks/sec";
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
     document.getElementById("videos").innerHTML = numeral(videosUploaded).format('0,0');
     videosEdited--;
     //document.getElementById("videosEdited").innerHTML = videosEdited;
     averageQlCalculation();//calculated average Ql at each upload
     updateArrayQlView();//update array to view
     LDR();//calculated new ratio at each upload
     SubsFromUpload();//calculated sub count at each upload
     viewsFromSubs();//calculated view count at each upload
     memoryBlockRefresh();//refreshes the memory block canvas
     averageQlCalculationProjected(); //calculate projected average
   
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
  let nextQl = ideaQlArray[0];
  averageQlNum += nextQl;
  averageQl = averageQlNum/videosUploaded;
  ideaQlArray.shift();
  document.getElementById("averageQl").innerHTML = averageQl.toFixed(2);
  //document.getElementById("arrayQl").innerHTML = ideaQlArray;
}

//calculate projected average video quality
function averageQlCalculationProjected(){
  let sumOfArray = sumArray(ideaQlArray);
  let projectedQlAverage = (averageQlNum + sumOfArray)/(ideaQlArray.length + videosUploaded);
  document.getElementById("projectedAverage").innerHTML = projectedQlAverage.toFixed(2);
}
        
// Getting sum of numbers from array
function sumArray(array){
let sum = array.reduce(function(a, b){
    return a + b;
}, 0);
return sum;
}

//change ad load
function changeAdLoad(number){

  if(number==1){
    if (adAmount < adLoadMax){
      adAmount++;
      LDR();
      LDRColor();
    }
  }
  else {
    if (adAmount > 0){
      adAmount--; 
      LDR();
      LDRColor();
    }
  }
  document.getElementById("adLoad").innerHTML = adAmount;
}

//Like Dislike ratio calculation
function LDR() {
  likeDislikeRatio = ((averageQl*10 - adAmount*10)*likeDislikeFactor).toFixed(); 
    if (likeDislikeRatio < 0){
     likeDislikeRatio = 0;
    } 
//    else if (likeDislikeRatio > 100){
//     likeDislikeRatio = 100;
//    }
  document.getElementById("likeDislikeRatio").innerHTML = likeDislikeRatio + "%";
}

//Change LDRF
function LDRF(factor){
  likeDislikeFactor = factor;
  LDR();
  LDRColor();
  document.getElementById("likeDislikeFactor").innerHTML = likeDislikeFactor;
}

//increase subscriber count
function SubsFromUpload(){
  LDRColor();
  var subInitial = subscribers;
    if(likeDislikeRatio >= 50){
      subscribers += videosUploaded * parseInt(likeDislikeRatio/10);
    }
    else if(likeDislikeRatio >= 30 && likeDislikeRatio < 50){
      subscribers += videosUploaded * parseInt(likeDislikeRatio/10)/2;
    }
    else{
      subscribers -= videosUploaded * parseInt(5-likeDislikeRatio/10);
    }
    if (subscribers < 0){
      subscribers = 0;
    }
  var subsRound = subscribers.toFixed();
  document.getElementById("subscriberAmount").innerHTML = numeral(subsRound).format('0,0');
  var subDiff = subscribers - subInitial;
  subDifferenceColor(subDiff);
}

//to ad color indication on LDR
function LDRColor(){
  if(likeDislikeRatio >= 50){
    document.getElementById("likeDislikeRatio").style.color="green";
  }
  else if(likeDislikeRatio >= 30 && likeDislikeRatio < 50){
    document.getElementById("likeDislikeRatio").style.color="darkorange";
  }
  else{
    document.getElementById("likeDislikeRatio").style.color="red";
}
}

//subs from ticker
function SubsRefresh(){
  //var subInitial = subscribers;
    if (likeDislikeRatio >= 50){
      subscribers += videosUploaded * parseInt(likeDislikeRatio/10)*0.01;
    }
    else {
      subscribers -= videosUploaded * parseInt(5-likeDislikeRatio/10)*0.1;
    }
    if (subscribers < 0){
      subscribers = 0;
    }
  var subsRound = subscribers.toFixed();
  document.getElementById("subscriberAmount").innerHTML = numeral(subsRound).format('0,0');
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
  document.getElementById("views").innerHTML = numeral(views).format('0,0');
}

//views calculation
function viewsRefresh(){
  views += 0.05*subscribers;
  var viewsRound = views.toFixed();
  document.getElementById("views").innerHTML = numeral(viewsRound).format('0,0');
}

//videos * adload = cash
function cashGen(){
  cashAmount += 0.01*videosUploaded*Math.log10(views+1)*adAmount;
  document.getElementById("cashAmount").innerHTML = numeral(cashAmount).format('$0,0.00');
}
  
// refreshes cash amount with income and expenses
function cashRefresh() {
    cashAmount += income - expenses + expensesComp; //expenses corresponds to AutoEdit
    document.getElementById("cashAmount").innerHTML = numeral(cashAmount).format('$0,0.00');
}

//function for cicular progress bar
function setPercentage(v){
  document.getElementById("clicksLeft").innerHTML = shootEditRem;
  //$('.mask span').html(shootEditRem);
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
  } while(i < 9);
  
  if (commentBox.length > 10){
      commentBox.pop();
  }
}

//comment css style
function commentStyle(commentSource,id){
  var element = document.getElementById(id);
  if(commentSource == "callComment"){
    element.classList.remove("storyComment");
    element.classList.remove("projectCommentcolor");
    element.classList.add("callCommentcolor");
  }
  else if (commentSource == "callProject"){
    element.classList.remove("storyComment");
    element.classList.remove("callCommentcolor");
    element.classList.add("projectCommentcolor");
  }
  else if (commentSource == "story"){
      element.classList.remove("callCommentcolor");
      element.classList.remove("projectCommentcolor");
      element.classList.add("storyComment");
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
function callProject(element,array,title,desc,num) {
  var elementId = element.id;
  var projectTitle = title.id;
  var projectDesc = desc.id;
    if (eval(array[0][2]) == true && array.length>0) {
        eval(array[0][3]);
        var com = array[0][0].concat(" - ",array[0][4]);
        commentBox.unshift({comment:com,source:"callProject"});
        commentArrayShift();
        array.shift();
        document.getElementById(elementId).className = "project";//to make next project immediately red
        flickAppear("project",num);
        document.getElementById(projectTitle).innerHTML = array[0][0];
        document.getElementById(projectDesc).innerHTML = array[0][1];
  }
}

//test project conditions
function testProjects(){
  var projectArrays = [ideaProjects, shootEditProjects, uploadProjects, subProjects, cashProjects];
  var projectIds = ["ideaProjectsB", "shootEditProjectsB", "uploadProjectsB", "subProjectsB", "cashProjectsB"]
    for (var i = 0; i < 5; i++) {
      let project = projectArrays[i];
      let id = projectIds[i]
      if(eval(project[0][2]) == true && project.length>0){
      document.getElementById(id).className = "project valid";
      }
      else {document.getElementById(id).className = "project"};
    }
  }

//flickering effect on appearing objects
function flickAppear(class1,num) {
  clearInterval(testTimer);
  var element = document.getElementsByClassName(class1)[num];
  var clone = element.cloneNode(true);
  element.parentNode.replaceChild(clone, element);
  clone.classList.remove("animated");
  clone.classList.add("animated");
  testTimer = setInterval(testProjects,1000);
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
  ["Binge watch Youtube","Generate 5 ideas","ideasQtTotal>=5","upgradeCreativity(1);ideaRangeMax(rangeIdea)","17 hours later, inspiration is flowing <span class='boldRed'>[+1 Creativity]</span>"],
  ["Write down your dreams","Reach 5.3 average video quality","averageQl>=5.3","upgradeCreativity(1);ideaRangeMax(rangeIdea)","Imagination is a beautiful thing <span class='boldRed'>[+1 Creativity]</span>"],
  ["Invite a mate over","Generate 25 ideas","ideasQtTotal>=25","upgradeCreativity(1);ideaRangeMax(rangeIdea)","You brainstorm until dawn <span class='boldRed'>[+1 Creativity]</span>"],
  ["Watch the OGs of Youtube","Generate 50 ideas","ideasQtTotal>=50","upgradeCreativity(1);ideaRangeMax(rangeIdea)","Rhett and who?  <span class='boldRed'>[+1 Creativity]</span>"],
  ["Take guitar lessons","Reach 100k views & 5k subscribers & Pay $400","views>=100000 && subscribers>=5000 && cashAmount >=400","upgradeCreativity(2);cashAmount-=400;ideaRangeMax(rangeIdea)","Music channels seem to be a thing <span class='boldRed'>[+2 Creativity & -$400]</span>"],
  ["Creative block","Less than 4 average video quality","averageQl<=4","upgradeCreativity(3);ideaRangeMax(rangeIdea)","Happens to the best of us <span class='boldRed'>[+3 Creativity]</span>"],
  ["Finish Netflix","Generate 500 ideas & Reach 7.5 average video quality","averageQl>=7.5 && ideasQtTotal>=500","upgradeCreativity(2);ideaRangeMax(rangeIdea)","Get that inspo <span class='boldRed'>[+2 Creativity]</span>"],
  ["Buy a kitten","Generate 2k ideas & Reach 500k views & Pay $1k","views>=500000 && ideasQtTotal=2000 && cashAmount >=1000","upgradeCreativity(2);ideaRangeMax(rangeIdea)","They're the real OGs of Youtube <span class='boldRed'>[+2 Creativity & -$1k]</span>"],
  ["Buy a greenscreen","Reach 8 average video quality & Pay $2k","averageQl>=8 && ideasQtTotal>=2000","upgradeCreativity(3);ideaRangeMax(rangeIdea)","Your bedroom is now a creative cocoon <span class='boldRed'>[+3 Creativity]</span>"],
  ["Figure out translating isn't plagiarism","Generate 10k ideas & Reach 50k subscribers","ideasQtTotal>=10000 && subscribers>=50000","upgradeCreativity(3);ideaRangeMax(rangeIdea)","Ask Math Podcast about it <span class='boldRed'>[+3 Creativity]</span>"],
  ["Start streaming video games","Reach 300k subscribers & Pay $5k","subscribers>=300000 && cashAmount>=5000","upgradeCreativity(3);cashAmount-=5000;ideaRangeMax(rangeIdea)","About to reach the Ender Dragon... <span class='boldRed'>[+3 Creativity & -$5k]</span>"],
  ["Start a daily vlog","Reach 5M views & 1M subscribers","views>=5000000 && subscribers>=1000000","upgradeCreativity(3);ideaRangeMax(rangeIdea)","Daily routine and all <span class='boldRed'>[+3 Creativity]</span>"],
  ["End of projects","F","views<1","","Congratulations <span class='boldRed'>[]</span>"],
];
var shootEditProjects = [
  ["Watch an iMovie tutorial","Edit 5 videos","videosEditedTotal>=5","shootEdit-=25;shootEditRem-=24;clicksLeft()","Two hours later, you're a pro <span class='boldRed'>[-25 Clicks]</span>"],
  ["Borrow your sister's USB key","Edit 10 videos","videosEditedTotal>=10","upgradeMemory(1)","It shall never be returned <span class='boldRed'>[+1 Memory]</span>"],
  ["Buy a gaming mouse","Edit 15 videos & Pay $100","videosEditedTotal>=15&&cashAmount>=100","shootEdit-=25;shootEditRem-=24;cashAmount-=100;clicksLeft()","For that precious click speed <span class='boldRed'>[-25 Clicks & -$100]</span>"],
  ["Laptop upgrade","Edit 20 videos & Pay $500","videosEditedTotal>=20&&cashAmount>=500","shootEdit-=25;shootEditRem-=24;cashAmount-=500;clicksLeft()","Because tools make the man <span class='boldRed'>[-25 Clicks & -$500]</span>"],
  ["Hire an editor on Fiverr","Give your hand a break!","views>=0","expenses=1;flickAppear('reveal',0);flickAppear('reveal',5);flickAppear('reveal',1);disableButton('myonoffswitch',false);disableDiv('onOffSwitchContainer','auto')","You'll pay him with exposure as well <span class='boldRed'>[AutoEditor Level 1 & -$1/s]</span>"],
  ["Delete old footage","Edit 30 videos","videosEditedTotal>=30","upgradeMemory(1)","You will live to regret that <span class='boldRed'>[+1 Memory]</span>"],
  ["Watch a Final Cut tutorial","Edit 50 videos","videosEditedTotal>=50","shootEdit-=50;shootEditRem-=49;clicksLeft()","Thirty hours later, you're a master <span class='boldRed'>[-50 Clicks]</span>"],
  ["Buy absurd amount of external hard drives","Pay $4k","cashAmount>=4000","upgradeMemory(2);cashAmount-=3000","It shall never be backed up <span class='boldRed'>[+2 Memory & -$4k]</span>"],
  ["Hire a 'professional' editor","Pay $5k & Reach 7 average video quality & 70k subscribers & 5M views","cashAmount>=5000&&averageQl>=7&&subscribers>=70000&&views>=5000000","upgradeEditorSpeed(5);expenses+=9;cashAmount-=5000","You met him in a bar... <span class='boldRed'>[AutoEditor Level 2 & -$10/s]</span>"],
  ["1 month iCloud storage trial","Edit 500 videos & Pay $1k","videosEditedTotal>=500&&cashAmount>=1000","upgradeMemory(2);cashAmount-=1000","Forgot to unsubscribe one month later <span class='boldRed'>[+2 Memory & -$1k]</span>"],
  ["Switch to Adobe Premiere","Pay $6k","cashAmount>=6000","shootEdit-=50;shootEditRem-=49;cashAmount-=6000;clicksLeft()","Aaah now that's the sofware you need <span class='boldRed'>[-50 Clicks & -$6k]</span>"],
  ["Convince parents that iCloud storage is useful","Pay $7k","videosEditedTotal&&cashAmount>=7000","upgradeMemory(2);cashAmount-=7000","That was a battle worth fighting for <span class='boldRed'>[+2 Memory & -$7k]</span>"],
  ["Hire an experienced editor","Pay $5k & Reach 8.5 average video quality & 1M subscribers & 50M views","cashAmount>=5000&&averageQl>=8.5&&subscribers>=1000000&&views>=50000000","upgradeEditorSpeed(10);expenses+=10;cashAmount-=7000","One of Casey's old editors <span class='boldRed'>[AutoEditor Level 3 & -$20/s]</span>"],
  ["Google Drive premium account","Pay $10k","videosEditedTotal&&cashAmount>=10000","upgradeMemory(2);cashAmount-=10000","Data-driven <span class='boldRed'>[+2 Memory & -$10k]</span>"],
  ["Hire a badass editor","Pay $10k & Reach 9 average video quality & 10M subscribers & 500M views","cashAmount>=10000&&averageQl>=9&&subscribers>=10000000&&views>=500000000","upgradeEditorSpeed(20);expenses+=30;cashAmount-=10000","This is getting real <span class='boldRed'>[AutoEditor Level 4 & -$50/s]</span>"],
  ["Get a AWS server","Pay $25k","videosEditedTotal&&cashAmount>=25000","upgradeMemory(3);cashAmount-=25000","Hopefully Jeff will see this game <span class='boldRed'>[+3 Memory & -$25k]</span>"],
  ["Hire Casey himself","Reach $1M & Reach 9.5 average video quality & 50M subscribers & 1B views","cashAmount>=1000000&&averageQl>=9.5&&subscribers>=50000000&&views>=1000000000","upgradeEditorSpeed(49);expenses+=50;cashAmount-=1000000","Those vlogs teach you more than film school <span class='boldRed'>[AutoEditor Level 5 & -$100/s]</span>"],
  ["End of projects","I","views<1","","Congratulations <span class='boldRed'>[]</span>"],
  ];  
var uploadProjects = [
  ["Upload videos from school library","Upload 5 videos","videosUploaded>=5","upgradeUploadSpeed(2)","You read books while you're there <span class='boldRed'>[+100kB/s Upload Speed]</span>"],
  ["Figure out how to use hotspot","Upload 10 videos & Pay $100","videosUploaded>=10 && cashAmount>=100","upgradeUploadSpeed(3);cashAmount-=100","Parents weren't please with the phone bill <span class='boldRed'>[+100kB/s Upload Speed & -$100]</span>"],
  ["Buy an ethernet cable","Upload 20 videos & Pay $500","videosUploaded>=20 && cashAmount>=500","upgradeUploadSpeed(4);cashAmount-=500","Old school but efficient <span class='boldRed'>[+100kB/s Upload Speed & -$500]</span>"],
  ["Convince parents that wifi isn't an FBI spying device","Upload 50 videos & Pay $1k","videosUploaded>=50 && cashAmount>=1000","upgradeUploadSpeed(7);cashAmount-=1000","Or is it..? <span class='boldRed'>[+300kB/s Upload Speed & -$1000]</span>"],
  ["Fail statistics class","Upload 75 videos","videosUploaded>=75","flickAppear('reveal',2)","But you can still calculate an average come on <span class='boldRed'>[Projected average based on videos ready to upload]</span>"],
  ["Ask Drew for Javascript lessons","Upload 100 videos","videosUploaded>=100","upgradeUploadSpeed(11)","You wonder if this will ever come in handy... <span class='boldRed'>[+400kB/s Upload Speed]</span>"],
  ["Code your own AutoUpload program","Upload 125 videos & Reach 30k subscribers & 4M views ","videosUploaded>=125 && views>=4000000 && subscribers>=30000","autoUpload()","Cheers Drew <3 <span class='boldRed'>[Activate Auto Upload]</span>"],
  ["Get closer to the wifi","Upload 200 videos","videosUploaded>=200","upgradeUploadSpeed(16)","harder better faster stronger <span class='boldRed'>[+500kB/s Upload Speed]</span>"],
  ["Convince mum to upgrade internet plan","Upload 1000 videos & Pay $10k","videosUploaded>=1000 && cashAmount>=10000","upgradeUploadSpeed(24);cashAmount-=10000","Worth it but you're paying boy <span class='boldRed'>[+800kB/s Upload Speed & -$10000]</span>"],
  ["Mum unplugged the wifi","Upload 5000 videos & Get caught on your laptop at 3am","videosUploaded>=5000","upgradeUploadSpeed(34)","MUUUUUUUUUUUUUUUUUUUUUM <span class='boldRed'>[+1000kB/s Upload Speed & Upload off for X time]</span>"],
  ["Your building now has fibre-optic internet","Upload 20k videos","videosUploaded>=20000","upgradeUploadSpeed(54)","Can't get more efficient <span class='boldRed'>[+2000kB/s Upload Speed]</span>"],
  ["End of projects","R","views<1","","Congratulations <span class='boldRed'>[]</span>"],
];
var subProjects = [
  ["Reply to comments","Reach 50 subscribers","subscribers>=50","views+=200;stopIdeaTicker()","Love you guys <span class='boldRed'>[+200 Views & Get back to thinking!]</span>"],
  ["Pimp your video intro","Reach 100 subscribers","subscribers>=100","views+=500;stopIdeaTicker()","Don't make it a minute long tho <span class='boldRed'>[+500 Views & Get back to thinking!]</span>"],
  ["Break the piggy bank","Reach 150 subscribers","subscribers>=150","flickAppear('reveal',3);disableDiv('cashProjectsB','auto')","Opening a bank account as we speak <span class='boldRed'>[Money Time]</span>"],
  ["SMASH THAT LIKE BUTTON","Reach 300 subscribers","subscribers>=300","views+=10000;stopIdeaTicker()","Reminding never hurts <span class='boldRed'>[+10k Views & Get back to thinking!]</span>"],
  ["Shoutout from Philip DeFranco","Reach 1k subscribers","subscribers>=1000","subscribers=subscribers*2","What's up you beautiful bastards <span class='boldRed'>[Doubled your subscribers!]</span>"],
  ["Youtube Partner","Reach 5k subscribers","subscribers>=5000","flickAppear('reveal',6);disableButton('subAdButton',false);disableButton('addAdButton',false);youtubePartner=1","Youtube money is gonna be rolling in booooy <span class='boldRed'>[Ad Time]</span>"],
  ["Write your titles in ALL CAPS","Reach 15k subscribers","subscribers>=15000","views+=50000","Those golden tips <span class='boldRed'>[+50k Views & Get back to thinking!]</span>"],
  ["Spam your videos all over social media","Reach 20k subscribers","subscribers>=20000","views+=1000;LDRF(0.9)","All your friends unsubed, but it had to be done <span class='boldRed'>[Popularity = 0.9 & 1000 views]</span>"],
  ["Apologize to your community for the spam","Reach 25k subscribers","subscribers>=25000","subscribers+=200;LDRF(1)","Swallow your pride <span class='boldRed'>[Popularity = 1 & +200 subscribers]</span>"],
  ["Write an email to your fave Youtuber","Reach 40k subscribers","subscribers>=40000","subscribers+=0","He never answered. What did you expect? <span class='boldRed'>[+Still your fave tho :'(]</span>"],
  ["Shoutout from Keemstar","Reach 50k subscribers","subscribers>=50000","LDRF(0.8)","You got right into the neeeews <span class='boldRed'>[Popularity = 0.8]</span>"],
  ["Shoutout from MysteryGuitarMan","Reach 75k subscribers","subscribers>=75000","LDRF(1.1)","Will he ever take off his glasses? <span class='boldRed'>[Popularity = 1.1]</span>"],
  ["Master the art of thumbnails","Reach 100k subscribers","subscribers>=100000","views+=5000000","Bewbs in thumbnail seems to work... <span class='boldRed'>[+5M Views]</span>"],
  ["GIVEAWAY TIME","Reach 150k subscribers & Pay $10k","subscribers>=150000 && cashAmount>=10000","subscribers=subscribers*2;cashAmount-=10000","What a coincidence, your best friend won! <span class='boldRed'>[Doubled your subscribers!]</span>"],
  ["Comment sub4sub on every video","Reach 500k subscribers","subscribers>=500000","views+=500000","Hustling hustling <span class='boldRed'>[+500k Views]</span>"],
  ["Shoutout from RayWilliamJohnson","Reach 1M subscribers","subscribers>=1000000","LDRF(1.3)","Doing your mom =3 <span class='boldRed'>[LDRF = 1.3]</span>"],
  ["Shoutout from Logan Paul","Reach 1.5M subscribers","subscribers>=1500000","LDRF(0.7)","Oh no... <span class='boldRed'>[Popularity = 0.7]</span>"],
  ["Accomplish every Youtube challenge","Reach 2M subscribers","subscribers>=2000000","views+=1000000","Chubby bunny <span class='boldRed'>[+1M Views]</span>"],
  ["Shoutout from NigaHiga","Reach 6M subscribers","subscribers>=6000000","LDRF(1.1)","Tee Hee! <span class='boldRed'>[LDRF = 1.1]</span>"],
  ["Hit the trending page","Reach 7M subscribers","subscribers>=7000000","views+=3000000","Is that a good thing though?  <span class='boldRed'>[+3M Views]</span>"],
  ["Collab with Shane","Reach 15M subscribers","subscribers>=15000000","views+=20000000","Mr Dawson himself?? <span class='boldRed'>[+20M Views]</span>"],
  ["Shoutout from PewdiePie","Reach 45M subscribers","subscribers>=45000000","LDRF(1.4)","*Drop the mic* <span class='boldRed'>[Popularity = 1.4]</span>"],
  ["Go viral","Reach 60M subscribers","subscribers>=60000000","views+=100000000","If only it was always that easy <span class='boldRed'>[+100M Views]</span>"],
  ["Participate in Youtube Rewind","Reach 100M subscribers","subscribers>=100000000","LDRF(0.6)","They can't seem to get it right <span class='boldRed'>[Popularity = 0.6]</span>"],
  ["Shoutout from Casey","Reach 200M subscribers","subscribers>=200000000","LDRF(1.5)","*Faints* <span class='boldRed'>[Popularity = 1.5]</span>"],
  ["Figure out the algorithm","Reach 500M subscribers","subscribers>=500000000","views+=1000000000","You've just figured out internet's biggest secret <span class='boldRed'>[+1B Views]</span>"],
  ["Overtake T-Series","Reach 1B subscribers","subscribers>=1000000000","views+=10000000000","Thank you <span class='boldRed'>[+10B Views]</span>"],
];
var cashProjects = [
  ["Extra pocket money","Reach 5k views","views>=5000","cashAmount+=20","Mum was feeling generous <span class='boldRed'>[+$20]</span>"],
  ["Christmas","Reach 7k views","views>=7000","cashAmount+=80","Grandma's annual cheque is always appreciated <span class='boldRed'>[+$80]</span>"],
  ["Steal from mum's purse","Reach 10k views","views>=10000","cashAmount+=500","Sacrifices for the better good <span class='boldRed'>[+$500]</span>"],
  ["Steal from dad's wallet","Reach 15k views","views>=15000","cashAmount+=500","Ready for a whoppin <span class='boldRed'>[+$500]</span>"],
  ["Sly fox","Be a Youtube Partner & Reach 6 average video quality","averageQl>=6 && youtubePartner==1","adLoadMax+=1","Nothing too intrusive for now... <span class='boldRed'>[+1 Ad Amount]</span>"],
  ["Loan from friends","Reach 6.5 average video quality & 500k views","views>=500000 && averageQl>=6.5","cashAmount+=2000","...and never pay them back  <span class='boldRed'>[+$2k]</span>"],
  ["Greedy pig","Reach 1M views","views>=1000000","adLoadMax+=3","Getting kind of intrusive now <span class='boldRed'>[+3 Ad Amount]</span>"],
  ["Sell merch","Reach 2M views","views>=2000000","flickAppear('reveal',4);income+=1;document.getElementById('extraIncome').innerHTML = 'Sell merch (+$1/sec)'","That's all you wear from now on <span class='boldRed'>[+$1/s]</span>"],
  ["Sign up to a 'get rich quick' course","Reach 5M views","views>=5000000","cashAmount+=5000","That definitely cost you more than you earned <span class='boldRed'>[+$5k]</span>"],
  ["Eat instant noodles for a year","Reach 10M views","views>=10000000","cashAmount+=10000","Saved some of that cash <span class='boldRed'>[+$10k]</span>"],
  ["Cash cow","Reach 30M views","views>=30000000","adLoadMax+=5","At least make them skippable <span class='boldRed'>[+5 Ad Amount]</span>"],
  ["Launch a Patreon","Reach 50M views","views>=50000000","income+=15;document.getElementById('extraIncome').innerHTML = 'Patreon (+$15/sec)'","Jack Conte 4 life <span class='boldRed'>[+$15/s]</span>"],
  ["Product placement","Reach 100M views","views>=100000000","cashAmount+=200000;subscribers-=50000","You hate that app, but it's worth the dough right? <span class='boldRed'>[+$200k & -50k Subscribers]</span>"],
  ["Greed is good","Reach 500M views","views>=500000000","adLoadMax+=5","You've made AdBlock a thing <span class='boldRed'>[+5 Ad Amount]</span>"],
  ["Sell overpriced ice-cream on the beach","Reach 1B views","views>=1000000000","cashAmount+=500000","Supply and demand my friend <span class='boldRed'>[+$500k]</span>"],
  ["Sell you rare Pokemon cards","Reach 10B views","views>=10000000000","cashAmount+=1000000","That wasn't easy... <span class='boldRed'>[+$1M]</span>"],
  ["End of projects","T","views<1","","Congratulations <span class='boldRed'>[]</span>"],
];

function save(){
  var gameSave = {
    creativity: {variable: creativity, id:"creativityLvl"},
    rangeIdea: {variable: rangeIdea, idf:"ideaRangeMax(rangeIdea)"},
    ideaQl: {variable: ideaQl, id:"ideaQl"},
    ideasQt: {variable: ideasQt, id:"ideasGen"},
    ideasQtTotal: {variable: ideasQtTotal, id:"ideasGenTotal"},
    shootEdit: {variable: shootEdit},
    shootEditRem: {variable: shootEditRem, id:"clicksLeft"},
    videosEdited: {variable: videosEdited, idf: "memoryBlockRefresh()"},
    videosEditedTotal: {variable: videosEditedTotal, id:"videosEditedTotal"},
    computerMemory: {variable: computerMemory},
    editorSpeed: {variable: editorSpeed, id:"editorSpeed"},
    ideaQlArray: {variable: ideaQlArray, idf:"updateArrayQlView()"},
    videosUploaded: {variable: videosUploaded, id:"videos"},
    averageQlNum: {variable: averageQlNum},
    averageQl: {variable: averageQl, idf:"averageQlCalculation()"},
    likeDislikeFactor: {variable: likeDislikeFactor, id:"likeDislikeRatio"},
    uploadSpeed: {variable: uploadSpeed, id:"uploadSpeed"},
    views: {variable: views, idf:"viewsRefresh()"},
    likeDislikeRatio: {variable: likeDislikeRatio, id:"likeDislikeRatio"},
    subscribers: {variable: subscribers, id:"subscriberAmount"},
    adAmount: {variable: adAmount, id:"adLoad"},
    cashAmount: {variable: cashAmount, id:"cashAmount"},
    adLoadMax: {variable: adLoadMax, id:"adLoad"},
    income: {variable: income, id:"extraIncome"},
    expenses: {variable: expenses, id:"extraExpenses"},
    expensesComp: {variable: expensesComp},
    youtubePartner: {variable: youtubePartner},
    ideaProjects: {variable: ideaProjects, idf:"projectRefresh(ideaProjects,ideaProjectsTitle,ideaProjectsDesc)"},
    shootEditProjects: {variable: shootEditProjects, idf:"projectRefresh(shootEditProjects,shootEditProjectsTitle,shootEditProjectsDesc)"},
    uploadProjects: {variable: uploadProjects, idf:"projectRefresh(uploadProjects,uploadProjectsTitle,uploadProjectsDesc)"},
    subProjects: {variable: subProjects, idf:"projectRefresh(subProjects,subProjectsTitle,subProjectsDesc)"},
    cashProjects: {variable: cashProjects, idf:"projectRefresh(cashProjects,cashProjectsTitle,cashProjectsDesc)"},
    commentBox: {variable: commentBox, idf:"callComment()"},
    visibleCash: {variable: visibleCash},
    visibleAdAmount: {variable: visibleAdAmount},
    visibleAutoEdit: {variable: visibleAutoEdit},
    visibleProjectedAverage: {variable: visibleProjectedAverage},
    visibleExpenses: {variable: visibleExpenses},
    visibleIncome: {variable: visibleIncome, idf:"loadVisibleDivs()"}
  };
  localStorage.setItem("save",JSON.stringify(gameSave));
  console.log(gameSave);
}

function projectRefresh(array,title,desc) {
  document.getElementById(title.id).innerHTML = array[0][0];
  document.getElementById(desc.id).innerHTML = array[0][1];
}

function load() {
  var gameSave = JSON.parse(localStorage.getItem("save"));
    for (var element in gameSave) {
      window[element] = gameSave[element].variable;
      let idx = gameSave[element].id;
      if (typeof idx !== "undefined") {
        document.getElementById(idx).innerHTML = gameSave[element].variable;
      } 
      let idf = gameSave[element].idf;
      if (typeof idf !== "undefined") {
        eval(idf);
      }
    }
}

function deleteLocalStorage() {
  if(confirm("Are you sure you want to start again from the beginning?")){
      localStorage.removeItem("save");
      location.reload();
  }
}