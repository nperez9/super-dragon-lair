import { Sprites } from '../../types/Sprites';
import { Music } from '../../types/Music';
import { ClickebleText } from '../../components/ClickeableText';
import { MUSIC_VOLUME } from '../../config';

export class StartScene extends Phaser.Scene {
  private music;

  constructor() {
    super({ key: 'StartScene' });
  }

  create() {
    const screenHeigth = this.sys.game.config.height as number;
    const middleScreen = (this.sys.game.config.width as number) / 2;

    this.music = this.sound.add(Music.startScreen, { loop: true, volume: MUSIC_VOLUME });
    this.music.play();

    this.add.sprite(middleScreen, 0, Sprites.StartBackground).setScale(1).setOrigin(0.5, 0);
    this.add.sprite(middleScreen, 0, Sprites.Title).setScale(1).setOrigin(0.5, 0);
    this.add.sprite(middleScreen, 0, Sprites.BlackBackground).setScale(1).setOrigin(0.5, 0);

    new ClickebleText(this, middleScreen, screenHeigth / 2 + 155, 'Tap here to play', this.startGame.bind(this), {
      fontSize: '40px',
    });
  }

  private startGame() {
    this.music.stop();
    this.cameras.main.fade(200);
    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.start('MainScene');
    });
  }
}

export default StartScene;
