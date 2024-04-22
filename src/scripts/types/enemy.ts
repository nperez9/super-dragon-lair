import { GameObjects } from 'phaser';

export interface Enemy extends GameObjects.Sprite {
  speed: number;
  direction?: 1 | -1;
}

export interface EnemyGroup extends GameObjects.GameObject {
  flipX?: boolean;
  y?: number;
  speed?: number;
  getBounds?: () => Phaser.Geom.Rectangle;
  body: any;
}
