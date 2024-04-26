import { DragonSprites, Sprites } from '../types/Sprites';
import { Music } from '../types/Music';

const dragonSpritesConfig = {
  frameWidth: 16,
  frameHeight: 16,
  margin: 0,
  spacing: 0,
  startFrame: 0,
  endFrame: 3,
};

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Images
    this.load.image(Sprites.Background, 'assets/sprites/start-scenario.jpg');
    this.load.image(Sprites.Repeat, 'assets/sprites/repetable.jpg');
    this.load.image(Sprites.Player, 'assets/sprites/player.png');
    this.load.image(Sprites.Enemy, 'assets/sprites/dragon.png');
    this.load.image(Sprites.Treasure, 'assets/sprites/treasure.png');
    this.load.image(Sprites.StartBackground, 'assets/UI/start-screen.png');
    this.load.image(Sprites.WinBackground, 'assets/UI/win-screen.jpg');
    this.load.image(Sprites.Title, 'assets/UI/title.png');
    this.load.image(Sprites.BlackBackground, 'assets/UI/tap-bg.png');

    // Dragoons
    this.load.spritesheet(DragonSprites.DragonBlue, 'assets/sprites/dragons/blue-dragon.png', dragonSpritesConfig);
    this.load.spritesheet(DragonSprites.DragonCian, 'assets/sprites/dragons/cian-dragon.png', dragonSpritesConfig);
    this.load.spritesheet(DragonSprites.DragonGray, 'assets/sprites/dragons/gray-dragon.png', dragonSpritesConfig);
    this.load.spritesheet(DragonSprites.DragonGreen, 'assets/sprites/dragons/green-dragon.png', dragonSpritesConfig);
    this.load.spritesheet(DragonSprites.DragonOrange, 'assets/sprites/dragons/orange-dragon.png', dragonSpritesConfig);
    this.load.spritesheet(DragonSprites.DragonWhite, 'assets/sprites/dragons/white-dragon.png', dragonSpritesConfig);
    this.load.spritesheet(DragonSprites.DragonYellow, 'assets/sprites/dragons/yellow-dragon.png', dragonSpritesConfig);

    // Audio & SFX
    this.load.audio(Music.startScreen, 'assets/music/startMusic.mp3');
  }

  create() {
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames(DragonSprites.DragonYellow, {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.scene.start('MainScene');
  }
}
