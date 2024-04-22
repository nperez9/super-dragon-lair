import FpsText from '../objects/fpsText';
import { DragonSprites, Sprites } from '../types/Sprites';

import { gameplayConfig } from '../config';
import { EnemyGroup, Sprite } from '../types';
import { twoDecimalFormat } from '../utils';
import { Group, GroupCreateConfig } from '../types/phaser';

export default class MainScene extends Phaser.Scene {
  fpsText: FpsText;
  screenWidth: number;
  screenHeigth: number;

  // Sprites
  player: any;
  treasure: Sprite;
  enemiesGroup: Group;

  // config Values
  playerSpeed: number = 3;
  enemySpeed = gameplayConfig.enemySpeed;
  enemyRange = {
    minY: 0,
    maxY: 0,
  };
  releasedButton: boolean = false;
  endGame: boolean = false;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.add.sprite(0, 0, Sprites.Background).setOrigin(0, 0).setDepth(0);

    this.fpsText = new FpsText(this).setDepth(100);
    this.screenWidth = this.sys.game.config.width as number;
    this.screenHeigth = this.sys.game.config.height as number;

    this.createPlayer();
    this.createEnemies();

    this.enemyRange.minY = this.screenHeigth / 5;
    this.enemyRange.maxY = this.screenHeigth / 1.3;

    this.treasure = this.add.sprite(this.screenWidth - 80, this.screenHeigth / 2, Sprites.Treasure).setScale(0.5);
    this.treasure = this.physics.add.existing(this.treasure, true);
    this.endGame = false;

    this.physics.add.collider(this.player, this.enemiesGroup, this.PlayerEnemeysCollision, null, this);
  }

  private createPlayer() {
    const playerSprite = this.add.sprite(50, this.screenHeigth / 2, Sprites.Player);
    playerSprite.setScale(0.5).setDepth(1);
    this.player = this.physics.add.existing(playerSprite, false);
    this.player.body.setSize(35, 35);
    this.player.body.setBounce(0, 0);
    this.player.body.setCollideWorldBounds(true);
    this.player.body.setGravityY(0);
    this.player.body.setGravityX(0);
  }

  private createEnemies() {
    this.enemiesGroup = this.physics.add.group({
      key: DragonSprites.DragonYellow,
      repeat: 4,
      setXY: {
        x: 100,
        y: this.enemyRange.minY,
        stepX: 100,
        stepY: (this.enemyRange.maxY - this.enemyRange.minY) / 5,
      },
    } as GroupCreateConfig);

    Phaser.Actions.ScaleXY(this.enemiesGroup.getChildren(), 1.5);
    Phaser.Actions.Call(
      this.enemiesGroup.getChildren(),
      (enemy: EnemyGroup) => {
        const direction = Math.random() < 0.5 ? 1 : -1;
        const speed = this.enemySpeed.min + Math.random() * (this.enemySpeed.max - this.enemySpeed.min);

        enemy.flipX = true;
        enemy.speed = twoDecimalFormat(speed) * direction;
        enemy.body.setSize(10, 10);
        enemy.body.setBounce(0, 0);

        enemy.anims.play('idle', 0);
        console.info(enemy.anims, speed);
        // enemy.anims.setDuration(800 * (1 / speed));
      },
      this,
    );
  }

  update() {
    this.moveEnemies();

    if (!this.endGame) {
      this.checkInputs();
      this.checkWinCondition();
    }
  }

  private moveEnemies(): void {
    const enemies: EnemyGroup[] = this.enemiesGroup.getChildren();
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].body.setVelocityY(enemies[i].speed * 100);

      const conditionUp = enemies[i].speed < 0 && enemies[i].y <= this.enemyRange.minY;
      const conditionDown = enemies[i].speed > 0 && enemies[i].y >= this.enemyRange.maxY;

      if (conditionDown || conditionUp) {
        enemies[i].speed *= -1;
      }
    }
  }

  private PlayerEnemeysCollision(player, enemies): void {
    this.gameOver();
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
      this.gameWin();
    }
  }

  private gameOver(): void {
    this.endGame = true;

    this.cameras.main.shake(200, 0.01);
    this.cameras.main.on('camerashakecomplete', () => {
      this.cameras.main.fade(200);
    });

    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.releasedButton = false;
      this.scene.restart();
    });
  }

  private gameWin(): void {
    this.releasedButton = false;
    this.scene.start('WinScene');
    this.scene.pause();
  }
}
