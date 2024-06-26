import Phaser, { Types, GameObjects } from 'phaser';

export type GroupCreateConfig = Types.GameObjects.Group.GroupCreateConfig;
export type Group = GameObjects.Group;
export type Sprite = GameObjects.Sprite;
export type SpritePhysics = GameObjects.Sprite & Phaser.Physics.Arcade.Sprite;
