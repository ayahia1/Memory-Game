let pattern = [2, 2, 4, 3, 5, 1, 2, 4]; 
//storing the pattern of button presses
let progress = 0; 
//indicate how far the player went in guessig the pattern
//(will be used as an index in the pattern array)
let gamePlaying = false;
//as the name suggests, indicates wether the user is actively
//playing or not

let tonePlaying = false;
let volume = 0.5;
let guessCounter = 0;

let guessMistakes = 0; //keep track of the number of user mistakes 
const max_guess_Mistakes = 3; //max number of allowed mistakes

let clueHoldTime = 1000; //how long to hold each clue light/sound
const cluePauseTime = 333; //how long to pause between clues
const nextClueWaitTime = 1000; //how long to wait before playing a sequence

let clueHoldDec = 0; //how much to decrement the clueHoldTime after each turn (speed the game)
                    //initialize to zero (assigned value in startGame function)

//sliders functions & variables for game difficulty
let slider = document.getElementById("myRange");
slider.oninput = () => {
  document.getElementById("diff-output").innerHTML = slider.value;
};
let gameDifficulty = 6;


//length of the pattern (Game length)

function generatePattern(patternLength){
  //function that generates random patter array of length patternLength
  //the generated pattern contains number from 1 to 5 (since we got 5 buttons)
  
  let newPattern = [];
  for (let i = 0; i < patternLength; i++){
    let newNum = Math.floor(Math.random() * 6) + 1;
    newPattern.push(newNum);
  }
  return newPattern;
}

let startGame = () =>{
  //initialize game variables
  progress = 0;
  gamePlaying = true;
  clueHoldTime = 1000;
  guessMistakes = 0;
  
  pattern = generatePattern(5); //generate the patter
  
  
  gameDifficulty = slider.value - 1; //set the game difficulty to the slider's value - 1
  
  clueHoldDec = Math.floor(Math.floor(gameDifficulty / 10 * clueHoldTime) / pattern.length); 
  //decrement each time by this value, the final hold time should be close to (10 - gameDifficulty)/10 of 
  //the start curHoldTime value = 1000
  
  
  let heartsAllowed = "";
  for (let i = 0; i < max_guess_Mistakes - guessMistakes; i += 1){
    heartsAllowed += `&hearts; `;
  }
  /* resetting the score and the allowed attempts */
  document.getElementById(`mistakes-cnt`).innerHTML = heartsAllowed;
  document.getElementById(`score-val`).innerHTML = progress;
  
  //swap start and stop buttons
  document.getElementById('startBtn').classList.add('hidden');
  document.getElementById('stopBtn').classList.remove('hidden');
  playClueSequence();
};


let stopGame = () => {
  gamePlaying = false;
  
  //swap start and stop buttons again
  document.getElementById('stopBtn').classList.add('hidden');
  document.getElementById('startBtn').classList.remove('hidden');
}

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2,
  5: 500, 
  6: 261.6
}

function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05,0.025)
  context.resume()
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}

function startTone(btn){
  if(!tonePlaying){
    context.resume()
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    context.resume()
    tonePlaying = true
  }
}

function stopTone(){
  g.gain.setTargetAtTime(0, context.currentTime + 0.05,0.025)
  tonePlaying = false
}


// Init Sound Synthesizer
let AudioContext = window.AudioContext || window.webkitAudioContext 
let context = new AudioContext()
let o = context.createOscillator()
let g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)


function lightButton(btn){
  document.getElementById("btn-" + btn).classList.add("lit")
}

function clearButton(btn){
  document.getElementById("btn-"+ btn).classList.remove("lit")
}


function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

function playClueSequence(){
  guessCounter = 0;
  
  context.resume()
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i <= progress;i++){ // for each clue that is revealed so far
   // console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
}

function loseGame(){
  stopGame();
  alert("Game Over. You lost!");
}

function winGame(){
  stopGame();
  setTimeout(() => alert("Congratulations. You won!"), 500);
}

function guess(btn){
  
  //console.log("user guessed: " + btn);
  
  if(!gamePlaying){
    //we are not playing right now ignore
    return;
  }
  
  if (btn != pattern[guessCounter]){
    // if the click was on a wrong button
    guessMistakes += 1;
    if (guessMistakes > max_guess_Mistakes){
      loseGame();
    }
    else {
        alert(`Wrong Guess, Take another shot for the last one!`);
        let heartsAllowed = "";
        for (let i = 0; i < max_guess_Mistakes - guessMistakes; i += 1){
            heartsAllowed += `&hearts; `;
        }
        document.getElementById(`mistakes-cnt`).innerHTML = heartsAllowed;
    }
    return;
  }
  
  //if the click was correct
  if (guessCounter == progress){
    progress += 1;
    document.getElementById(`score-val`).innerHTML = progress;
    //if this is the last click in this turn
    if (progress == pattern.length){
      // if last turn, you win the game
      winGame();
    }
    else{
      // if not the last turn, move to the next one
      clueHoldTime -= clueHoldDec;
      //console.log(clueHoldTime)
      playClueSequence();
    }
  }
  else {
    //if not the last click in the turn, move to the next click
    guessCounter += 1;
  }
}

