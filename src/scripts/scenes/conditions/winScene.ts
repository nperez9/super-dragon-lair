import { Sprites } from '../../types/Sprites';
import { ClickebleText } from '../../components/ClickeableText';

export class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WinScene' });
  }

  create() {
    const screenHeigth = this.sys.game.config.height as number;
    const middleScreen = (this.sys.game.config.width as number) / 2;

    this.add.sprite(middleScreen, 0, Sprites.WinBackground).setScale(1).setOrigin(0.5, 0);
    this.add.sprite(middleScreen, 0, Sprites.BlackBackground).setScale(1).setOrigin(0.5, 0);

    const clickeable = new ClickebleText(
      this,
      middleScreen,
      screenHeigth / 2 + 155,
      'Tap here to replay',
      this.Replay.bind(this),
    );
  }

  private Replay() {
    this.scene.start('MainScene');
  }
}

export default WinScene;
