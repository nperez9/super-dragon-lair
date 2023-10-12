import { GameObjects } from 'phaser';
import FpsText from '../objects/fpsText';
import { Sprites } from '../objects/Sprites';

import { Enemy } from '../types';
import { twoDecimalFormat } from '../utils';

export default class MainScene extends Phaser.Scene {
  fpsText: FpsText;
  screenWidth: number;
  screenHeigth: number;

  // Sprites
  enemies: Enemy[] = [];
  player: GameObjects.Sprite;
  treasure: GameObjects.Sprite;

  // config Values
  playerSpeed: number = 3;
  enemySpeed = {
    min: 1,
    max: 3,
  };
  enemyRange = {
    minY: 0,
    maxY: 0,
  };
  releasedButton: boolean = false;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    // define global scene variables
    this.add.sprite(0, 0, Sprites.Background).setOrigin(0, 0).setDepth(0);

    this.fpsText = new FpsText(this).setDepth(100);
    this.screenWidth = this.sys.game.config.width as number;
    this.screenHeigth = this.sys.game.config.height as number;

    this.createPlayer();

    this.enemyRange.minY = this.screenHeigth / 5;
    this.enemyRange.maxY = this.screenHeigth / 1.3;

    this.addEnemy(120, this.screenHeigth / 2);
    this.addEnemy(220, this.screenHeigth / 5);
    this.addEnemy(320, this.screenHeigth / 1.3);
    this.addEnemy(420, this.screenHeigth / 3);
    this.addEnemy(520, this.screenHeigth / 1.8);

    this.treasure = this.add.sprite(this.screenWidth - 80, this.screenHeigth / 2, Sprites.Treasure).setScale(0.5);
    console.info(this.enemies);
  }

  private createPlayer() {
    this.player = this.add.sprite(50, this.screenHeigth / 2, Sprites.Player);
    this.player.setScale(0.5).setDepth(1);
  }

  private addEnemy(x: number, y: number, scale: number = 0.5): void {
    const enemy = this.add.sprite(x, y, Sprites.Enemy) as Enemy;
    enemy.setScale(scale).flipX = true;

    enemy.direction = Math.random() < 0.5 ? 1 : -1;
    const speed = this.enemySpeed.min + Math.random() * (this.enemySpeed.max - this.enemySpeed.min);
    enemy.speed = twoDecimalFormat(speed) * enemy.direction;

    console.info(enemy.speed);
    this.enemies.push(enemy);
  }

  update() {
    this.fpsText.update();
    this.checkInputs();
    this.moveEnemies();
    this.checkWinCondition();
  }

  private moveEnemies() {
    const playerCollider = this.player.getBounds();
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].y += this.enemies[i].speed;

      const enemyCollider = this.enemies[i].getBounds();
      if (Phaser.Geom.Intersects.RectangleToRectangle(playerCollider, enemyCollider)) {
        alert('You Lose!');
        this.releasedButton = false;
        this.scene.restart();
        window.location.reload();
      }

      const conditionUp = this.enemies[i].speed < 0 && this.enemies[i].y <= this.enemyRange.minY;
      const conditionDown = this.enemies[i].speed > 0 && this.enemies[i].y >= this.enemyRange.maxY;
      // flipdirection
      if (conditionDown || conditionUp) {
        this.enemies[i].speed *= -1;
      }
    }
  }

  private checkInputs(): void {
    if (this.input.activePointer.isDown && this.releasedButton) {
      this.player.x += this.playerSpeed;
    } else if (!this.input.activePointer.isDown) {
      this.releasedButton = true;
    }
  }

  private checkWinCondition(): void {
    const playerCollider = this.player.getBounds();
    const treasureCollider = this.treasure.getBounds();

    if (Phaser.Geom.Intersects.RectangleToRectangle(playerCollider, treasureCollider)) {
      this.releasedButton = false;
      this.scene.start('WinScene');
      this.scene.pause();
    }
  }
}
