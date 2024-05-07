import { SFX_VOLUME } from '../config';
import { SFX } from '../types/Music';

const baseStyle = { color: '#eee811', fontSize: '40px', fontFamily: 'pixel-cursive' };

export class ClickebleText extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    callback?: Function,
    style: Phaser.Types.GameObjects.Text.TextStyle = {},
  ) {
    super(scene, x, y, text, { ...baseStyle, ...style });
    this.setDepth(1500).setOrigin(0.5, 1);

    if (callback) {
      this.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          this.scene.sound.play(SFX.click, { volume: SFX_VOLUME });
          callback();
        })
        .on('pointerover', () => this.setStyle({ fill: 'red' }))
        .on('pointerout', () => this.setStyle({ fill: '#eee811' }));
    }

    this.setStyle({ fontFamily: 'pixel-cursive' });
    scene.add.existing(this);
  }
}

export default ClickebleText;
