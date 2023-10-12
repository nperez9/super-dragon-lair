/*! For license information please see main.265c392e84aabd218812.bundle.js.LICENSE.txt */
(()=>{var e,t={6:(e,t,s)=>{"use strict";var a;s(260);class n extends Phaser.GameObjects.Text{constructor(e){super(e,10,10,"",{color:"#FFF",fontSize:"28px"}),e.add.existing(this),this.setOrigin(0)}update(){this.setText(`fps: ${Math.floor(this.scene.game.loop.actualFps)}`)}}!function(e){e.Background="background",e.Enemy="enemy",e.Player="player",e.Treasure="treasure"}(a||(a={}));class r extends Phaser.Scene{fpsText;screenWidth;screenHeigth;player;treasure;enemiesGroup;playerSpeed=3;enemySpeed={min:1,max:4};enemyRange={minY:0,maxY:0};releasedButton=!1;endGame=!1;constructor(){super({key:"MainScene"})}create(){this.add.sprite(0,0,a.Background).setOrigin(0,0).setDepth(0),this.fpsText=new n(this).setDepth(100),this.screenWidth=this.sys.game.config.width,this.screenHeigth=this.sys.game.config.height,this.createPlayer(),this.enemyRange.minY=this.screenHeigth/5,this.enemyRange.maxY=this.screenHeigth/1.3,this.enemiesGroup=this.add.group({key:"enemy",repeat:4,setXY:{x:100,y:this.enemyRange.minY,stepX:100,stepY:(this.enemyRange.maxY-this.enemyRange.minY)/5}}),Phaser.Actions.ScaleXY(this.enemiesGroup.getChildren(),-.5),Phaser.Actions.Call(this.enemiesGroup.getChildren(),(e=>{const t=Math.random()<.5?1:-1,s=this.enemySpeed.min+Math.random()*(this.enemySpeed.max-this.enemySpeed.min);var a;e.flipX=!0,e.speed=(a=s,Math.round(100*(a+Number.EPSILON))/100*t)}),this),this.treasure=this.add.sprite(this.screenWidth-80,this.screenHeigth/2,a.Treasure).setScale(.5),this.endGame=!1}createPlayer(){this.player=this.add.sprite(50,this.screenHeigth/2,a.Player),this.player.setScale(.5).setDepth(1)}update(){this.fpsText.update(),console.info(this.endGame),this.endGame||(this.checkInputs(),this.moveEnemies(),this.checkWinCondition())}moveEnemies(){const e=this.enemiesGroup.getChildren(),t=this.player.getBounds();for(let s=0;s<e.length;s++){e[s].y+=e[s].speed;const a=e[s].getBounds();if(Phaser.Geom.Intersects.RectangleToRectangle(t,a))return this.gameOver();const n=e[s].speed<0&&e[s].y<=this.enemyRange.minY;(e[s].speed>0&&e[s].y>=this.enemyRange.maxY||n)&&(e[s].speed*=-1)}}checkInputs(){this.input.activePointer.isDown&&this.releasedButton?this.player.x+=this.playerSpeed:this.input.activePointer.isDown||(this.releasedButton=!0)}checkWinCondition(){const e=this.player.getBounds(),t=this.treasure.getBounds();Phaser.Geom.Intersects.RectangleToRectangle(e,t)&&this.gameWin()}gameOver(){this.endGame=!0,this.cameras.main.shake(400),this.cameras.main.on("camerashakecomplete",(()=>{this.cameras.main.fade(400)})),this.cameras.main.on("camerafadeoutcomplete",(()=>{this.releasedButton=!1,this.scene.restart()}))}gameWin(){this.releasedButton=!1,this.scene.start("WinScene"),this.scene.pause()}}class i extends Phaser.Scene{constructor(){super({key:"PreloadScene"})}preload(){this.load.image(a.Background,"assets/sprites/background.png"),this.load.image(a.Player,"assets/sprites/player.png"),this.load.image(a.Enemy,"assets/sprites/dragon.png"),this.load.image(a.Treasure,"assets/sprites/treasure.png")}create(){this.scene.start("MainScene")}}class h extends Phaser.Scene{constructor(){super({key:"WinScene"})}create(){const e=this.sys.game.config.height;this.add.text(200,e/2,"You Won!!",{color:"#FFF",fontSize:"28px"}).setDepth(1500).setOrigin(0,1),this.add.text(200,e/2+40,"Thanks for playing",{color:"#FFF",fontSize:"28px"}).setDepth(1500).setOrigin(0,1)}}const o={type:Phaser.AUTO,backgroundColor:"#111",scale:{parent:"phaser-game",mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH,width:640,height:360},scene:[i,r,h],physics:{default:"arcade",arcade:{debug:!1,gravity:{y:400}}}};window.addEventListener("load",(()=>{new Phaser.Game(o)}))},204:()=>{console.log("%c %c %c %c %c Built using phaser-project-template %c https://github.com/yandeu/phaser-project-template","background: #ff0000","background: #ffff00","background: #00ff00","background: #00ffff","color: #fff; background: #000000;","background: none")}},s={};function a(e){var n=s[e];if(void 0!==n)return n.exports;var r=s[e]={exports:{}};return t[e].call(r.exports,r,r.exports,a),r.exports}a.m=t,e=[],a.O=(t,s,n,r)=>{if(!s){var i=1/0;for(d=0;d<e.length;d++){for(var[s,n,r]=e[d],h=!0,o=0;o<s.length;o++)(!1&r||i>=r)&&Object.keys(a.O).every((e=>a.O[e](s[o])))?s.splice(o--,1):(h=!1,r<i&&(i=r));if(h){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[s,n,r]},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={179:0};a.O.j=t=>0===e[t];var t=(t,s)=>{var n,r,[i,h,o]=s,c=0;if(i.some((t=>0!==e[t]))){for(n in h)a.o(h,n)&&(a.m[n]=h[n]);if(o)var d=o(a)}for(t&&t(s);c<i.length;c++)r=i[c],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(d)},s=self.webpackChunksuper_dragon_lair=self.webpackChunksuper_dragon_lair||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})(),a.O(void 0,[216],(()=>a(6)));var n=a.O(void 0,[216],(()=>a(204)));n=a.O(n)})();