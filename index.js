import chalk from 'chalk';
import prompts  from 'prompts';
import crypto from 'crypto';

// number of attempts
const attempts = 3;
// secret number
const secretNumber = crypto.randomInt(10)+1; // from (0 to 9)+1 -> (1 to 10)
// message saying secret number
const secretNumberMessage = `The secret number was ${secretNumber}.`;
// if user has guessed correctly or not
let guess = false;
// message
let message;

console.log(chalk.magenta.bold(`GUESS THE NUMBER!`));
console.log(chalk.blue.bold(`\u2500`.repeat(30)));
console.log(chalk.white(`Guess a number between 1 and 10.`));
console.log(chalk.yellow(`You have ${attempts} attempts!`));
console.log();

(async () => {
    for (let counter = 0; counter < attempts && guess == false ; counter++)
    {
        console.log(`Attempt ${counter+1}/${attempts}: `);
        const response = await prompts({
            type: 'number',
            name: 'value',
            message: 'Enter a number between 1 and 10:'
        });

        // if empty
        if(response.value === "")
            message = `A guess is required.`;
        // if value > 10
        else if (response.value > 10)
            message = `Guess can't exceed 10`;
        // if secretNumber < value <= 10
        else if (response.value <= 10 && response.value > secretNumber)
            message = `Too high!`;
        // if value == secretNumber
        else if (response.value == secretNumber)
        {
            guess = true;
            message = `You guessed right!`;
        }
        // if 1 <= value < secretNumber
        else if (response.value < secretNumber && response.value >= 1)
            message = `Too low!`;
        // else value < 1
        else
            message = `Guess must be at least 1.`;
        
        console.log(chalk.yellow(message));
        console.log();
    }
    console.log();
    console.log(chalk.red.bold(`GAME OVER!`));
    console.log(secretNumberMessage);
    console.log();
    console.log(chalk.magenta.bold(`Thanks for playing!`));

})();

