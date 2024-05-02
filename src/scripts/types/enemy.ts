import { GameObjects } from 'phaser';

export interface Enemy extends GameObjects.Sprite {
  speed: number;
  direction?: 1 | -1;
}

export interface EnemyGroup extends Phaser.Physics.Arcade.Sprite {
  speed: number;
  direction?: 1 | -1;
  body: Phaser.Physics.Arcade.Body;
}
