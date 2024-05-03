import 'phaser';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, isDev } from './config';

import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import StartScene from './scenes/conditions/startScene';
import LoseScene from './scenes/conditions/loseScene';

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#111',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  title: 'Super-Dragons-Lair',
  pixelArt: true,
  scene: [PreloadScene, StartScene, MainScene, LoseScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: isDev,
      gravity: { y: 0, x: 0 },
    },
  },
};

(window as any).SPDL = {
  mute: true,
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(config);
});
