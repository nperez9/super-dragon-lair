import FpsText from '../objects/fpsText';
import { Sprites } from '../objects/Sprites';

export default class MainScene extends Phaser.Scene {
  fpsText: FpsText;
  screenWidth: number;
  screenHeigth: number;
  enemy;
  downScale = false;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    // define global scene variables
    this.fpsText = new FpsText(this).setDepth(100);
    this.screenWidth = this.sys.game.config.width as number;
    this.screenHeigth = this.sys.game.config.height as number;

    this.add.sprite(0, 0, Sprites.Background).setOrigin(0, 0).setDepth(0);
    this.add
      .sprite(50, this.screenHeigth / 2, Sprites.Player)
      .setScale(0.5)
      .setDepth(1);

    this.enemy = this.add.sprite(150, this.screenHeigth / 2, Sprites.Enemy);
    this.enemy.setScale(0.5).flipX = true;
    console.info(this.enemy);
  }

  update() {
    this.fpsText.update();
    if (this.enemy.scale <= 2 && !this.downScale) {
      this.enemy.scale += 0.01;
    } else {
      this.downScale = true;
      this.enemy.scale -= 0.01;
      if (this.enemy.scale <= 0.4) {
        this.downScale = false;
        this.enemy.setAngle(this.enemy.angle + 25);
      }
    }
  }
}
