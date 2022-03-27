# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Abdelrahman Abdelmonsef**

Time spent: **8** hours spent in total


Link to project: https://glitch.com/edit/#!/sl-memory-game


## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Hearts added to the top to indicate the remaining false attempts.
- [x] Player can change the game difficulty from 1 to 10, which increase/decrease the acceleration of the playback. 

## Video Walkthrough (GIF)
<br> 
<img src= "https://github.com/ayahia1/Memory-Game/blob/main/App_Walkthrough.gif" width = 100% height = 450> <br>



## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

- W3Schools, Stack Overflow, https://github.com/scrimba/learn-javascript


2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

- My biggest challenge working on this submission was to add a countdown timer to limit the time available for the user to enter their guess, which makes the game more difficult. The instructions recommend using the setInterval function for this purpose. So, I looked it up and understood how it should work together with clearInterval. However, my first thought of using it was to set the function delay to be the full time allowed for the user. This way, right after the time expires, the user loses a point, the ID gets cleared, a new setInterval with a different ID starts. This approach didn't seem right for many reasons, the biggest of which is that using it this way would be nearly identical to the setTimeOut function, and you didn't recommend it. Thus, I spent another 10~15 minutes googling on how to use setInterval to initiate a countdown timer till I found a stack overflow question regarding a similar thing. Reading this post inspired me to use the correct idea: set the interval of this function to 1 and after each second, decrement the timer variable, which shows on the screen, and check if the time is less than zero to decide if a point should be deducted or not. One additional sub-challenge for implementing this timer was managing its interactions with the game elements when the user loses a point without having to rewrite much of the already existing code. To handle this, I used the already-existing guess() function but with a unique ID (-1) as its parameter. Given its negative value, it will always follow the losing branch because all buttons have positive indices. The negative value also indicates that this point's loss results from time expiration, not a wrong guess, which pops a different message to the screen. Of course, this reuse of the guess function resulted in a few errors, which I kept debugging for 30 minutes using "console.log()" statements to monitor the game flow.

3. What questions about web development do you have after completing your submission? 

- Working through your instructions and looking up independently, I noticed the frequent use of terminologies like child, parent, grandchild, etc. These terminologies are usually associated with the tree's data structure, and the use of trees to represent these objects makes perfect sense to me. Are objects (HTML elements) represented under the hood as tree nodes? If so, which is the tree root? Also, in javascript, when we access HTML elements, do we access them in log(n) time (as in BST) or other complexities? If not O(1), do we have to care about the access speed when implementing code in real web applications, or is it not a big deal?
- In this web application, we only have one webpage where everything happens. I wonder what we need to do if our application had more than one web page. For example, I thought of having one page where the user sets the game options, one for the game, and a final one to display a message with an image after the game ends. In this case, do we have to create other HTML files? If so, should each file have its javascript and CSS files? I guess that by linking the existing files into any new HTML files, they will work. However, is this a good practice in the industry? What are the pros and cons for each?
- For the current game, changing the page dimensions will result in some default changes in the shape and dimensions of the existing elements. Can we specify a specific behavior of the page to bypass this default one when its dimensions change? The answer seems yes because many applications seem to do so. However, to do so, do we need to have some other tools installed into our development environment where we can import somewhere in the HTML file to do this? or can we do this just by being smart about the HTML basic syntax?


4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. 

- I would have made the sound played by these patterns more complex (probably a short part of an audio file). Building upon that, instead of playing a pattern that makes random "music," I can then make this pattern plays more engaging audio, such as the new Adele song's music or the main theme of Interstellar. Playing these things, I believe, would have made the game more interesting for a wide array of users. 
- Currently, adjusting the game difficulty will only decrease the clue hold time with the progress of the audio pattern, but it won't change the time allowed for the user to play it back. Having more time, I would have adjusted the play-back time so that a more difficult game corresponds to less time and vice versa. 
- Currently, users have to play with only these six buttons. If I had time, I would have let the users choose how many buttons to have in the game using a slider that ranges from 2 to 10. 
- Finally, I would have changed the styles for some of the elements in the game. I think the game background needs to be a lighter color so that I can style the game buttons to be more vivid and noticeable. For example, I would be able to make the hearts, which indicates the remaining attempts, red instead of white. Furthermore, I would have styled the start and stop buttons differently from each other to make them more distinguishable and, more importantly, indicative of their function. 



## Interview Recording URL Link

 [My 5-minute Interview Recording]

## License

    Copyright Abdelrahman Abdelmonsef

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

