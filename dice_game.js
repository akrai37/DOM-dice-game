/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundscore, activePlayer, gameplaying, prevdice; //All these are global variables. 'gameplaying' is a binary variable defined as 'true' in init() fn. Unless the button satisfies the 'true' condition, its data won't be executed.
init();

//dice=  Math.floor(Math.random()*6 )+ 1;
//console.log(dice);

//document.querySelector('#current-'+ activePlayer).textContent= dice; //'document' is the object that will give JS access to the DOM. 'querySelector'(method of 'document' object) is used to select and manipulate the content of the web page.
                                                                     //the data in the brackets represents the 'id' of element in the html file whose data is selected.'textContent' stores the values to be displayed and can overwrite the previous values if it exists.
//document.querySelector('#current-'+ activePlayer).innerHTML= '<em>' + dice+ '</em>'; //we have 'innerHTML' as a replacement 'textContent' which only accepts data in the html format, starting and ending with 'string' values.

var x= document.querySelector('#score-0').textContent; //'textContent' can also be simply used to read the values.
console.log(x);

//document.querySelector('.dice').style.display='none'; //we can also manipulate the CSS values using same object as previous. 'style' indicates chanding th estyle of element mentioned(here, it is dice).we are changing the display of it by setting it to 'none'.
                                                      //'.dice' means that it is a class.
//there is another way of calling an 'id' element from the source file(here html). It is by using 'getElementById()' method of 'document'. Then we won't need '#' to write the 'id' name.Also, below 4 lines are not necessary here because I added them in the init() fn.It is just for information about 'getElementById'.
document.getElementById('score-0').textContent=0;
document.getElementById('score-1').textContent=0;
document.getElementById('current-0').textcontent=0;
document.getElementById('current-1').textcontent=0;


/***designing the 'roll dice' button function *****/
document.querySelector('.btn-roll').addEventListener('click', function(){ //'addEventListener()' contains an event and a fn (fn is the eventlistener) as arguments. 'event' is the name of the work it does(here 'click') and the 'EventListener' is the function that defines it.
                                                                          //the fn can be defined either internally(like in this case) OR externally and then placing it here for the 'addEventListener' to call it.
    if(gameplaying){
            //1. Random number
            var dice= Math.floor(Math.random()* 6) + 1;

           //2. displaying the result which includes displaying the image of dice which we stopped previously.
            var diceDOM= document.querySelector('#dice-1');// '#dice-1' is a 'id' which is representing an 'image'(refer html source file).  We are calling the image and storing it in a different variable(it doesnt matter what image it is right now because we are gonna change it according to the dice number) .
            diceDOM.style.display='block'; //making the display of 'diceDOM' as 'block'(making the whole spac occupied by '.dice' class as just a block)
            diceDOM.src= 'dice-'+ dice +'.png'; //we have changed or manipulated the source of '.dice' letting it equal to the name of one of the dice images present in the folder.

            //3.Update the round score IF the number is not 1.
            if(dice!==1){
                    //add score
                    roundscore+= dice;
                    if((dice+ prevdice)==12){
                      //making the main score of active player 0 because of '6' on previous and current dice.
                       score[activePlayer]=0 ;
                      //updating the 0 score value in the '#score-' id of active player in DOM or simply in DOM.
                       document.querySelector('#score-'+ activePlayer).textContent=score[activePlayer];
                      //calling the fn 'nextplayer()' to change the active player.
                       nextplayer();
                        }
                    else{ //this 'else' is most the time executed.
                          //adding core to the UI
                          document.querySelector('#current-'+ activePlayer).textContent= roundscore; //adding the value of current score which is stored in 'roundscore' variable into the DOM(main source file OR the HTML file).
                          prevdice=dice; //'prevdice' is a global variable that will store the current value of dice. So, when we press the 'roll' button again, if the 'dice' value and 'prevdice' value, both are 6, then the above 2nd 'if' condition will be executed.This is the perfect place to put this line of code.think.
                        }
                  }
            else{
                  //next Player
                  nextplayer(); //This fn will be used if the upper condition is not met. Note:- This fn will also be used for 'hold-button' but the difference is that for 'roll-dice' button(current one), overall score for .cont.
                                //BOTH the players will become 0(look at the code) but it wont for 'hold-button'. So, values will keep adding to the main score until it reaches the 'winner' value.
            }
    }
});


/*** designing 'hold' button function ****/
document.querySelector('.btn-hold').addEventListener('click',function(){
     if(gameplaying){
            //add current score to the GLOBAL score.
            score[activePlayer]+= roundscore;
            //add score to the UI.
            document.querySelector('#score-'+ activePlayer).textContent=score[activePlayer];

            //taking input from user for deciding the winning value. It is not necessary to take the input value outside this event. It is not mandatory to give the user value in the 'Winning value' box ONLY when we hit the 'hold' button, we can place the value any time.Now, when we press the 'hold' button , cont.
            //if the value is already present(entered by user), then it will be considered winning value otherwise 100 will be assigned as winning value in the 'finalinput' variable.
            var inputbyuser= document.querySelector('.final-score').value;
            var finalinput;

            if(inputbyuser){
                finalinput=inputbyuser;//if 'inputbyuser' has a value present, it will be store in the 'finalinput' variable. else, 'finalinput' value will be 100.
            }
            else{
                finalinput=100;
            }
            //check if player won the game.
            if(score[activePlayer]>= finalinput){
                    document.querySelector('#name-'+ activePlayer).textContent='Winner!';
                    document.querySelector('.dice').style.display='none';
                    document.querySelector('.player-'+ activePlayer+'-panel').classList.add('winner');
                    document.querySelector('.player-'+ activePlayer+'-panel').classList.remove('active');
                    gameplaying=false; // we are making 'gameplaying' variable false here because we have got our winner and with logic, no more game should be played because it is over.So, next time when we will click on any button(hold or roll), it won't work because 'gameplaying' has become false. cont.
                  }                    // we gotta press 'new-game' button to reset everything in order to start the new game.
            else{
                 //turn to the next player
                 nextplayer();
               }
    }
});

/****A function to change the active player and all the elements related to it. ***/
function nextplayer(){
            activePlayer==0 ? activePlayer=1 : activePlayer=0; //if the number on dice is 1,then the active player will change. We have used ternary fn for this simple condition. We could have also used if-else.
            roundscore=0; //changing the current score of the current player to 0 (score in the red box).
            prevdice=0; //making the last value of dice equal to 0.It is possible when the active player changes and he rolls no.6 on his dice, previous value of dice(stored in 'prevdice') also has 6(rolled by previous active player),
                        //thus making the condition of their sum as 12 TRUE that will lead to skipping or cutting the chance of active player which is wrong.
            document.getElementById('current-0').textContent= '0'; //making the current score of player 1 as 0.note:- Remember, 'roundscore' is just a variable that represents the current score of the current player. It has to be assigned in the DOM  which is what we are doing in this line of code.
            document.getElementById('current-1').textContent= '0';///making the current score of player 2 as 0.

            document.querySelector('.player-0-panel').classList.toggle('active');// 'active' is a class that changes the looks of the panel. We have to toggle the 'active' class with respect to the active player.
                                                      // 'toggle' adds the class if it is there and removes it if it is NOT there. In this else statement, it will change the panel to the other player.(Remember, the 'else' condition will only be activated when there is a change in active player and so, toggling will happen)
            document.querySelector('.player-1-panel').classList.toggle('active');// another point is, in the html code, we have mentioned 'active' class for the 1st player only, as an initial assigning. It will then toggle the 'active' class when player changes.

          //  document.querySelector('player-0-panel').classList.add('active'); //another method to remove and add the panel.It is not viable because 'add' and 'remove' are not switchable here. So, changing players after getting 1 would be a problem.
          //  document.querySelector('player-1-panel').classList.remove('active');

            //document.querySelector('.dice').style.display='none'; // it will disappear the '.dice' class(image of dice) when we change the player.
}


/**** designing 'new-game' button ****/
document.querySelector('.btn-new').addEventListener('click',init);//This button is used for introducing new game.Here, we are not defining an anonymous fn. Instead, we have passed a fn that we have defined externally.cont.
                                                                  //We are not gonna use parenthesis because we are not calling the fn, we are simply passing it.'addEventListener' will call the fn.
//below fn is used for initialization. It is also used by the 'new-game' button when the game is finished for resetting.
function init(){
        score= [0,0];
        roundscore= 0;
        activePlayer= 0;
        gameplaying=true;
        prevdice=0;

        document.querySelector('#dice-1').style.display='none';

        document.querySelector('.final-score').value=''; //making the 'winning value' in the box as empty string .

        document.getElementById('score-0').textContent='0';
        document.getElementById('score-1').textContent='0';
        document.getElementById('current-0').textContent= '0';
        document.getElementById('current-1').textContent= '0';
        document.querySelector('#name-0').textContent='Player-1';
        document.querySelector('#name-1').textContent='Player-2';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active'); // we will add the 'active' fn to the 1st player, as it was in the beginning.
  }

//NOTE:- There is a way of delaying certain work. For ex:-delaying calling of a certain method. Its code looks something like this-  setTimeout(nextPlayer, 500);

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
