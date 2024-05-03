import { Sprites } from '../../types/Sprites';
import { ClickebleText } from '../../components/ClickeableText';

export class LoseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoseScene' });
  }

  create() {
    const screenHeigth = this.sys.game.config.height as number;
    const middleScreen = (this.sys.game.config.width as number) / 2;

    this.add.sprite(middleScreen, 0, Sprites.LoseBackground).setScale(1).setOrigin(0.5, 0);
    this.add.sprite(middleScreen, 0, Sprites.BlackBackground).setScale(1).setOrigin(0.5, 0);
    this.add.sprite(middleScreen, 0, Sprites.PointsBlackBG).setScale(1).setOrigin(0.5, 0);

    const clickeable = new ClickebleText(
      this,
      middleScreen,
      screenHeigth / 2 + 155,
      'Tap here to replay',
      this.Replay.bind(this),
    );
    const title = new ClickebleText(this, middleScreen, screenHeigth / 2 - 155, 'You Lose'
  }

  private Replay() {
    this.cameras.main.fade(200);
    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.start('MainScene');
    });
  }
}

export default LoseScene;
