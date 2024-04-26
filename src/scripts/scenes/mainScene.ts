import FpsText from '../objects/fpsText';
import { DragonSprites, Sprites } from '../types/Sprites';

import { gameplayConfig, isDev } from '../config';
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
  additionalCallback: Function;
  distance: number = 0;
  bgCount: number = 1;
  startX: number = -100;
  addnewBgposition: number = 0;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.add.sprite(this.startX, 0, Sprites.Background).setOrigin(0, 0).setDepth(0);
    this.add.sprite(this.getBgX(), 0, Sprites.Repeat).setOrigin(0, 0);

    this.fpsText = new FpsText(this).setDepth(100);
    this.additionalCallback = isDev ? () => this.fpsText.update() : () => {};

    this.screenWidth = this.sys.game.config.width as number;
    this.screenHeigth = this.sys.game.config.height as number;

    this.createPlayer();
    this.createEnemies();

    this.enemyRange.minY = this.screenHeigth / 6;
    this.enemyRange.maxY = this.screenHeigth / 1.1;

    // this.treasure = this.add.sprite(this.screenWidth - 80, this.screenHeigth / 2, Sprites.Treasure).setScale(0.5);
    // this.treasure = this.physics.add.existing(this.treasure, true);
    this.endGame = false;

    this.physics.add.collider(this.player, this.enemiesGroup, this.PlayerEnemeysCollision, null, this);
  }

  private getBgX(): number {
    this.addnewBgposition = (this.bgCount - 1) * 640;
    const bgX = this.startX + this.bgCount * 640;
    this.bgCount++;
    return bgX;
  }

  private createPlayer() {
    const playerSprite = this.add.sprite(30, this.screenHeigth / 2, Sprites.Player);
    playerSprite.setScale(0.5).setDepth(100);
    this.player = this.physics.add.existing(playerSprite, false);
    this.player.body.setSize(35, 35);
    this.player.body.setBounce(0, 0);
    this.player.body.setGravityY(0);
    this.player.body.setGravityX(0);

    this.cameras.main.startFollow(this.player, false, 0.1, 0, -200, 0);
  }

  private createEnemies(x: number = 100) {
    this.enemiesGroup = this.physics.add.group({
      key: DragonSprites.DragonYellow,
      repeat: 4,
      setXY: {
        x,
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
        // enemy.anims.setDuration(800 * (1 / speed));
      },
      this,
    );
  }

  update() {
    this.additionalCallback();
    this.moveEnemies();

    if (!this.endGame) {
      this.checkInputs();
      // this.checkWinCondition();
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
      if (this.player.x >= this.addnewBgposition) {
        const x = this.getBgX();
        this.add.sprite(x, 0, Sprites.Repeat).setOrigin(0, 0);
        // this.createEnemies(x);
      }
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
