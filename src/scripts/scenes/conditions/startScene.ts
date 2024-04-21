import { Sprites } from '../../objects/Sprites';
import { Music } from '../../types/Music';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }
  private retryText;
  private music;

  create() {
    const screenHeigth = this.sys.game.config.height as number;
    const style = { color: '#110000', fontSize: '28px', fontFamily: 'sans-serif' };
    const middleScreen = (this.sys.game.config.width as number) / 2;

    this.music = this.sound.add(Music.startScreen, { loop: true, volume: 0.5 });
    this.music.play();
    this.add.sprite(middleScreen, 0, Sprites.StartBackground).setScale(1).setOrigin(0.5, 0).on('pointerdown', this.startGame.bind(this));
    this.add.sprite(middleScreen, 0, Sprites.Title).setScale(1).setOrigin(0.5, 0).on('pointerdown', this.startGame.bind(this));

    this.retryText = this.add
      .text(200, screenHeigth / 2 + 100, 'Tap here to Play', { ...style, fontSize: '48px' })
      .setDepth(1500)
      .setOrigin(0, 1)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', this.startGame.bind(this))
      .on('pointerover', () => this.retryText.setStyle({ fill: '#f39c12' }))
      .on('pointerout', () => this.retryText.setStyle({ fill: '#FFF' }));
  }

  private startGame() {
    this.music.stop();
    this.scene.start('MainScene');
  }
}
