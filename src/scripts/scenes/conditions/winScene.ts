import { Sprites } from '../../objects/Sprites';

export default class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WinScene' });
  }

  private retryText;

  create() {
    const screenHeigth = this.sys.game.config.height as number;
    const middleScreen = (this.sys.game.config.width as number) / 2;
    const style = { color: '#FFF', fontSize: '28px', fontFamily: 'sans-serif' };

    this.add.sprite(middleScreen, 0, Sprites.WinBackground).setScale(1).setOrigin(0.5, 0);

    this.retryText = this.add
      .text(middleScreen - 150, screenHeigth / 2 + 100, 'Tap here to play again', { ...style, fontSize: '34px' })
      .setDepth(1500)
      .setOrigin(0, 1)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', this.startGame.bind(this))
      .on('pointerover', () => this.retryText.setStyle({ fill: '#f39c12' }))
      .on('pointerout', () => this.retryText.setStyle({ fill: '#FFF' }));
  }

  private startGame() {
    this.scene.start('MainScene');
  }
}
