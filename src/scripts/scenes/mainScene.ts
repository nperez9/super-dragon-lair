import FpsText from '../objects/fpsText';
import DistanceText from '../components/DistanceText';
import { DragonSprites, PlayerSprites, Sprites } from '../types/Sprites';

import { gameplayConfig, isDev } from '../config';
import { EnemyGroup, Sprite } from '../types';
import { getRandomEnum, twoDecimalFormat } from '../utils';
import { Group, GroupCreateConfig, SpritePhysics } from '../types/phaser';

const defaultEnemiesConfig = {
  cursor: 100,
  stepX: [80, 200],
  rangeY: [60, 330],
  perBg: [1, 6],
  adittionalSpeed: 1,
};

export default class MainScene extends Phaser.Scene {
  fpsText: FpsText;
  distanceText: DistanceText;
  screenWidth: number;
  screenHeigth: number;

  // Sprites
  player: any;
  enemiesGroup: Group;

  // config Values
  playerSpeed: number = 3;
  enemySpeed = gameplayConfig.enemySpeed;
  enemyConfig = { ...defaultEnemiesConfig };
  releasedButton: boolean = false;
  endGame: boolean = false;
  additionalCallback: Function;
  points: number = 0;
  bgCount: number = 1;
  startX: number = -100;
  addnewBgposition: number = 0;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.screenWidth = this.sys.game.config.width as number;
    this.screenHeigth = this.sys.game.config.height as number;
    this.intializeVariables();
    this.add.sprite(this.startX, 0, Sprites.Background).setOrigin(0, 0).setDepth(0);
    this.repeatBG();

    if (isDev) {
      this.fpsText = new FpsText(this).setDepth(100);
    }
    this.additionalCallback = isDev ? () => this.fpsText.update() : () => {};
    this.distanceText = new DistanceText(this, this.points).setDepth(100);

    this.createPlayer();
    this.createEnemies();

    this.endGame = false;
    this.physics.add.collider(this.player, this.enemiesGroup, this.PlayerEnemeysCollision, null, this);
  }

  private intializeVariables(): void {
    this.points = 0;
    this.bgCount = 1;
    this.addnewBgposition = 0;
    this.enemyConfig = { ...defaultEnemiesConfig };
  }

  private repeatBG(): void {
    this.addnewBgposition = (this.bgCount - 1) * 640;
    const bgX = this.startX + this.bgCount * 640;
    this.bgCount++;
    this.add.sprite(bgX, 0, Sprites.Repeat).setOrigin(0, 0);
  }

  private createPlayer() {
    const offsetY = -10;
    const playerSprite = this.add.sprite(30, this.screenHeigth / 2 + offsetY, PlayerSprites.HolyCrusader);
    playerSprite.setScale(2.2).setDepth(100).setOrigin(1, 0);
    this.player = this.physics.add.existing(playerSprite, false);
    this.player.body.setSize(5, 11);
    this.player.body.setOffset(9, 3);
    this.player.body.setBounce(0, 0);
    this.player.body.setGravityY(0);
    this.player.body.setGravityX(0);
    this.player.anims.play('player-idle', 0);

    this.cameras.main.startFollow(this.player, false, 0.1, 0, -200, offsetY);
  }

  // REFACTOR THIS
  private createEnemies() {
    let x = this.enemyConfig.cursor;
    // @ts-ignore
    this.enemiesGroup = this.physics.add.group();

    for (let i = 0; i < 259; i++) {
      this.enemiesGroup.create(x, Phaser.Math.Between(this.enemyConfig.rangeY[0], this.enemyConfig.rangeY[1]));
      x += Phaser.Math.Between(this.enemyConfig.stepX[0], this.enemyConfig.stepX[1]);
    }

    Phaser.Actions.Call(
      this.enemiesGroup.getChildren(),
      (enemy: EnemyGroup) => {
        const direction = Math.random() < 0.5 ? 1 : -1;
        const speed = this.enemySpeed.min + Math.random() * (this.enemySpeed.max - this.enemySpeed.min);
        (enemy as SpritePhysics).setScale(3);
        enemy.flipX = true;
        enemy.speed = twoDecimalFormat(speed) * direction;
        enemy.body.setSize(7, 9);
        enemy.body.setBounce(0, 0);
        enemy.body.setOffset(4, 6);
        enemy.setDepth(100);
        // @ts-ignore
        enemy.anims.play(getRandomEnum<DragonSprites>(DragonSprites) + 'idle', 0);
      },
      this,
    );

    this.enemyConfig.cursor += 640;
  }

  update() {
    this.additionalCallback();
    this.moveEnemies();

    if (!this.endGame) {
      this.checkInputs();
    }
  }

  private moveEnemies(): void {
    const enemies: EnemyGroup[] = this.enemiesGroup.getChildren() as EnemyGroup[];
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].body.setVelocityY(enemies[i].speed * 100);

      const conditionUp = enemies[i].speed < 0 && enemies[i].y <= this.enemyConfig.rangeY[0];
      const conditionDown = enemies[i].speed > 0 && enemies[i].y >= this.enemyConfig.rangeY[1];

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
      this.points++;
      this.distanceText.update(this.points);
      if (this.player.x >= this.addnewBgposition) {
        this.repeatBG();
      }
    } else if (!this.input.activePointer.isDown) {
      this.releasedButton = true;
    }
  }

  private gameOver(): void {
    this.endGame = true;
    this.player.anims.stop();
    this.player.rotation = -0.5;

    this.cameras.main.shake(200, 0.01);
    this.cameras.main.on('camerashakecomplete', () => {
      this.cameras.main.fade(200);
    });

    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.releasedButton = false;
      this.scene.start('LoseScene', { points: this.points });
    });
  }

  private gameWin(): void {
    this.releasedButton = false;
    this.scene.start('WinScene');
    this.scene.pause();
  }
}
