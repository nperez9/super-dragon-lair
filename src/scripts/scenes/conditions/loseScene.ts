import { Sprites } from '../../types/Sprites';
import { ClickebleText } from '../../components/ClickeableText';
import { Music } from '../../types/Music';
import { MUSIC_VOLUME } from '../../config';

export interface LoseSceneInitData {
  points: number;
}

export class LoseScene extends Phaser.Scene {
  private points: number;
  music;

  constructor() {
    super({ key: 'LoseScene' });
  }

  init(data: LoseSceneInitData) {
    this.cameras.main.fadeIn(200);
    this.points = data.points;
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
    const title = new ClickebleText(this, middleScreen, screenHeigth / 2 - 100, 'Game Over', null, {
      fontSize: '52px',
      color: '#F80000',
    });
    const points = new ClickebleText(this, middleScreen, screenHeigth / 2, 'Score: ' + this.points);
    this.cameras.main.fadeIn(200);
    this.cameras.main.on('camerafadeincomplete', () => {
      this.sound.stopAll();
      this.sound.play(Music.loseGame, { volume: MUSIC_VOLUME });
    });
  }

  private Replay() {
    this.cameras.main.fade(200);
    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.sound.stopAll();
      this.scene.start('MainScene');
    });
  }
}

export default LoseScene;
