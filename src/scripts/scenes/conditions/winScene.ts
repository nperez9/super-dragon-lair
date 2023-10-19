export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WinScene' });
  }

  private isPress: boolean;
  private retryText;

  create() {
    const screenHeigth = this.sys.game.config.height as number;
    const style = { color: '#FFF', fontSize: '28px', fontFamily: 'sans-serif' };

    this.add
      .text(200, screenHeigth / 2, 'You Won!!', style)
      .setDepth(1500)
      .setOrigin(0, 1);

    this.add
      .text(200, screenHeigth / 2 + 40, 'Thanks for playing', style)
      .setDepth(1500)
      .setOrigin(0, 1);

    this.retryText = this.add
      .text(200, screenHeigth / 2 + 100, 'Tap here to play again', { ...style, fontSize: '34px' })
      .setDepth(1500)
      .setOrigin(0, 1)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', this.startGame.bind(this))
      .on('pointerover', () => this.retryText.setStyle({ fill: '#f39c12' }))
      .on('pointerout', () => this.retryText.setStyle({ fill: '#FFF' }));
  }

  private startGame() {
    console.info('test');
    this.scene.start('MainScene');
  }
}
