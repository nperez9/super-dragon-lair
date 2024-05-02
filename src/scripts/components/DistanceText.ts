import { DEFAULT_WIDTH } from '../config';

const baseStyle = { color: '#eee811', fontSize: '28px', fontFamily: 'pixel-cursive' };

export class DistanceText extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, distance: number = 0, style: Phaser.Types.GameObjects.Text.TextStyle = {}) {
    super(scene, DEFAULT_WIDTH / 2, 35, `Points: ${distance}`, { ...baseStyle, ...style });
    this.setDepth(1500).setOrigin(0.5, 1);
    this.setScrollFactor(0);
    this.setStyle({ fontFamily: 'pixel-cursive' });
    scene.add.existing(this);
  }

  public update(distance: number): void {
    this.setText(`Points: ${distance}`);
  }
}

export default DistanceText;
