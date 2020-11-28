//GENERAL
var testTimer = setInterval(testProjects,500);
var checkChequeTimer = setInterval(donationButtonState, 500); //see charityBox.js
var emptyArrayUsed = false;
var sleepModalReminder = true; //true - activate sleep alert
var channel = "unknown"; //channel name
var score = 0; //game score
var prestige = 0; //prestige

//Prestige choice
var creativityP = 0; //0 ONLY CHANGED BY PRESTIGE
var editP = 1; //1 
var uploadP = 1; //1

//IDEA
var ideaTimer = null;
var countDownTimer = null; //for number counting down in idea lightbulb
var creativity = 1 + creativityP; //creativity level - 1
var rangeIdea = 1; //value of Qt on range - 1
var ideaQl =  5; //value of Ql on range - 5
var ideasQt = 0; //amount of ideas ready to edit - 0
var ideasQtTotal = 0; //amount of ideas since beginning - 0
var ideaSpeed = 60000; //60000ms: speed of idea generation : the lower the number the faster ideas generate
var energy = 100; //current energy amount
var energyMax = 100; //max energy amount
var batchEnergyCost = 25; //cost of each batch of ideas
var energyRegenRate = 1; //amount of energy gained (per second)
var energyRegenTimer = null;
var energyRegenSpeed = 1000; //1000
var powerNap = false; //false - sleep automatically when 0 energy
var alarmClock = false; //false - wake up when fully regened

//SHOOT AND EDIT
var shootEdit = 200; //clicks required to edit a video - 200
var shootEditRem = 200; //number of remaining clicks - 200
var videosEdited = 0; //number of videos edited - 0
var videosEditedTotal = 0; //TOTAL number of videos edited - 0
var computerMemory = 1; //max videos edited - 1
var editPressSpeed = 100 * editP;//90ms ONLY CHANGED BY PRESTIGE - - ALSO CHANGE prestige changes!
var editorSpeed = 4; //how many times to call the function - 1

//UPLOAD
var ideaQlArray = newArray();
var videosUploaded = 0; //Videos online - 0
var averageQlNum = 0; //average Ql numerator - 0
var averageQl = 0; //average video quality after upload - 0
var likeDislikeFactor = 1; //factor used to change LDR directly - 1
var uploadSpeed = 1 * uploadP; //*100 - If changed the also change line 1164
var loadState = 0; //load state of progress bar
var autoUploadActivated = false; //0 for no 1 for yes

//SUBS
var views = 0;
var likeDislikeRatio = 0;
var subscribers = 0;

//CASH
var adAmount = 0;
var cashAmount = 0;
var adLoadMax = 1; //- 1
var income = 0;
var expenses = 0;
var expensesComp = 0;
var youtubePartner = 0; //0 for no 1 for yes

//VISIBLE STATE ON LOAD - functions that change these var are located in PROJECTS
var visibleAll = false;
var visiblePrestige = visibleAll;
var visibleEditBlock = visibleAll;
var visibleUploadBlock = visibleAll;
var visibleAnalyticsBlock = visibleAll;
var visibleCash = visibleAll;
var visibleAdAmount = visibleAll;
var visibleAutoEdit = visibleAll;
var visibleProjectedAverage = visibleAll;
var visibleExpenses = visibleAll;
var visibleIncome = visibleAll;
var visibleDonationBox = visibleAll;

//loadVisibleDivs(); //TO DELETE : FOR CODING PURPOSES

//COMMENTS
var comments = [
  {name: "love your content, subscribed!", type: "positive"},
  {name: "keep it up son! Love, Dad", type: "positive"},
  {name: "great vid, you deserve more views", type: "positive"},
  {name: "hahah that moment at 2min37", type: "positive"},
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
  {name: "check out my channel Thomas Loizel on YouTube", type: "positive"},
  {name: "Can I please get a shoutout?", type: "positive"},
  {name: "I approve this message", type: "positive"},
  {name: "I'm an aspiring rapper, and my new mixtape is out now!! Please check out my channel", type: "positive"},
  {name: "U know this rocks when people come back 2 years later!", type: "positive"},
  {name: "I'm on a marathon, watching all the videos from this channel", type: "positive"},
  {name: "favourited, liked, subscribed", type: "positive"},
  {name: "superb editing", type: "positive"},
  {name: "LOVE THIS", type: "positive"},
  {name: "I remove adblock for this channel only", type: "positive"},
  {name: "I would buy anything you sell right now", type: "positive"},
  {name: "This is too good", type: "positive"},
  {name: "Best channel by far", type: "positive"},
  {name: "you remind me of ThumbsUpMovies", type: "positive"},
  {name: "Don't ever quit youtube", type: "positive"},
  {name: "this is high quality content", type: "positive"},
  {name: "editing is on point", type: "positive"},
  {name: "hahaha toooo fuunnnyyy", type: "positive"},
  {name: "Who's still watching this in 2030?", type: "positive"},
  {name: "I once was blind, now I see!", type: "positive"},
  {name: "When will the next episode be out?", type: "positive"},
  {name: "You know what, i might just start making videos myself!", type: "positive"},
  {name: "who cares about being first anyways", type: "positive"},
  {name: "Are you planning on opening a secondary channel?", type: "positive"},
  {name: "You new mic makes your voice so soothing, ASMR-like", type: "positive"},
  {name: "More content please, i've already watched all your videos twice!", type: "positive"},
  {name: "I would be so cool if you created a gaming channel", type: "positive"},
  {name: "All your vids go in my favorites", type: "positive"},
  {name: "Instalike", type: "positive"},
  {name: "~(˘▾˘~) great videooo (~˘▾˘)~", type: "positive"},
  {name: "┏(･o･)┛i'm such a fan┗ (･o･) ┓", type: "positive"},
  {name: "(∫˘▽˘)∫ subbed", type: "positive"},
  {name: "<3 <3 <3 <3 <3 <3", type: "positive"},
  {name: "Never gonna give you up, never gonna let you doooown", type: "positive"},
  {name: "Your hair reminds me of Shane Dawson's", type: "positive"},
  {name: "Where did you get the same hoodies as Ray William Johnson?", type: "positive"},
  {name: "What do you think of the new iphone?", type: "positive"},
  {name: "I wish you would do a collab with NigaHiga", type: "positive"},
  {name: "Is it true you're roomates with Kassem G?", type: "positive"},
  {name: "I wanna grow up to be just like you", type: "positive"},
  {name: "mom doesnt no im watching ur vids until like midnite, theyre too good", type: "positive"},
  {name: "i didn't understand this video...", type: "negative"},
  {name: "This is terrible, unsubbed", type: "negative"},
  {name: "why was this in my recommendations?", type: "negative"},
  {name: "I never subbed to this channel", type: "negative"},
  {name: "was supposed to be funny", type: "negative"},
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
  {name: "how do u install Minecraft???", type: "negative"},
  {name: "I had to watch this my eyes closed", type: "negative"},
  {name: "this is where awkwardness was born...", type: "negative"},
  {name: "all your videos are the same", type: "negative"},
  {name: "who is your editor? Please fire him", type: "negative"},
  {name: "This is terrible editing", type: "negative"},
  {name: "Why is this in my recommendations", type: "negative"},
  {name: "Please quit youtube", type: "negative"},
  {name: "sub 4 sub?", type: "negative"},
  {name: "second", type: "negative"},
  {name: "no i was first", type: "negative"},
  {name: "This one time at bandcamp...check out my channel for more!!!", type: "negative"},
  {name: "Top 5 Rappers : 1.Eminem, 2.Slim Shady, 3. Stan, 4. B Rabbit, 5. Marshall", type: "negative"},
  {name: "I miss the old youtube", type: "negative"},
  {name: "I miss the old kanye", type: "negative"},
  {name: "Your intro is waaaay too long dude", type: "negative"},
  {name: "Stop telling me to 'smash that like button', so annoying", type: "negative"},
  {name: "Can we report a channel for low effort?", type: "negative"},
  {name: "Are you like 5 years old?", type: "negative"},
  {name: "You should be playing outside rather than making vids", type: "negative"},
  {name: "Sometimes i wonder if everyone should be allowed on the internet", type: "negative"},
  {name: "I wish i could unsub twice", type: "negative"},
  {name: "I liked so i could dislike even harder afterwards", type: "negative"},
  {name: "How can you still be using Windows Movie Maker in 2020?", type: "negative"},
  {name: "Even my dog edits videos better than this", type: "negative"},
  {name: "i can tell your palms were sweaty, knees were weak and arms were heavy when you shot this video", type: "negative"},
  {name: "I can barely hear your voice with my speakers all the way up :/", type: "negative"},
  {name: "This comment section is SAVAGE 🤣", type: "negative"},
    ];
  
var commentBox = [{comment:"👋 Welcome to notYouTube ", source:"story"},
                  {comment:"This is a game of patience, optimisation & problem-solving.", source:"story"},
                  {comment:"You're a young aspiring YouTuber, with high hopes and dreams.", source:"story"},
                  {comment:"This is a race to 100M subscribers. Fastest player wins!", source:"story"},
                  {comment:"Autosave is on, you can always close the page & come back later.", source:"story"},
                  {comment:"Desktop is recommended for optimal experience & performance.", source:"story"},
                  {comment:"Please share the game if you enjoyed it!", source:"story"},
                  {comment:"Good luck!", source:"story"},
                  ];

//project arrays
var ideaProjects = [
  ["Start thinking","Generate 1 idea","ideasQtTotal>=1","editAppear()","You can now edit videos <span class='boldRed'>[Edit appeared]</span>","story","Now let's edit your first ever video! Click & hold to edit."],
  ["Binge watch YouTube","Generate 5 ideas","ideasQtTotal>=5","upgradeCreativity(1);ideaRangeMax(rangeIdea);setTimeout(function(){qualityJudge()},2000)","17 hours later, inspiration is flowing <span class='boldRed'>[+1 Creativity]</span>","0","0"],
  ["Wear glasses","Generate 10 ideas","ideasQtTotal>=10","upgradeEnergyBatch(5)","Looking clever makes you feel clever <span class='boldRed'>[-5 Energy Cost]</span>","story","It takes you less effort to come up with ideas - you're a creative now. "],
  ["Invite a mate over","Generate 20 ideas","ideasQtTotal>=20","upgradeCreativity(1);ideaRangeMax(rangeIdea)","You brainstorm until dawn <span class='boldRed'>[+1 Creativity]</span>","0","0"],
  ["Write down your dreams","Reach 5.3 average video quality","averageQl>=5.3","upgradeCreativity(1);ideaRangeMax(rangeIdea)","Imagination is a beautiful thing <span class='boldRed'>[+1 Creativity]</span>","0","0"],
  ["Get a new mattress","Generate 35 ideas","ideasQtTotal>=35","energyRegenRate+=1","Underrated birthday gift <span class='boldRed'>[+1 Regen Rate]</span>","story","channelReplace you're committed to this channel now, even birthday gifts are for the grind. "],
  ["Watch the OGs of YouTube","Generate 45 ideas","ideasQtTotal>=45","upgradeCreativity(1);ideaRangeMax(rangeIdea)","Rhett and who? <span class='boldRed'>[+1 Creativity]</span>","0","0"],
  ["Power Nap","Generate 70 ideas","ideasQtTotal>=70","napAppear()","Surely Tim Ferris does this <span class='boldRed'>[Power Nap activated]</span>","story","You now fall asleep as soon as you hit 0 energy."],
  ["Take guitar lessons","Reach 1M views","views>=1000000","upgradeCreativity(2);ideaRangeMax(rangeIdea);creativeBlock()","Music channels seem to be a thing <span class='boldRed'>[+2 Creativity]</span>","story","Incredible channelReplace, one million people have watched your videos! That's more people than you can fathom. Suddenly, you crack under the pressure: you hit a creative block. Reach the next project to get your imagination back to normal! <span class='boldRed'>[Creativity = 1]</span>"],
  ["Creative block","Less than 4 average video quality","averageQl<=4","upgradeCreativity(10);ideaRangeMax(rangeIdea)","Happens to the best of us <span class='boldRed'>[+10 Creativity]</span>","negativeProject","That was awful, you'll never let that happen to you again."],
  ["Finish Netflix","Generate 200 ideas","ideasQtTotal>=200","upgradeCreativity(3);ideaRangeMax(rangeIdea)","Get that inspo <span class='boldRed'>[+3 Creativity]</span>","0","0"],
  ["Take Yoga classes","Generate 300 ideas & Pay $8k","ideasQtTotal>=300 && cashAmount >=8000","upgradeEnergyBatch(10);cashAmount-=8000","Helps you think clearly but wow that's expensive <span class='boldRed'>[-10 Energy Cost & -$8k]</span>","0",""],
  ["Buy a kitten","Generate 400 ideas & Reach 150M views & Pay $15k","views>=150000000 && ideasQtTotal>=400 && cashAmount >=15000","upgradeCreativity(5);ideaRangeMax(rangeIdea);cashAmount-=15000","They're the real OGs of YouTube <span class='boldRed'>[+5 Creativity & -$15k]</span>","0","0"],
  ["Buy an alarm clock","Generate 500 ideas & Pay $12","ideasQtTotal>=500 && cashAmount >=12","alarmAppear();cashAmount-=12","Because Apple's last update scrapped the feature <span class='boldRed'>[Alarm Clock activated]</span>","story","You now wake-up as soon as your energy is full."],
  ["Work out","Generate 650 ideas & Reach 9 average video quality","ideasQtTotal>=650 && averageQl>=9","energyRegenRate+=2","A few pushups and you're asleep <span class='boldRed'>[+2 Regen Rate]</span>","0",""],
  ["Buy a greenscreen","Reach 9.25 average video quality & Pay $30k","averageQl>=9.25 && cashAmount >=30000","upgradeCreativity(12);ideaRangeMax(rangeIdea);cashAmount-=30000","Your bedroom is now a creative cocoon <span class='boldRed'>[+12 Creativity & -$30k]</span>","0","0"],
  ["Meditate every morning","Generate 800 ideas","ideasQtTotal>=800","upgradeEnergyBatch(5)","Clear mind leads to great content - is a Buddhist saying <span class='boldRed'>[-5 Energy Cost]</span>","0",""],
  ["Figure out translating isn't plagiarism","Generate 900 ideas & Reach 3.5M subscribers","ideasQtTotal>=900 && subscribers>=3500000","upgradeCreativity(12);ideaRangeMax(rangeIdea)","Ask Math Podcast about it <span class='boldRed'>[+12 Creativity]</span>","0","0"],
  ["Start streaming video games","Reach 7M subscribers & Pay $50k","subscribers>=7000000 && cashAmount>=50000","upgradeCreativity(20);ideaRangeMax(rangeIdea);cashAmount-=50000","About to reach the Ender Dragon... <span class='boldRed'>[+20 Creativity & -$50k]</span>","0","0"],
  ["Start a daily vlog","Reach 10M subscribers & 5B views","subscribers>=10000000 && views>=5000000000","upgradeCreativity(40);ideaRangeMax(rangeIdea)","Daily routine and all <span class='boldRed'>[+40 Creativity]</span>","0","0"],
  ["End of projects","","views<1","","Congratulations <span class='boldRed'>[]</span>","",""],
];
var shootEditProjects = [
  ["Start Editing","Edit 1 video","videosEditedTotal>=1","uploadAppear()","You can now upload videos <span class='boldRed'>[Upload appeared]</span>","story","Congrats channelReplace, you've edited your first video. Try uploading it."],
  ["Watch an iMovie tutorial","Edit 3 videos","videosEditedTotal>=3","shootEdit-=25;lessClicks(24);clicksLeft()","Two hours later, you're a pro <span class='boldRed'>[-25 Clicks]</span>","0","0"],
  ["Borrow your sister's USB key","Edit 10 videos","videosEditedTotal>=10","upgradeMemory(1)","It shall never be returned <span class='boldRed'>[+1 Memory]</span>","0","0"],
  ["Buy a gaming mouse","Edit 15 videos & Pay $100","videosEditedTotal>=15&&cashAmount>=100","shootEdit-=25;lessClicks(24);cashAmount-=100;clicksLeft()","For that precious click speed <span class='boldRed'>[-25 Clicks & -$100]</span>","0","0"],
  ["Laptop upgrade","Edit 20 videos & Pay $500","videosEditedTotal>=20&&cashAmount>=500","shootEdit-=25;lessClicks(24);cashAmount-=500;clicksLeft()","Because tools make the man <span class='boldRed'>[-25 Clicks & -$500]</span>","0","0"],
  ["Hire an editor on Fiverr","Give your hand a break!","views>=0","expenses=1;autoEditAppear()","You'll pay him with exposure as well <span class='boldRed'>[AutoEditor Level 1 & -$1/s]</span>","0","0"],
  ["Delete old footage","Edit 30 videos","videosEditedTotal>=30","upgradeMemory(1)","You will live to regret that <span class='boldRed'>[+1 Memory]</span>","0","0"],
  ["Watch a Final Cut tutorial","Edit 50 videos","videosEditedTotal>=50","shootEdit-=50;lessClicks(49);clicksLeft()","Thirty hours later, you're a master <span class='boldRed'>[-50 Clicks]</span>","0","0"],
  ["Buy absurd amount of external hard drives","Pay $3k","cashAmount>=3000","upgradeMemory(2);cashAmount-=3000","It shall never be backed up <span class='boldRed'>[+2 Memory & -$3k]</span>","0","0"],
  ["Hire a 'professional' editor","Pay $10k & Reach 6.5 average video quality & 50k subscribers & 10M views","cashAmount>=10000&&averageQl>=6.5&&subscribers>=50000&&views>=10000000","upgradeEditorSpeed(6);expenses+=24;cashAmount-=10000","You met him in a bar... <span class='boldRed'>[AutoEditor Level 2 & -$10k & -$25/s]</span>","0","0"],
  ["1 month iCloud storage trial","Edit 200 videos & Pay $5k","videosEditedTotal>=200&&cashAmount>=5000","upgradeMemory(2);cashAmount-=5000","Forgot to unsubscribe one month later <span class='boldRed'>[+2 Memory & -$5k]</span>","0","0"],
  ["Switch to Adobe Premiere","Pay $12k","cashAmount>=12000","shootEdit-=25;lessClicks(24);cashAmount-=12000;clicksLeft()","Aaah now that's the sofware you need <span class='boldRed'>[-25 Clicks & -$12k]</span>","0","0"],
  ["Hire an experienced editor","Pay $15k & Reach 8.5 average video quality & 700k subscribers & 90M views","cashAmount>=15000&&averageQl>=8.5&&subscribers>=700000&&views>=90000000","upgradeEditorSpeed(10);expenses+=45;cashAmount-=15000","One of Casey's old editors <span class='boldRed'>[AutoEditor Level 3 & -$15k & -$70/s]</span>","0","0"],
  ["Sign up to SkillShare","Edit 666 videos","videosEditedTotal>=666","shootEdit-=25;lessClicks(24);clicksLeft()","This is not a product placement <span class='boldRed'>[-25 Clicks]</span>","0","0"],
  ["Convince parents that iCloud storage is useful","Pay $20k","cashAmount>=20000","upgradeMemory(2);cashAmount-=20000","That was a battle worth fighting for <span class='boldRed'>[+2 Memory & -$20k]</span>","0","0"],
  ["Get a AWS server","Pay $25k","cashAmount>=25000","upgradeMemory(5);cashAmount-=25000","Hopefully Jeff will see this game <span class='boldRed'>[+5 Memory & -$25k]</span>","0","0"],
  ["Hire a badass editor","Pay $50k & Reach 9.5 average video quality & 2M subscribers & 500M views","cashAmount>=50000&&averageQl>=9.5&&subscribers>=2000000&&views>=500000000","upgradeEditorSpeed(16);expenses+=100;cashAmount-=50000","This is getting real <span class='boldRed'>[AutoEditor Level 4 & -$50k & -$170/s]</span>","0","0"],
  ["Hire Casey himself","Pay $100k & Reach 10 average video quality & 10M subscribers & 2B views","cashAmount>=100000&&averageQl>=10&&subscribers>=10000000&&views>=1000000000","upgradeEditorSpeed(32);expenses+=130;cashAmount-=100000","Those vlogs teach you more than film school <span class='boldRed'>[AutoEditor Level 5 & -$100k & -$300/s]</span>","0","0"],
  ["End of projects","","views<1","","Congratulations <span class='boldRed'>[]</span>","",""],
];
var uploadProjects = [
  ["Start uploading","Upload 1 video","videosUploaded>=1","analyticsAppear()","Now get more subs! 100M ain't that hard <span class='boldRed'>[Analytics appeared]</span>","story","That was easy, channelReplace is now live!"],
  ["Upload videos from school library","Upload 3 videos","videosUploaded>=3","upgradeUploadSpeed(2)","You read books while you're there <span class='boldRed'>[+100kB/s Upload Speed]</span>","0","0"],
  ["Figure out how to use hotspot","Upload 15 videos & Pay $100","videosUploaded>=15 && cashAmount>=100","upgradeUploadSpeed(3);cashAmount-=100","Parents weren't please with the phone bill <span class='boldRed'>[+100kB/s Upload Speed & -$100]</span>","0","0"],
  ["Buy an ethernet cable","Upload 20 videos & Pay $500","videosUploaded>=20 && cashAmount>=500","upgradeUploadSpeed(4);cashAmount-=500","Old school but efficient <span class='boldRed'>[+100kB/s Upload Speed & -$500]</span>","0","0"],
  ["Convince parents WiFi isn't an NSA spying device","Upload 50 videos & Pay $2k","videosUploaded>=50 && cashAmount>=2000","upgradeUploadSpeed(7);cashAmount-=2000","Or is it..? <span class='boldRed'>[+300kB/s Upload Speed & -$2k]</span>","0","0"],
  ["Fail statistics class","Upload 75 videos","videosUploaded>=75","projectedAverageAppear()","But you can still calculate an average come on <span class='boldRed'>[Projected average based on videos ready to upload]</span>","0","0"],
  ["Ask Drew for Javascript lessons","Upload 100 videos","videosUploaded>=100","upgradeUploadSpeed(16)","You wonder if this will ever come in handy... <span class='boldRed'>[+900kB/s Upload Speed]</span>","0","0"],
  ["Code your own AutoUpload","Upload 125 videos & Reach 30k subscribers & 4M views ","videosUploaded>=125 && views>=4000000 && subscribers>=30000","autoUpload()","Cheers Drew <3 <span class='boldRed'>[Activate Auto Upload]</span>","0","0"],
  ["Drill a hole in wall for better WiFi","Upload 175 videos","videosUploaded>=175","upgradeUploadSpeed(20)","Grounded for a month :( <span class='boldRed'>[+400kB/s Upload Speed]</span>","0","0"],
  ["Convince mum to upgrade premium internet plan","Upload 350 videos & Pay $50k","videosUploaded>=350 && cashAmount>=50000","upgradeUploadSpeed(25);cashAmount-=50000","Worth it but you're paying boy <span class='boldRed'>[+500kB/s Upload Speed & -$50000]</span>","0","0"],
  ["Dad kindly installs a WiFi repeater","Upload 650 videos","videosUploaded>=650","upgradeUploadSpeed(70)","Love u dad <span class='boldRed'>[+4500kB/s Upload Speed]</span>","0","0"],
  ["Your building now has fibre-optic internet","Upload 1.2k videos","videosUploaded>=1200","upgradeUploadSpeed(200)","Can't get more efficient <span class='boldRed'>[+13000kB/s Upload Speed]</span>","0","0"],
  ["End of projects","","views<1","","Congratulations <span class='boldRed'>[]</span>","",""],
];
var subProjects = [
  ["Reply to comments","Reach 50 subscribers or 500 views","subscribers>=50 || views>=500","views+=200","Love you guys <span class='boldRed'>[+200 Views]</span>","0","0"],
  ["Pimp your video intro","Reach 100 subscribers or 1.5k views","subscribers>=100 || views>=1500","views+=500","Don't make it a minute long though <span class='boldRed'>[+500 Views]</span>","0","0"],
  ["Break the piggy bank","Reach 150 subscribers or 4k views","subscribers>=150 || views>=4000","cashAppear()","Opening a bank account as we speak <span class='boldRed'>[Money Time]</span>","0","0"],
  ["SMASH THAT LIKE BUTTON","Reach 300 subscribers","subscribers>=300","views+=5000","Reminding never hurts <span class='boldRed'>[+5k Views]</span>","0","0"],
  ["Balcony conversation with Jimmy","Reach 1k subscribers","subscribers>=1000","subscribers=subscribers*2","Gotta rep that moustache <span class='boldRed'>[Doubled your subscribers]</span>","0","0"],
  ["YouTube Partner","Reach 5k subscribers","subscribers>=5000","youtubePartner=1;adAmountAppear()","YouTube money is gonna be rolling in booooy <span class='boldRed'>[Ad Time]</span>","story","The dream just got a little closer to reality."],
  ["Write your titles in ALL CAPS","Reach 15k subscribers","subscribers>=15000","views+=200000","Those golden tips <span class='boldRed'>[+200k Views]</span>","0","0"],
  ["Spam your videos all over social media","Reach 20k subscribers","subscribers>=20000","views+=100000;LDRF(-0.1)","All your friends unsubbed, but it had to be done <span class='boldRed'>[-0.1 Popularity & +100k Views]</span>","0","0"],
  ["Apologize to your community for the spam","Reach 25k subscribers","subscribers>=25000","subscribers+=3000;LDRF(0.2)","Swallow your pride <span class='boldRed'>[+0.2 Popularity & +3k Subscribers]</span>","0","0"],
  ["Write an email to your fave YouTuber","Reach 40k subscribers","subscribers>=40000","subscribers+=0","He never answered. What did you expect? <span class='boldRed'>[+Still your fave tho :'( ]</span>","0","0"],
  ["Shoutout from Keemstar","Reach 50k subscribers","subscribers>=50000","LDRF(-0.2)","You got right into the neeeews <span class='boldRed'>[-0.2 Popularity]</span>","0","0"],
  ["Donate to charity","Reach 55k subscribers","subscribers>=55000","visibleDonationBox = true;donationBoxAppear()","Pandas have souls mkay <span class='boldRed'>[Donation Box unlocked]</span>","story","The Keemstar haters are getting to your head. Perhaps donating could improve your image."],
  ["Shoutout from MysteryGuitarMan","Reach 60k subscribers","subscribers>=60000","LDRF(0.1)","Will he ever take off his glasses? <span class='boldRed'>[+0.1 Popularity]</span>","0","0"],
  ["Master the art of thumbnails","Reach 100k subscribers","subscribers>=100000","views+=4000000","Bewbs in thumbnail seems to work... <span class='boldRed'>[+4M Views]</span>","story","Who would have thought channelReplace would reach six digits this soon?"],
  ["GIVEAWAY TIME","Reach 130k subscribers & Pay $8k","subscribers>=130000 && cashAmount>=8000","subscribers=subscribers*2;cashAmount-=8000","What a coincidence, your best friend won! <span class='boldRed'>[Doubled your subscribers]</span>","0","0"],
  ["Comment sub4sub on every video","Reach 500k subscribers","subscribers>=500000","views+=6000000","Hustling hustling <span class='boldRed'>[+6M Views]</span>","0","0"],
  ["Shoutout from RayWilliamJohnson","Reach 1M subscribers","subscribers>=1000000","LDRF(0.2)","Doing your mom =3 <span class='boldRed'>[+0.2 Popularity]</span>","story","channelReplace is about to snowball the next 99M subs!"],
  ["Shoutout from Logan Paul","Reach 1.6M subscribers","subscribers>=1600000","LDRF(-0.55)","Oh no... <span class='boldRed'>[-0.55 Popularity ]</span>","0","0"],
  ["Accomplish every YouTube challenge","Reach 2M subscribers","subscribers>=2000000","views+=10000000","Chubby bunny <span class='boldRed'>[+10M Views]</span>","0","0"],
  ["Shoutout from Philip DeFranco","Reach 2.5M subscribers","subscribers>=2500000","LDRF(0.4)","What's up you beautiful bastards <span class='boldRed'>[+0.4 Popularity]</span>","0","0"],
  ["Hit the trending page","Reach 3M subscribers","subscribers>=3000000","views+=15000000","Is that a good thing though? <span class='boldRed'>[+15M Views]</span>","0","0"],
  ["Shoutout from NigaHiga","Reach 3.5M subscribers","subscribers>=3500000","views+=20000000","Tee Hee! <span class='boldRed'>[+20M Views]</span>","0","0"],
  ["Shoutout from PewDiePie","Reach 4M subscribers","subscribers>=4000000","LDRF(1)","*Drop the mic* <span class='boldRed'>[+1 Popularity]</span>","0","0"],
  ["Go viral","Reach 4.5M subscribers","subscribers>=4500000","views+=100000000","If only it was always that easy <span class='boldRed'>[+100M Views]</span>","0","0"],
  ["Participate in YouTube Rewind","Reach 5M subscribers","subscribers>=5000000","LDRF(-0.8)","They can't seem to get it right <span class='boldRed'>[-0.8 Popularity]</span>","0","0"],
  ["Shoutout from Casey","Reach 10M subscribers","subscribers>=10000000","LDRF(1)","*Faints* <span class='boldRed'>[+1 Popularity]</span>","story","Trust me channelReplace, you're very close to finishing."],
  ["Figure out the algorithm","Reach 15M subscribers","subscribers>=15000000","LDRF(1)","You've just figured out internet's biggest secret <span class='boldRed'>[+1 Popularity]</span>","0","0"],
  ["Overtake PewDiePie","Reach 100M subscribers","subscribers>=100000000","endGame()","Thank you <span class='boldRed'>[Your time has been added to the scoreboard!]</span>","0","Now prestige and try to beat your score!"],
  ["End of projects","","views<1","","Congratulations <span class='boldRed'>[]</span>","",""],
];
var cashProjects = [
  ["Extra pocket money","Reach 5k views","views>=5000","cashAmount+=20","Mum was feeling generous <span class='boldRed'>[+$20]</span>","0","0"],
  ["Christmas","Reach 7k views","views>=7000","cashAmount+=80","Grandma's annual cheque is always appreciated <span class='boldRed'>[+$80]</span>","0","0"],
  ["Steal from mum's purse","Reach 10k views","views>=10000","cashAmount+=500","Sacrifices for the better good <span class='boldRed'>[+$500]</span>","0","0"],
  ["Steal from dad's wallet","Reach 15k views","views>=15000","cashAmount+=500","Ready for a whoppin' <span class='boldRed'>[+$500]</span>","0","0"],
  ["Sly fox","Be a YouTube Partner & Reach 6 average video quality","averageQl>=6 && youtubePartner==1","adLoadMax+=1","Nothing too intrusive for now... <span class='boldRed'>[+1 Ad Amount]</span>","story","channelReplace now entering the ad game..."],
  ["Loan from friends","Reach 6.3 average video quality","averageQl>=6.3","cashAmount+=2000","...and never pay them back <span class='boldRed'>[+$2k]</span>","0","0"],
  ["Greedy pig","Reach 1.5M views","views>=1500000","adLoadMax+=3","Those ads are getting kind of intrusive now <span class='boldRed'>[+3 Ad Amount]</span>","0","0"],
  ["Sell merch","Reach 2M views","views>=2000000","income+=1;incomeAppear();incomeUpdate()","That's all you wear from now on <span class='boldRed'>[+$1/s]</span>","story","Finally some stable income, you're gaining mum's trust"],
  ["Sign up to a 'get rich quick' course","Reach 5M views","views>=5000000","cashAmount+=5000","Definitely wasn't worth your time <span class='boldRed'>[+$5k]</span>","0","0"],
  ["Eat instant noodles for a year","Reach 10M views","views>=10000000","cashAmount+=10000","Saved some of that cash <span class='boldRed'>[+$10k]</span>","0","0"],
  ["Cash cow","Reach 30M views","views>=30000000","adLoadMax+=3","At least make them skippable <span class='boldRed'>[+3 Ad Amount]</span>","0","0"],
  ["Launch a Patreon","Reach 50M views","views>=50000000","income+=14;incomeUpdate()","Jack Conte 4 life <span class='boldRed'>[+$14/s]</span>","0","0"],
  ["Product placement","Reach 100M views","views>=100000000","cashAmount+=10000;subscribers-=50000","You hate that app, but it's worth the dough right? <span class='boldRed'>[+$10k & -50k Subscribers]</span>","0","0"],
  ["Adpocalypse","Reach 200M views","views>=200000000","adLoadMax+=3","You've made AdBlock a thing <span class='boldRed'>[+3 Ad Amount]</span>","0","0"],
  ["Sell overpriced ice-cream on the beach","Reach 500M views","views>=500000000","cashAmount+=15000","Supply and demand my friend <span class='boldRed'>[+$15k]</span>","0","0"],
  ["Sell your rare Pokemon cards","Reach 1B views","views>=1000000000","cashAmount+=20000","Broke your heart <span class='boldRed'>[+$20k]</span>","0","0"],
  ["End of projects","","views<1","","Congratulations <span class='boldRed'>[]</span>","",""],
];

load(); //REMOVE FOR TESTING

//PAGE LOAD FUNCTIONS for first load
firstPageLoad();
function firstPageLoad() {
  if(ideasQtTotal == 0 && emptyArrayUsed == false){
    //ideasGen(); //generate one idea to start off with
    disableButton("subAdButton",true);
    disableButton("addAdButton",true);
    disableDiv("cashProjectsB","none");
    disableButton("startTimer",true);
    disableButton("myonoffswitch",true); //autoEdit switch disabled
    disableDiv("onOffSwitchContainer","none"); //autoEdit switch div non clickable
    disableDiv("childFlexEdit","none");
    disableDiv("uploadB","none");
    disableDiv("subAdButton","none");
    disableDiv("addAdButton","none");
    if(prestige == 0 && channel == "unknown"){displayInsertName()}; //insert channel name only on prestige 0
    ideaRangeMax(1); //for prestige creativity bonus
    upgradeUploadSpeed(1);
    setTimeout(helpBeforeBulbStory, 45000);
  }
}

//PAGE LOAD FUNCTIONS
memoryBlockRefresh();//refreshes the memory block canvas
//BulbOn();
stopIdeaTicker(); //sleep
upgradeEnergyBatch(0);
//clearInterval(energyRegenTimer); // IS THIS LINE NECESSARY?
commentArrayShift(); //to show story comments
loadVisibleDivs(); //if visible variables are true
console.log("This isn't what we meant by problem-solving. Get out of here!");
refreshFitty();
if(emptyArrayUsed == false){emptyArray()};

//inital comment before first flash
function helpBeforeBulbStory() {
  if (commentBox[0].comment !== "Patience is a virtue - it will always take you 1 minute of thinking to generate ideas."){
  commentBox.unshift({comment:"Patience is a virtue - it will always take you 1 minute of thinking to generate ideas.",source:"callProject"});
  commentArrayShift();
  }
}
//inital comment on first flash
function helpBulbStory() {
  commentBox.unshift({comment:"Your light bulb just flashed after 1 minute of thinking, you've generated your first idea(s)!",source:"callProject"});
  commentArrayShift();
}
//to help player start in right direction (called on second idea project)
function qualityJudge(){
  if(averageQl >= 4){
    commentBox.unshift({comment:"Quality over quantity, that's the way to go!",source:"story"});
  }
  else {
    commentBox.unshift({comment:"I'm sure you can produce better quality content!",source:"story"})
  }
  commentArrayShift();
}


//empty array help
function emptyArray() {
  emptyArrayTimer = setInterval(function(){
    var ideaLength = ideaQlArray.length;
      if(ideasQtTotal >= 30 && ideaLength > 5 && emptyArrayUsed == false){
      emptyArrayModal.style.display = "block";
    }
  },5000);
}

function energyUpdate() {
  energy -= batchEnergyCost;
  document.getElementById("energy").innerHTML = energy;
  subDifferenceColor(-batchEnergyCost,"energyRefreshNum");
}

function energyRegen() {
    if (energy >= energyMax) {
      energy = 100;
      if(alarmClock == true){startIdeaTicker()};
    }
    else if (energy < energyMax) {
      energy += energyRegenRate;
      subDifferenceColor(energyRegenRate,"energyRefreshNum");
    }
    document.getElementById("energy").innerHTML = energy;
}

//function to reduce energy batch cost
function upgradeEnergyBatch(num){
  batchEnergyCost-=num;
  if (document.getElementById("startTimer").disabled == true || document.getElementById("startTimer").disabled == false && energy == 100) {
    document.getElementById("energyRefreshNum").innerHTML = -batchEnergyCost
  }
}

var countDownNum; //discrete, hidden, camouflaged global variable, dont @ me
function bulbTimerOn() {
  countDownNum = 59;
  countDownTimer = setInterval(function(){
    if (countDownNum > 0) {
      document.getElementById("bulbCountDown").innerHTML = countDownNum;
      countDownNum--;
    }
    else {
      bulbTimerOff();
    }
  },1000);
}

function bulbTimerOff() {
  clearInterval(countDownTimer);
  countDownNum = 60;
  document.getElementById("bulbCountDown").innerHTML = countDownNum;
}

//start idea ticker
function startIdeaTicker() {
  document.getElementById("bulbCDcontainer").style.display = "block"; 
  setTimeout(function(){ document.getElementById("energyRefreshNum").innerHTML = -batchEnergyCost; }, 2500);
  if(energy >= batchEnergyCost) {
    BulbOn(); //initial energy check when pressing THINK
    bulbTimerOff()
    bulbTimerOn();
    thinking();
  }
  else {
    thinking(); //you can still click on think with insufficient energy
    bulbTimerOff();
    document.getElementById("bulbCDcontainer").style.display = "none";
  };

  ideaTimer = setInterval(function() {
    if (ideasQtTotal == 0){helpBulbStory()}; //for beginning story comment 
    if (energy >= batchEnergyCost * 2) { //energy check inside loop
      bulbTimerOff();
      bulbTimerOn();
      ideasGen();
      BulbOn();
      energyUpdate();
      thinking();
    }
    else if(energy < batchEnergyCost * 2 && energy >= batchEnergyCost) { //energy check inside loop
      ideasGen();
      energyUpdate();
      thinking();
    }
    if (energy < batchEnergyCost) {
      clearInterval(ideaTimer);
      BulbOff();
      bulbTimerOff();
      document.getElementById("bulbCDcontainer").style.display = "none";
      if (powerNap == true){stopIdeaTicker()};
    }
  },ideaSpeed);
  clearInterval(energyRegenTimer);
}

//think button activated
function thinking() { //activates Think button without generating ideas (Ideagen)
  disableButton("startTimer",true);
  disableDiv("startTimer","none");
  disableButton("stopTimer",false);
  disableDiv("stopTimer","auto");
}

//stop idea ticker : SLEEP
function stopIdeaTicker() {
  clearInterval(ideaTimer);
  clearInterval(energyRegenTimer);
  disableButton("startTimer",false);
  disableDiv("startTimer","auto");
  disableButton("stopTimer",true);
  disableDiv("stopTimer","none");
  BulbOff();
  bulbTimerOff();
  document.getElementById("bulbCDcontainer").style.display = "none";
  energyRegenTimer = setInterval(energyRegen,energyRegenSpeed);
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
function autoEdit() {
  const checkBox = document.getElementById("myonoffswitch");
  if (checkBox.checked == true && cashAmount > expenses) {
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
function autoUpload() {
  var uploaderTimer = setInterval(function() {
    if (loadState == 0){ //&& cashAmount > 0
    uploadVideo();};
    },1000/(uploadSpeed*uploadP));
  autoUploadActivated = true;
}

//start timer2 _ NOT A FUNCTION
window.setInterval(function() {
  subsRefresh();
  viewsRefresh();
  cashGen();
  autoEdit();
  cashRefresh();
},1000);

//calculate score every minute
window.setInterval(function() {
  calculateScore();
},1000);

//calls comments every minute
window.setInterval(function() {
  callComment();
},120000);

//saves every 5s
window.setInterval(function() {
  save(); //REMOVE FOR TESTING
},5000);                   

//Upgrades creativity
function upgradeCreativity(num) {
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

//Creative block project
function creativeBlock(){
  upgradeCreativity(-6);
  ideaRangeMax(6);
}

//Adds up range value quantities in ideas generated and calculates Ql array
function ideasGen() {
  rangeIdea = parseInt(rangeIdea);
  var arrayAdd = newArray(ideaQl, rangeIdea);
  ideaQlArray = ideaQlArray.concat(arrayAdd);
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
function pipeline() {
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

//click hold for edit
SECircleContainer.addEventListener("touchstart", pressingDownEdit);
SECircleContainer.addEventListener("touchend", pressingUpEdit);
SECircleContainer.addEventListener("touchcancel", pressingUpEdit);

SECircleContainer.addEventListener("mousedown", pressingDownEdit);
SECircleContainer.addEventListener("mouseup", pressingUpEdit);
SECircleContainer.addEventListener("mouseleave", pressingUpEdit);
childFlexTopNoRightClick.addEventListener('contextmenu', event => event.preventDefault());
var editInterval = null;
var editIntervalOn = false;

function pressingDownEdit(event) {
    if ((event.type == "touchstart" || (event.type == "mousedown" && event.button == 0)) && editIntervalOn == false) { //event.button to confirm left click
      editInterval = setInterval(clicksLeft,editPressSpeed);
      editIntervalOn = true;
    }
}

function pressingUpEdit() {
  clearInterval(editInterval);
  editIntervalOn = false;
}

//function for edit projects
function lessClicks(num){
  if (ideasQt > 0){
    shootEditRem -= num
  }
  else {
    shootEditRem -= (num + 1)
  }
}

//Shoot & Edit
function clicksLeft() {
  if(shootEditRem < 0) {
    shootEditRem = 0 ;
    //document.getElementById("editClicks").innerHTML = shootEditRem;
  }
  else if(shootEditRem > 0 && ideasQt > 0) {
    shootEditRem -= 1 ;
    //document.getElementById("editClicks").innerHTML = shootEditRem;
  }
  else if(shootEditRem == 0 && ideasQt > 0 && videosEdited < computerMemory) {
    clearInterval(editInterval); //to stop mousedown editing at every new edited video
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
function drawMemory(x, y, w, h) {
  var cns1 = document.getElementById("memoryCanvas");
  var ctx = cns1.getContext("2d");
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.stroke();
}

//draws empty memory slots at start
function memoryEmpty() {
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
function drawSquare(x, y, w, h) {
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
function upgradeMemory(num) {
  computerMemory += num;
  memoryBlockRefresh();
}

//change upload speed
function upgradeUploadSpeed(para) {
  uploadSpeed = para;
  let uploadSpeedConversion = uploadSpeed * 100 * uploadP;
  document.getElementById("uploadSpeed").innerHTML = uploadSpeedConversion+" kB/s";
}

//change editor speed
function upgradeEditorSpeed(para) {
  editorSpeed = para;
  document.getElementById("editorSpeed").innerHTML = editorSpeed+" clicks/sec";
}

var width = 0; // used for uploadVideoState() as well
//Upload video
function uploadVideo() {
  if (videosEdited > 0 && loadState == 0) {
    loadState = 1;
    disableButton("uploadB",true);
    disableDiv("uploadB","none");
    var elem = document.getElementById("myBar");
    width = 1;
    var id = setInterval(frame, 1000/(uploadSpeed*uploadP));
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        loadState = 0;
        elem.style.width = 0 + "%";
        videosUploaded++;
        document.getElementById("videos").innerHTML = numeral(videosUploaded).format('0,0');
        videosEdited--;
        //document.getElementById("videosEdited").innerHTML = videosEdited;
        averageQlCalculation(); //calculated average Ql at each upload
        ideaQlArray.shift(); //pulled out of averageQlCalculation for load funtion, placement here is important
        updateArrayQlView(); //update array to view
        LDR(); //calculated new ratio at each upload
        SubsFromUpload(); //calculated sub count at each upload
        viewsFromSubs(); //calculated view count at each upload
        memoryBlockRefresh(); //refreshes the memory block canvas
        averageQlCalculationProjected(); //calculate projected average
      } 
      else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

function uploadVideoState() {
  if (width > 0 & width < 100 || videosEdited == 0) {
    disableButton("uploadB",true);
    disableDiv("uploadB","none");
  }
  else {
    disableButton("uploadB",false);
    disableDiv("uploadB","auto");
  }
}

//calculate average video quality
function averageQlCalculation() {
  let nextQl = ideaQlArray[0];
  averageQlNum += nextQl;
  averageQl = averageQlNum/videosUploaded;
  document.getElementById("averageQl").innerHTML = averageQl.toFixed(2);
  //document.getElementById("arrayQl").innerHTML = ideaQlArray;
}

//calculate projected average video quality
function averageQlCalculationProjected() {
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
function changeAdLoad(number) {
  if(number == 1){
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
  document.getElementById("likeDislikeRatio").innerHTML = likeDislikeRatio + "%";
}

//Change LDRF
function LDRF(factor) {
  likeDislikeFactor += factor;
  LDR();
  LDRColor();
  document.getElementById("likeDislikeFactor").innerHTML = numeral(likeDislikeFactor).format('0.00');
}

//increase subscriber count
function SubsFromUpload() {
  LDRColor();
  var subInitial = subscribers;
  if(likeDislikeRatio >= 50){
    subscribers += videosUploaded * parseInt(likeDislikeRatio/10);
  }
  else if(likeDislikeRatio >= 30 && likeDislikeRatio < 50){
    subscribers += videosUploaded * parseInt(likeDislikeRatio/10)/2;
  }
  else{
    subscribers -= videosUploaded * parseInt(30-likeDislikeRatio/10);
  }
  if (subscribers < 0){
    subscribers = 0;
  }
  var subsRound = subscribers.toFixed();
  document.getElementById("subscriberAmount").innerHTML = numeral(subsRound).format('0,0');
  var subDiff = subscribers - subInitial;
  subDifferenceColor(subDiff,"subDifference");
}

//to ad color indication on LDR
function LDRColor() {
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
function subsRefresh() {
  //var subInitial = subscribers;
  if (likeDislikeRatio >= 50){
    subscribers += videosUploaded * likeDislikeRatio * Math.exp(likeDislikeRatio*0.02) * 0.0005;
  }
  else {
    subscribers -= videosUploaded * (50-likeDislikeRatio) * Math.exp((50-likeDislikeRatio)*0.02) * 0.0005;
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
function subDifferenceColor(v, ele) { //v is a number for green or red animation, ele is a string the chosen element
  var vRound = v.toFixed();
  var element = document.getElementById(ele);
  var clone = element.cloneNode(true);
  element.parentNode.replaceChild(clone, element);
  if (v < 0){
    clone.innerHTML = vRound;
    clone.classList.remove("animatedGreen");
    clone.classList.add("animatedRed");
  }
  else {
    clone.innerHTML = "+"+vRound;
    clone.classList.remove("animatedRed");
    clone.classList.add("animatedGreen");
  }
}

//Views from subs
function viewsFromSubs() {
  views += subscribers;
  views = Math.floor(views);
  document.getElementById("views").innerHTML = numeral(views).format('0,0');
}

//views calculation
function viewsRefresh() {
  if(views > 0){views+=0.25}; //at least one view a second for the messed up start
  views += 0.05*subscribers;
  var viewsRound = views.toFixed();
  document.getElementById("views").innerHTML = numeral(viewsRound).format('0,0');
}

//videos * adload = cash
function cashGen() {
  cashAmount += 0.01*videosUploaded*Math.log10(views+1)*adAmount;
  document.getElementById("cashAmount").innerHTML = numeral(cashAmount).format('$0,0.00');
}
  
// refreshes cash amount with income and expenses
function cashRefresh() {
  cashAmount += income - expenses + expensesComp; //expenses corresponds to AutoEdit
  document.getElementById("cashAmount").innerHTML = numeral(cashAmount).format('$0,0.00');
}

//function for circular progress bar
function setPercentage(v) {
  document.getElementById("clicksLeft").innerHTML = shootEditRem;
  //$('.mask span').html(shootEditRem);
  var perct = v*3.6;
  if(v >= 50) {
      $('.right-block').css('background','inherit'); 
      perct = perct - 180;
  }
  else{
      $('.right-block').css('background','#ccc'); 
  }
  $('.right-block').css('transform','rotate('+perct+'deg)'); 
}

//call comments
function callComment() {
  if(videosUploaded>0 && subscribers<100000000){
    commentBox.unshift({comment:commentType(),source:"callComment"});
    commentArrayShift();
  }
}
  
//décaler comments
function commentArrayShift() {
  var i = 0;
  do {
     var commentId = "comment" + (i+1);
      commentStyle(commentBox[i].source,commentId);
      document.getElementById(commentId).innerHTML = commentBox[i].comment;
      i++;
  } while(i < 8);
  
  if (commentBox.length > 8){
      commentBox.pop();
  }
}

//comment css style
function commentStyle(commentSource,id) {
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
  if (eval(array[0][2]) == true && array.length > 0) {
      eval(array[0][3]);
      var com = array[0][0].concat(" - ",array[0][4]);
      commentBox.unshift({comment:com,source:"callProject"});
      commentArrayShift();
      if(array[0][5]!=="0" && array[0][6]!=="0"){ //comments for storyline, such as negative effect projects
        var str = array[0][6];
        var res = str.replace("channelReplace", channel);
        commentBox.unshift({comment:res,source:"story"});
        setTimeout(function(){ commentArrayShift(); }, 3000);
      }
      array.shift();
      document.getElementById(elementId).className = "project";//to make next project immediately red
      flickAppear("project",num);
      document.getElementById(projectTitle).innerHTML = array[0][0];
      document.getElementById(projectDesc).innerHTML = array[0][1];
  }
}

//test project conditions
function testProjects() {
  var projectArrays = [ideaProjects, shootEditProjects, uploadProjects, subProjects, cashProjects];
  var projectIds = ["ideaProjectsB", "shootEditProjectsB", "uploadProjectsB", "subProjectsB", "cashProjectsB"]
  for (var i = 0; i < 5; i++) {
    let project = projectArrays[i];
    let id = projectIds[i]
    if(eval(project[0][2]) == true && project.length > 0){
      document.getElementById(id).className = "project valid";
    }
    else if(project[0][5]=="negativeProject"){
      document.getElementById(id).className = "project negativeProject";
    }
    else {document.getElementById(id).className = "project"};
  }
  uploadVideoState(); //to grey out upload button
}

//flickering effect on appearing objects
function flickAppear(class1,num) {
  clearInterval(testTimer);
  var element = document.getElementsByClassName(class1)[num];
  var clone = element.cloneNode(true);
  element.parentNode.replaceChild(clone, element);
  clone.classList.remove("animated");
  clone.classList.add("animated");
  testTimer = setInterval(testProjects,500);
}
//flickering effect on appearing objects THAT APPEAR ONCE (eg blocks)
function flickAppearOnce(class1,num) {
  clearInterval(testTimer);
  var element = document.getElementsByClassName(class1)[num];
  element.classList.add("animated");
  testTimer = setInterval(testProjects,500);
}

//function to enable/disable buttons : the button will not be clickable
function disableButton(button,state) {
  document.getElementById(button).disabled = state;
}

//function to enable/disable divs : the mouse pointer will not appear (chose "none" or 'auto')
function disableDiv(div,state) {
  document.getElementById(div).style.pointerEvents = state;
}

//SAVE AND LOAD

function save(){
  var gameSavePrestige = {
    channel: {variable: channel, idf:"personnaliseFirstComment()"},
    prestige: {variable: prestige},
    visiblePrestige: {variable: visiblePrestige},
    creativityP: {variable: creativityP},
    editP: {variable: editP},
    uploadP: {variable: uploadP},
  }
  localStorage.setItem("NYsaveP",JSON.stringify(gameSavePrestige));
  
  var gameSave = {
    channel: {variable: channel},
    bad: {variable: bad},
    score: {variable: score},
    prestige: {variable: prestige},
    radius: {variable: radius},
    energy: {variable: energy, id:"energy"},
    batchEnergyCost: {variable: batchEnergyCost},
    energyRegenRate: {variable: energyRegenRate},
    powerNap: {variable: powerNap},
    alarmClock: {variable: alarmClock},
    sleepModalReminder: {variable: sleepModalReminder},
    emptyArrayUsed: {variable: emptyArrayUsed},
    editPressSpeed: {variable: editPressSpeed},
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
    editorSpeed: {variable: editorSpeed, idf:"upgradeEditorSpeed(editorSpeed)"},
    ideaQlArray: {variable: ideaQlArray, idf:"updateArrayQlView()"},
    videosUploaded: {variable: videosUploaded, id:"videos"},
    averageQlNum: {variable: averageQlNum},
    averageQl: {variable: averageQl, idf:"document.getElementById('averageQl').innerHTML = averageQl.toFixed(2)"},
    likeDislikeFactor: {variable: likeDislikeFactor, idf:"LDRF(0)"},
    uploadSpeed: {variable: uploadSpeed, idf:"upgradeUploadSpeed(uploadSpeed)"},
    views: {variable: views, idf:"viewsRefresh()"},
    adAmount: {variable: adAmount, id:"adLoad"},
    likeDislikeRatio: {variable: likeDislikeRatio, idf:"LDR()"},
    subscribers: {variable: subscribers, idf:"subsRefresh()"},
    cashAmount: {variable: cashAmount, idf:"cashRefresh()"},
    adLoadMax: {variable: adLoadMax},
    expensesComp: {variable: expensesComp},
    expenses: {variable: expenses, idf:"expensesUpdate()"},
    income: {variable: income, idf:"incomeUpdate()"},
    youtubePartner: {variable: youtubePartner},
    autoUploadActivated: {variable: autoUploadActivated},
    ideaProjects: {variable: ideaProjects, idf:"projectRefresh(ideaProjects,ideaProjectsTitle,ideaProjectsDesc)"},
    shootEditProjects: {variable: shootEditProjects, idf:"projectRefresh(shootEditProjects,shootEditProjectsTitle,shootEditProjectsDesc)"},
    uploadProjects: {variable: uploadProjects, idf:"projectRefresh(uploadProjects,uploadProjectsTitle,uploadProjectsDesc)"},
    subProjects: {variable: subProjects, idf:"projectRefresh(subProjects,subProjectsTitle,subProjectsDesc)"},
    cashProjects: {variable: cashProjects, idf:"projectRefresh(cashProjects,cashProjectsTitle,cashProjectsDesc)"},
    commentBox: {variable: commentBox, idf:"callComment()"},
    donationCost: {variable: donationCost},
    visiblePrestige: {variable: visiblePrestige},
    visibleEditBlock: {variable: visibleEditBlock},
    visibleUploadBlock: {variable: visibleUploadBlock},
    visibleAnalyticsBlock: {variable: visibleAnalyticsBlock},
    visibleCash: {variable: visibleCash},
    visibleAdAmount: {variable: visibleAdAmount},
    visibleAutoEdit: {variable: visibleAutoEdit},
    visibleProjectedAverage: {variable: visibleProjectedAverage, idf:"averageQlCalculationProjected()"},
    visibleExpenses: {variable: visibleExpenses},
    visibleDonationBox: {variable: visibleDonationBox},
    visibleIncome: {variable: visibleIncome, idf:"loadVisibleDivs()"} //this must be last
  };
  localStorage.setItem("NYsave",JSON.stringify(gameSave));
}

function projectRefresh(array,title,desc) {
  document.getElementById(title.id).innerHTML = array[0][0];
  document.getElementById(desc.id).innerHTML = array[0][1];
}

function load() {
  var gameSavePrestige = JSON.parse(localStorage.getItem("NYsaveP"));
  for (var element in gameSavePrestige) {
    window[element] = gameSavePrestige[element].variable;
    let idx = gameSavePrestige[element].id;
    if (typeof idx !== "undefined") {
      document.getElementById(idx).innerHTML = gameSavePrestige[element].variable;
    } 
    let idf = gameSavePrestige[element].idf;
    if (typeof idf !== "undefined") {
      eval(idf);
    }
  }
  var gameSave = JSON.parse(localStorage.getItem("NYsave"));
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
  //prestige changes repetition because variables init come before load()
  if (creativity==1){creativity += creativityP};
  if (editPressSpeed==100){editPressSpeed = 100 * editP}; //EDITPRESSSPEED TO BE CHANGED HERE
  if (uploadSpeed==1){uploadSpeed = 1 * uploadP}; 
}

function deleteLocalStorage() {
  var restartModal = document.getElementById("restartModal");
  restartModal.style.display = "block";
    // Get the <span> element that closes the modal
  var closeModal = document.getElementById("closeRestartModal");
    // When the user clicks on <span> (x), close the modal
  closeModal.onclick = function() {
      restartModal.style.display = "none";
  }
}

//document listener
document.addEventListener('visibilitychange', function() {
  if(document.hidden && window.innerWidth > 1120 && sleepModalReminder == true) {
    stopIdeaTicker();
    document.getElementById("myonoffswitch").checked = false;
  }
  else if (window.innerWidth > 1120 && sleepModalReminder == true) { 
    sleepingModal.style.display = "block";
  }
});

//to close modals by clicking out
window.onclick = function(event) {
  const modal = document.getElementById("scoreModal");
  if (event.target == modal) {
    modal.style.display = "none";
    clearInterval(scoreRefresh);
  }
}

//sleep modal option1
function sleepModalReminderTrue(){
  sleepModalReminder = true;
  save();
  location.reload();
}

//sleep modal option2
function sleepModalReminderFalse(){
  sleepModalReminder = false;
  save();
  location.reload();
}

//emptyarray modal option1
function emptyArrayModalFalse() {
  clearInterval(emptyArrayTimer);
  emptyArrayUsed = true;
  save();
  emptyArrayModal.style.display = "none";
}

//emptyarray modal option2
function emptyArrayModalTrue() {
  var ideaLength = ideaQlArray.length;
  ideaQlArray.splice(0,ideaLength);
  videosEditedTotal -= videosEdited;
  videosEdited = 0;
  updateArrayQlView();
  memoryBlockRefresh();
  ideasQtTotal -= ideaLength;
  ideasQt = 0;
  document.getElementById("ideasGenTotal").innerHTML = numeral(ideasQtTotal).format('0,0');
  document.getElementById("ideasGen").innerHTML = numeral(ideasQt).format('0,0');
  clearInterval(emptyArrayTimer);
  emptyArrayUsed = true;
  save();
  location.reload();
}

//restart modal option1
function restartModalFalse(){
  var restartModal = document.getElementById("restartModal");
  restartModal.style.display = "none";
}

//restart modal option2
function restartModalTrue(){
  localStorage.removeItem("NYsave");
  localStorage.removeItem("NYsaveP");
  ga("send", "event", "Delete Save", "Click");//NOT USED?
  location.reload();
}

//display insert name modal
function displayInsertName(){
  var channelName = document.getElementById("channelModal");
  channelName.style.display = "block";
}

//record name
function insertName(){
  if(document.getElementById("channelInput").value !== ""){
    channel = document.getElementById("channelInput").value;
  }
  else {
    channel = "user301";
  }
  personnaliseFirstComment();
  var channelName = document.getElementById("channelModal");
  channelName.style.display = "none";
}
function personnaliseFirstComment(){
  commentBox[0].comment = "👋 Welcome to notYouTube  " + "<span style='color:red'>" + channel + "</span>";
  document.getElementById("comment1").innerHTML = commentBox[0].comment;
}

//prevent spaces in channel ame
function CheckSpace(event)
{
   if((event.which == 32) || (event.which == 222) || (event.key == "'"))
   {
    event.preventDefault();
    return false;
   }
}

//game score
function calculateScore(){
  if(subscribers<100000000){
  score += 1;
  }
}

let scoreRefresh; //Timer and function to update score/time in scoreboard when open
function scoreRefreshTimer() {
  document.getElementById("showScore").innerHTML = numeral(score).format('00:00:00')
  if(subscribers<100000000){
    scoreRefresh = setInterval(function(){
      document.getElementById("showScore").innerHTML = numeral(score).format('00:00:00');
    }, 1000);
  }
  else {document.getElementById("showScore").innerHTML = numeral(score).format('00:00:00')}
}

//open scoreboard
function scoreModalOpen(){
  badboi();
  scoreRefreshTimer();
  const scoreboard = document.getElementById("scoreModal");
  scoreboard.style.display = "block";
  const closeModal = document.getElementById("closeScoreModal"); //to close modal through x
  closeModal.onclick = function() {
    scoreboard.style.display = "none";
    clearInterval(scoreRefresh);
  }
}

//close scoreboard ONLY FOR Select prestige bonus
function scoreModalClose(){ 
  const scoreboard = document.getElementById("scoreModal");
  scoreboard.style.display = "none";
}

//RETRIEVE ALL SCORE FROM BACK
async function allScores(){
  const response = await fetch('https://notyoutube-back.herokuapp.com/retrieveScore');
  const data = await response.text();
  const obj = JSON.parse(data);
  updateTable(obj);
  updateLoading();
}

function updateTable(object){
  for (var i = 0; i < 10; i++) {
  let channelID = "tdChannel"+(i+1);
  let prestigeID = "tdPrestige"+(i+1);
  let scoreID = "tdScore"+(i+1);
  document.getElementById(channelID).innerHTML = object[i].channel;
  document.getElementById(prestigeID).innerHTML = object[i].prestige;
  document.getElementById(scoreID).innerHTML = numeral(object[i].score).format('00:00:00');
  }
  document.getElementById("showScore").innerHTML = numeral(score).format('00:00:00');
}
function updateLoading(){
  document.getElementById("loading").style.display = "none";
  document.getElementById("loaded").style.display = "block";
}

//SEND SCORE TO BACK
async function sendScore(){
  if (bad == true && window.innerWidth > 800) {score = 86400};
  const data = {channel, prestige, score};
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
        },
    body: JSON.stringify(data)
    };
  const response = await fetch('https://notyoutube-back.herokuapp.com/newScore', options);
  const json = await response.json();
  allScores();
  getRank(); //get rank
};


//RETRIEVE RANK
async function getRank(){
  const sendChannel = {channel};
  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(sendChannel)
  };
  const response = await fetch('https://notyoutube-back.herokuapp.com/retrieveRank', options);
  const data = await response.text();
  const obj = JSON.parse(data);
  showRank(obj)
}

function showRank(obj){
if (obj.length != 0){
  let rank = numeral(obj[0].row_number).format('0o');
  document.getElementById("rank").style.display = "block";
  document.getElementById("rankNumber").innerHTML = rank;
}
else {
  console.log('no rank')
}
}


//Confetti
function startConfetti(){
  confetti.start(3000, 50, 150); //throws a random number of confetti particles (between 50 and 150) for 1200 milliseconds (3 seconds)
}


//END OF GAME FUNCTION
function endGame(){
  sendScore(); //send score to db
  clickablePrestigeOptions(); //which bonus have already been used
  prestigeOptions(); //open modal with final score
  scoreModalOpen(); //open score modal (underneath beacause of html order)
  //allScores(); //show all scores
  startConfetti(); //start confetti yay
  const winSound = new Audio("winSound.mp3");
  var promise = winSound.play();
if (promise !== undefined) {
    promise.catch(error => {
        // Auto-play was prevented
    }).then(() => {
        // Auto-play started
    });
}
}

//PRESTIGE FUNCTIONS BELOW
function prestigeOptions() {
  document.getElementById("gotoprestige").style.display = "block";
  document.getElementById("currentOrFinal").innerHTML = "final";
  var prestigeModal = document.getElementById("prestigeModal");
  prestigeModal.style.display = "block";
}

//if varibales aren't equal to initial state, then deactivate div
function clickablePrestigeOptions(){
  if(creativityP !== 0){
    disableDiv("option1","none");
    document.getElementById("option1").style.backgroundColor = "LightGrey";
    document.getElementById("option1").style.borderColor = "grey";
  }
  if(editP !== 1){
    disableDiv("option2","none");
    document.getElementById("option2").style.backgroundColor = "LightGrey";
    document.getElementById("option2").style.borderColor = "grey";
  }
  if(uploadP !== 1){
    disableDiv("option3","none");
    document.getElementById("option3").style.backgroundColor = "LightGrey";
    document.getElementById("option3").style.borderColor = "grey";
  }
}

function prestigeOptionSelect(option) {
  if(option=="option1"){creativityP = 1}
  if(option=="option2"){editP = 0.5}
  if(option=="option3"){uploadP = 2}
  visiblePrestige = true;
  prestige+=1;
  save();
  localStorage.removeItem("NYsave");
  window.location.reload();
}