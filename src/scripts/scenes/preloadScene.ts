import { Sprites } from '../objects/Sprites';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image(Sprites.Background, 'assets/sprites/background.png');
    this.load.image(Sprites.Player, 'assets/sprites/player.png');
    this.load.image(Sprites.Enemy, 'assets/sprites/dragon.png');
    this.load.image(Sprites.Treasure, 'assets/sprites/treasure.png');
  }

  create() {
    this.scene.start('MainScene');
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
