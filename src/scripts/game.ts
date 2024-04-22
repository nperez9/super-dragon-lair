import 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import WinScene from './scenes/conditions/winScene';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, isDev } from './config';
import StartScene from './scenes/conditions/startScene';

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
  scene: [PreloadScene, StartScene, MainScene, WinScene],
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
