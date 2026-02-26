

const { Command } = require('commander');
const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');
const readline = require('readline');

const program = new Command();
const API_KEY = 'YOUR_API_KEY'; // <-- Remplace ici

program
  .name('ultimate-cli')
  .description('All exercises combined in one file')
  .version('1.0.0');

/* =====================================
   GREET COMMAND
===================================== */
program
  .command('greet')
  .description('Afficher un message coloré')
  .argument('[name]', 'Nom à saluer')
  .action((name = 'Ninja') => {
    console.log(
      chalk.green.bold(`\n🥷 Bonjour ${name}!`) +
      chalk.blue('\nMission prête.\n')
    );
  });

/* =====================================
   FETCH COMMAND
===================================== */
program
  .command('fetch')
  .description('Récupérer des données depuis une API publique')
  .action(async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1'
      );

      console.log(chalk.yellow('\nDonnées récupérées :'));
      console.log(response.data);
      console.log();
    } catch (error) {
      console.error(chalk.red('Erreur :'), error.message);
    }
  });

/* =====================================
   READ COMMAND
===================================== */
program
  .command('read')
  .description('Lire un fichier')
  .argument('<file>', 'Chemin du fichier')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(chalk.red('Erreur lecture :'), err.message);
        return;
      }

      console.log(chalk.cyan('\nContenu du fichier :\n'));
      console.log(data);
    });
  });

/* =====================================
   WEATHER COMMAND
===================================== */
program
  .command('weather')
  .description('Afficher la météo d’une ville')
  .argument('[city]', 'Nom de la ville')
  .action(async (city) => {

    if (!city) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question('Entrez une ville : ', async (answer) => {
        await getWeather(answer);
        rl.close();
      });

    } else {
      await getWeather(city);
    }
  });

/* =====================================
   WEATHER FUNCTION
===================================== */
async function getWeather(city) {
  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      }
    );

    const { name, main, weather } = response.data;

    console.log(chalk.yellow.bold(`\n🌍 Météo à ${name}`));
    console.log(chalk.cyan(`Température : ${main.temp}°C`));
    console.log(chalk.green(`Condition : ${weather[0].description}\n`));

  } catch (error) {
    console.error(chalk.red('Erreur météo :'), error.response?.data?.message || error.message);
  }
}

program.parse(process.argv);