import { prompt } from "./prompt.js";

class Pokemon {
  constructor(name, emoji, health, attacks) {
    this.name = name;
    this.emoji = emoji;
    this.health = health;
    this.maxHealth = health;
    this.attacks = attacks;
  }
  randomAttack() {
    const randomIndex = Math.floor(Math.random() * this.attacks.length);
    return this.attacks[randomIndex];
  }
  logAttack() {
    this.attacks.forEach((attack, index) => {
      console.log(index + 1, "-", attack.name);
    });
  }
  logPokemon() {
    console.log(`Pokemon : ${this.name} ${this.emoji}`);
    console.log(`Health : ${this.health}`);
    console.log("Attacks :");
    this.attacks.forEach((attack) => {
      attack.logAttack();
    });
  }
  getHealth() {
    let healthBar = "";

    const ratio = this.health / this.maxHealth;
    const greenSquares = Math.round(ratio * 10);

    for (let i = 0; i < 10; i++) {
      if (i < greenSquares) {
        healthBar += "🟩";
      } else {
        healthBar += "🟥";
      }
    }

    console.log(healthBar);
    return healthBar;
  }
}
class Attack {
  constructor(name, power, stability) {
    this.name = name;
    this.power = power;
    this.stability = stability;
  }
  performAttack() {
    const randomNumber = Math.random();

    if (randomNumber < this.stability) {
      return true;
    } else {
      return false;
    }
  }
  logAttack() {
    console.log(
      ` ${this.name} - Power : ${this.power} - stability : ${this.stability}`,
    );
  }
}

class Game {
  constructor(pokemons) {
    this.pokemons = pokemons;
  }
  choosePokemon() {
    this.pokemons.forEach((pokemon, index) => {
      console.log(index + 1, "-", pokemon.name);
    });
    let choice = Number(prompt("Choisis un pokemon (1, 2 ou 3) : "));
    while (choice !== 1 && choice !== 2 && choice !== 3) {
      choice = Number(prompt("Choisis un pokemon (1, 2 ou 3) : "));
    }
    const selectPokemonPlayer = this.pokemons[choice - 1].name;
    console.log("tu as choisit : ", selectPokemonPlayer);

    return this.pokemons[choice - 1];
  }
  chooseAttack(pokemon) {
    pokemon.logAttack();

    let choice = Number(prompt("Choisis une attaque (1, 2 ou 3) : "));

    while (choice < 1 || choice > pokemon.attacks.length || isNaN(choice)) {
      choice = Number(prompt("Choisis une attaque valide : "));
    }

    return pokemon.attacks[choice - 1];
  }
  randomPokemon(playerPokemon) {
    const available = this.pokemons.filter((p) => p !== playerPokemon);
    const randomIndex = Math.floor(Math.random() * available.length);
    console.log("L'ennemie choisit : ", available[randomIndex].name);

    return available[randomIndex];
  }
}

const play = () => {
  const pokemons = [pikachu, bulbasaur, charmander];
  const game = new Game(pokemons);
  const playerPokemon = game.choosePokemon();
  playerPokemon.logPokemon();

  playerPokemon.getHealth();
  const enemyPokemon = game.randomPokemon(playerPokemon);
  enemyPokemon.logPokemon();
  enemyPokemon.getHealth();

  while (enemyPokemon.health > 0 && playerPokemon.health > 0) {
    // TOUR JOUEUR
    const playerAttack = game.chooseAttack(playerPokemon);

    if (playerAttack.performAttack()) {
      enemyPokemon.health -= playerAttack.power;
      console.log(`🔥 ${enemyPokemon.name} perd ${playerAttack.power} HP`);
    }

    enemyPokemon.getHealth();

    if (enemyPokemon.health <= 0) {
      console.log("🏆 Victoire !");
      break;
    }

    // TOUR ENNEMI
    const enemyAttack = enemyPokemon.randomAttack();

    console.log("L'ennemi utilise :", enemyAttack.name);

    if (enemyAttack.performAttack()) {
      playerPokemon.health -= enemyAttack.power;
      console.log(`💥 Tu perds ${enemyAttack.power} HP`);
    }

    playerPokemon.getHealth();

    if (playerPokemon.health <= 0) {
      console.log("💀 Défaite !");
      break;
    }
  }
};

const pikachu = new Pokemon("Pikachu", "⚡️", 100, [
  new Attack("Thunderbolt", 30, 0.2),
  new Attack("Electro Ball", 20, 0.4),
  new Attack("Quick Attack", 10, 0.8),
]);

const bulbasaur = new Pokemon("Bulbasaur", "🍃", 110, [
  new Attack("Vine Whip", 25, 0.3),
  new Attack("Seed Bomb", 20, 0.5),
  new Attack("Tackle", 10, 0.8),
]);

const charmander = new Pokemon("Charmander", "🔥", 90, [
  new Attack("Flamethrower", 35, 0.2),
  new Attack("Ember", 25, 0.3),
  new Attack("Scratch", 15, 0.75),
]);

console.log();
play();
console.log("test");
