import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
var playerName = '';
let score = 0;
let lifes = 3;
// Arrow function to delay the welcome message
const sleep = () => new Promise(resolve => setTimeout(resolve, 2000));
async function welcome() {
    console.log("+-----------------------------------+");
    const rainbow = chalkAnimation.rainbow('Welcome to the Number Guessing Game!');
    await sleep();
    rainbow.stop();
}
// Random number generation function
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// Main function
async function main() {
    await welcome();
    console.log(chalk.redBright('Guessing Game Rules!!!'));
    console.log(chalk.blue("-> Choose a number between 1 to 10:"));
    console.log(chalk.blue("-> You have 3 lifes to guess the number: "));
    console.log("+-----------------------------------+");
    const randomNum = randomNumber(1, 10);
    // Ask player name
    var answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'player',
            message: 'Enter your name: ',
        },
    ]);
    // save player name in string
    playerName = answer.player.toString();
    do {
        // check if player has lifes
        lifes--;
        // Ask player name and number
        var answer = await inquirer.prompt([
            {
                type: 'number',
                name: 'user_number',
                message: 'Guess a number: ',
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return chalk.red('Please enter a number!');
                    }
                    return true;
                }
            }
        ]);
        // check if player guess is correct 
        if (parseInt(answer.user_number) === randomNum) {
            // score increment to 10 on correct guess
            score = score + 10;
            console.log(chalk.greenBright('You win!'));
        }
        else if (parseInt(answer.user_number) > randomNum) {
            console.log(chalk.redBright('You Guessed high!'));
            console.log("Lifes left: " + chalk.redBright(lifes));
        }
        else if (parseInt(answer.user_number) < randomNum) {
            console.log(chalk.redBright('You Guessed low!'));
            console.log("Lifes left: " + chalk.redBright(lifes));
        }
    } while (lifes > 0 && parseInt(answer.user_number) !== randomNum);
    if (lifes == 0 && parseInt(answer.user_number) !== randomNum) {
        console.log("---------------------------");
        console.log(chalk.redBright(">-- You Lose!!! --<"));
        console.log("---------------------------");
        console.log(chalk.blueBright("The Number was: " + randomNum));
        console.log(chalk.bgRed("Game Over!!!"));
    }
    console.log("\n");
    // print score board
    console.log(chalk.greenBright("Score Board!!!"));
    console.log("===============================================");
    console.log(chalk.blue(`Player: ${playerName}\t Score: ${score}`));
    console.log("===============================================");
}
// Play again function
async function playAgain() {
    do {
        // Reset score and lifes
        lifes = 3;
        score = 0;
        // call the main function
        await main();
        var playagain = await inquirer.prompt([
            {
                type: "input",
                name: "play_again",
                message: "Do you want to play again? (y/n): "
            }
        ]);
    } while (playagain.play_again === 'y' || playagain.play_again === 'Y');
}
// Call the function here
playAgain();
