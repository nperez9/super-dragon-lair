import { Sprites } from '../objects/Sprites';
import { Music } from '../types/Music';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image(Sprites.Background, 'assets/sprites/background.png');
    this.load.image(Sprites.Player, 'assets/sprites/player.png');
    this.load.image(Sprites.Enemy, 'assets/sprites/dragon.png');
    this.load.image(Sprites.Treasure, 'assets/sprites/treasure.png');
    this.load.image(Sprites.StartBackground, 'assets/UI/start-screen.png');
    this.load.image(Sprites.WinBackground, 'assets/UI/win-screen.jpg');
    this.load.image(Sprites.Title, 'assets/UI/title.png');

    this.load.audio(Music.startScreen, 'assets/music/startMusic.mp3');
  }

  create() {
    this.scene.start('StartScene');
  }
}
