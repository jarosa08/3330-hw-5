import chalk from 'chalk';
import prompts  from 'prompts';
import crypto from 'crypto';
import { writeFile } from 'fs'; 


// game title
let gameTitle = `GUESS THE NUMBER!`;
// line
let line = `\u2500`.repeat(30);
// instructions
let instructions = `Guess a number between 1 and 10.`;
// rules
let rules;
// game over
let gameOver = `GAME OVER!`;
//thanks for playing message
let thanksMessage = `Thanks for playing!`;
// cuurent attempt message
let currentAttempt;
// question
let question = `Enter a number between 1 and 10:`;

// number of attempts
const attempts = 3;
// secret number
const secretNumber = crypto.randomInt(10)+1; // from (0 to 9)+1 -> (1 to 10)
// message saying secret number
const secretNumberMessage = `The secret number was ${secretNumber}.`;
// if user has guessed correctly or not
let guess = false;
// message
let message = "";

// file name
let file = `game.txt`;
// text to be in file
let text = "";

(async () => {
    console.log(chalk.magenta.bold(gameTitle));
    text += gameTitle + '\n';
    console.log(chalk.blue.bold(line));
    text += line + '\n';
    console.log(chalk.white(instructions));
    text += instructions + '\n';
    rules = `You have ${attempts} attempts!`;
    console.log(chalk.yellow(rules));
    text += rules + '\n';
    console.log();
    text += '\n';

    for (let counter = 0; counter < attempts && guess == false; counter++)
    {
        try
        {
            // update current attempt
            currentAttempt = `Attempt ${counter+1}/${attempts}: `;

            const response = await prompts({
                type: 'text',
                name: 'value',
                message: `${currentAttempt} ${question}`
            });
            text += currentAttempt + question + ' ';
            text += response.value + '\n';
            
            // if undefined/crtl+c
            if (response.value === undefined)
            {
                guess = true; // to end loop
                throw new Error(`Cancelled by User.`);
            }

            // trim response
            let myValue = response.value.trim();
            
            // restricting/handing errors
            // if empty
            if (myValue == "")
                throw new Error(`A guess is required.`);
            // if not a number
            if (Number(myValue) == NaN)
                throw new Error(`Not a number.`);
            // if not an integer
            if (Number.isInteger(Number(myValue)) == false)
                throw new Error(`Not a whole number.`);
            // if less than 1
            if (Number(myValue) < 1)
                throw new Error(`Guess is less than 1.`);
            // if greater than 10
            if (Number(myValue) > 10)
                throw new Error(`Guess is greater than 10.`);
  
            // too high, equal, too low
            // if secretNumber < value <= 10
            if (Number(myValue) <= 10 && Number(myValue) > secretNumber)
                message = `Too high!`;
            // if value == secretNumber
            else if (Number(myValue) == secretNumber)
            {
                guess = true;
                message = `You guessed right!`;
            }
            // if 1 <= value < secretNumber
            else
                message = `Too low!`;

            // if guessed go green else yellow
            console.log(((guess)?chalk.green:chalk.yellow)(message));
            text += message + '\n';
        }
        catch(error)
        {
            console.error(chalk.red(error));
            text += error + '\n';
        }
        
        console.log();
        text += '\n';
    }
    console.log();
    text += '\n';
    console.log(chalk.red.bold(gameOver));
    text += gameOver + '\n';
    console.log(secretNumberMessage);
    text += secretNumberMessage + '\n';
    console.log();
    text += '\n';
    console.log(chalk.magenta.bold(thanksMessage));
    text += thanksMessage + '\n';

    console.log();
    // print to file
    writeFile(file, text, (err) => {
        if (err) throw err;
        console.log(`File '${file}' has been saved!`);
    });
})();