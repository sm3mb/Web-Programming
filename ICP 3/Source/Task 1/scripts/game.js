function play(playerSelection) {
    var randomNumber = Math.random(); // Generating a random number
    var computerSelection;
    if(randomNumber < 0.3) { // if the random number is between 0 & 0.3 then computer is rock
        computerSelection = 'rock';
    } else if (randomNumber < 0.6) { // if the random number is between 0.3 & 0.6 then computer is paper
        computerSelection = 'paper';
    } else { // if the random number is between 0.6 & 1 then computer is paper
        computerSelection = 'scissors';
    }
    // Reading the elements with help of id
    document.getElementById('playerSelection').innerHTML = playerSelection;
    document.getElementById('computerSelection').innerHTML = computerSelection;
    decide(playerSelection, computerSelection); //Call a function with player and computer selections
}

function decide(player, computer) {
    var result;
    // Reading the score elements
    playerScore = parseInt(document.getElementById('player_score').innerHTML);
    computerScore = parseInt(document.getElementById('computer_score').innerHTML);
    // Resetting the Score elements on each game
    document.getElementById('player_score').innerHTML = '';
    document.getElementById('computer_score').innerHTML = '';
    // Logic for Rock Paper Scissors Game
    if(player === computer) {
        // alert('Tie');
        result = 'Its a Tie !!!';
    } else {
        if(player === 'rock') {
            if(computer === 'paper') {
                // alert('Computer Wins');
                computerScore++;
                result = 'Computer Wins !!!';
            } else {
                // alert('Player Wins');
                playerScore++;
                result = 'Player Wins !!!';
            }
        } else if(player === 'paper') {
            if(computer === 'scissors') {
                // alert('Computer Wins');
                computerScore++;
                result = 'Computer Wins !!!';
            } else {
                // alert(' Player Wins');
                playerScore++;
                result = 'Player Wins !!!';
            }
        } else { // here player selection is 'scissors'
            if(computer === 'rock') {
                // alert('Computer Wins'); 
                computerScore++;
                result = 'Computer Wins !!!';
            } else {
                // alert(' Player Wins');
                playerScore++;
                result = 'Player Wins !!!';
            }
        }
    }
    // Updating the elements with the result of game
    document.getElementById('player_score').innerHTML = playerScore;
    document.getElementById('computer_score').innerHTML = computerScore;
    document.getElementById('result').innerHTML = result;
    document.getElementById('result').classList.add("result");
}