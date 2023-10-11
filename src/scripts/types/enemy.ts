import { GameObjects } from 'phaser';

export interface Enemy extends GameObjects.Sprite {
  speed: number;
  direction?: 1 | -1;
}
