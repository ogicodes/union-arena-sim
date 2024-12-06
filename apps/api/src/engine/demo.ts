import { GameEngine } from "./core/GameEngine";
import { Player } from "./components/Player";

const playerOne = new Player("Player One", []);
const playerTwo = new Player("Player Two", []);

const game = new GameEngine([playerOne, playerTwo]);

game.startGame();
