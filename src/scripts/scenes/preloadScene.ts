import { DragonSprites, PlayerSprites, Sprites } from '../types/Sprites';
import { Music, SFX } from '../types/Music';

const dragonSpritesConfig = {
  frameWidth: 16,
  frameHeight: 16,
  margin: 0,
  spacing: 0,
  startFrame: 0,
  endFrame: 3,
};

const playerSpritesConfig = {
  frameWidth: 16,
  frameHeight: 16,
  margin: 0,
  spacing: 0,
  startFrame: 0,
  endFrame: 4,
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
    this.load.image(Sprites.LoseBackground, 'assets/UI/lose-screen.jpg');
    this.load.image(Sprites.PointsBlackBG, 'assets/UI/lose-black-bg.png');

    // Dragoons
    this.load.spritesheet(DragonSprites.DragonBlue, 'assets/sprites/dragons/blue-dragon.png', dragonSpritesConfig);
    this.load.spritesheet(DragonSprites.DragonCian, 'assets/sprites/dragons/cian-dragon.png', dragonSpritesConfig);
    this.load.spritesheet(DragonSprites.DragonGray, 'assets/sprites/dragons/gray-dragon.png', dragonSpritesConfig);
    this.load.spritesheet(DragonSprites.DragonGreen, 'assets/sprites/dragons/green-dragon.png', dragonSpritesConfig);
    this.load.spritesheet(DragonSprites.DragonOrange, 'assets/sprites/dragons/orange-dragon.png', dragonSpritesConfig);
    this.load.spritesheet(DragonSprites.DragonWhite, 'assets/sprites/dragons/white-dragon.png', dragonSpritesConfig);
    this.load.spritesheet(DragonSprites.DragonYellow, 'assets/sprites/dragons/yellow-dragon.png', dragonSpritesConfig);

    // Players
    this.load.spritesheet(PlayerSprites.HolyCrusader, 'assets/sprites/player/HolyCrusaderIdleSide.png', playerSpritesConfig);

    // Audio & SFX
    this.load.audio(Music.startScreen, 'assets/music/start.ogg');
    this.load.audio(Music.loseGame, 'assets/music/lose.ogg');
    this.load.audio(Music.mianGame, 'assets/music/main.ogg');

    this.load.audio(SFX.click, 'assets/sfx/metalClick.ogg');
    this.load.audio(SFX.playerHit, 'assets/sfx/bookClose.ogg');
  }

  private createAnimation(dragonSprite: DragonSprites) {
    return {
      key: dragonSprite + 'idle',
      frames: this.anims.generateFrameNames(dragonSprite, {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 5,
      repeat: -1,
    };
  }

  create() {
    this.anims.create({
      key: 'player-idle',
      frames: this.anims.generateFrameNames(PlayerSprites.HolyCrusader, {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create(this.createAnimation(DragonSprites.DragonBlue));
    this.anims.create(this.createAnimation(DragonSprites.DragonCian));
    this.anims.create(this.createAnimation(DragonSprites.DragonGray));
    this.anims.create(this.createAnimation(DragonSprites.DragonGreen));
    this.anims.create(this.createAnimation(DragonSprites.DragonOrange));
    this.anims.create(this.createAnimation(DragonSprites.DragonWhite));
    this.anims.create(this.createAnimation(DragonSprites.DragonYellow));

    this.scene.start('StartScene');
  }
}
