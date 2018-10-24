<template>
  <div id="dice">
    <div id="tridiv">
      <div class="scene" v-for="die in dice">
        <div class="shape cuboid-1 cub-1"  :style="`transform: translateX(${die.translate.x * 100}px) translateY(${die.translate.y * 100}px) translateZ(${die.translate.z * 100}px) rotateY(${die.rotate.y}rad) rotateZ(${die.rotate.z}rad) rotateX(${die.rotate.x}rad)`">
          <div class="face ft" :class="{selected: faceUp(die) == 'ft'}"><div class="face__text">+</div></div>
          <div class="face bk" :class="{selected: faceUp(die) == 'bk'}"><div class="face__text">+</div></div>
          <div class="face rt" :class="{selected: faceUp(die) == 'rt'}"><div class="face__text"></div></div>
          <div class="face lt" :class="{selected: faceUp(die) == 'lt'}"><div class="face__text"></div></div>
          <div class="face bm" :class="{selected: faceUp(die) == 'bm'}"><div class="face__text">-</div></div>
          <div class="face tp" :class="{selected: faceUp(die) == 'tp'}"><div class="face__text">-</div></div>
        </div>
      </div>
    </div>
    <transition v-on:enter="enterTotal">
      <div v-if="sleeping" class="total">
        {{total}}
      </div>
    </transition>
  </div>
</template>

<script>
import CANNON from 'cannon';
import { debounce } from 'lodash';
import { Howl, Howler } from 'howler';
import anime from 'animejs'

var dieCollisionSound = new Howl({
  src: ['/static/sounds/cursor_click_11.mp3'],
});

var throwDiceSound = new Howl({
  src: ['/static/sounds/move_cursor_11.mp3'],
});

export default {
  data() {
    return {
      dice: [],
      sleeping: false,
      destroyed: false,
    };
  },

  computed: {
    total() {
      let dieMap = {
        'ft': 1,
        'bk': 1,
        'rt': 0,
        'lt': 0,
        'bm': -1,
        'tp': -1,
      }

      return this.dice.reduce((sum, die) => sum + dieMap[this.faceUp(die)] || 0, 0);
    }
  },

  mounted() {
    this.world = createWorld();
    window.world = this.world

    this.localUp = new CANNON.Vec3();
    this.inverseBodyOrientation = new CANNON.Quaternion();
    this.limit = Math.sin(Math.PI/4);

    throwDiceSound.play();

    let step = () => {
      this.world.step(1/180);
      this.updateDice();
      if (!(this.destroyed || this.sleeping))
        setTimeout(() => step());
    };

    step();
  },

  beforeDestroy() {
    this.destroyed = true
  },

  methods: {
    enterTotal(el, done) {
      anime({
        targets: [el],
        translateY: [300, 0],
        opacity: [0, 1],
        easing: "easeOutSine",
        duration: 200,
      });
    },

    updateDice() {
      let diceBodies = this.world.bodies.slice(1);
      this.dice = diceBodies.map(dieBody => {
        let rotate = new CANNON.Vec3();
        dieBody.quaternion.toEuler(rotate);

        return {
          translate: dieBody.position,
          rotate,
          dieBody,
        };
      }).sort((a, b) => b.translate.z - a.translate.z);

      let setSleeping = debounce(() => {
        this.sleeping = true;
        setTimeout(() => {
          this.$emit('doneRolling', this.total);
        }, 1000);
      }, 1000);

      if (diceBodies.reduce((sum, dieBody) => sum + dieBody.velocity.x + dieBody.velocity.z, 0) < .0001) {
        setSleeping();
      };
    },

    keyForDie(die) {
      let w = die.dieBody.quaternion.w
      let x = die.dieBody.quaternion.x
      let y = die.dieBody.quaternion.y
      let z = die.dieBody.quaternion.z

      w = w > 0 ? 1 : -1;
      x = Math.round(x);
      y = Math.round(y);
      z = Math.round(z);

      return [w, x, y, z].join('');
    },

    faceUp(die) {
      this.localUp.set(0,1,0);
      die.dieBody.quaternion.inverse(this.inverseBodyOrientation);
      this.inverseBodyOrientation.vmult(this.localUp, this.localUp);

      // Check which side is up
      if(this.localUp.x > this.limit){
          // Positive x is up
          return 'lt'
      } else if(this.localUp.x < -this.limit){
          // Negative x is up
          return 'rt'
      } else if(this.localUp.y > this.limit){
          // Positive y is up
          return 'bm'
      } else if(this.localUp.y < -this.limit){
          // Negative y is up
          return 'tp'
      } else if(this.localUp.z > this.limit){
          // Positive z is up
          return 'ft'
      } else if(this.localUp.z < -this.limit){
          // Negative z is up
          return 'bk'
      } else {
          // The box is not resting flat on the ground plane
          return null
      }
    }
  }
}

function createWorld() {
  let numDice = 4;
  let world = new CANNON.World();
  world.broadphase = new CANNON.NaiveBroadphase();
  world.gravity.set(0,-50,0);
  world.solver.tolerance = 0.001;
  // Ground plane
  let plane = new CANNON.Plane();
  let groundBody = new CANNON.Body({ mass: 0 });
  groundBody.addShape(plane);
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

  groundBody.addEventListener("collide", e => {
    dieCollisionSound.play();
  });

  world.addBody(groundBody);
  // Create N cubes
  let shape = new CANNON.Box(new CANNON.Vec3(.41, .41, .41));
  for(let i = 0; i !== numDice; i++) {
      let body = new CANNON.Body({ mass: 0.00001 });
      body.addShape(shape);
      body.position.set(i * 1.5 - 2, 8, -10);
      // body.position.set(i * 1.5 - 2, 4, 0);
      body.velocity.z = 15;
      body.angularVelocity.x = Math.random() * 5 - 10;
      body.angularVelocity.y = Math.random() * 5 - 10;
      body.angularVelocity.z = Math.random() * 5 - 10;
      body.quaternion.set(..._.times(4, () => Math.random() * 2 - 1));
      world.addBody(body);
  }

  return world;
}

</script>

<style scoped lang='scss'>
@import '../styles/variables';

.total {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  font-size: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 0 0 100px $color-blue, 10px 10px 0px $color-blue;
}

#dice {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}

.face.selected {
  background-color: $color-blue;
  .face__text {
    color: $color-dark-blue;
  }
}

#tridiv {
  perspective: 1000px;
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: transparent;
  font-size: 100%;
}

.face {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 1);
  background-color: $color-dark-blue;
  transition: background-color .2s ease;
}
.scene, .shape, .face, .face-wrapper, .cr {
  position: absolute;
  transform-style: preserve-3d;
}
.scene {
  width: 80em;
  height: 80em;
  top: 50%;
  left: 50%;
  margin: -40em 0 0 -40em;
  transform: rotateX(130deg);
  // transform: rotateX(90deg);
}
.shape {
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  transform-origin: 50%;
}
.face, .face-wrapper {
  overflow: hidden;
  transform-origin: 0 0;
  backface-visibility: hidden;
  /* hidden by default, prevent blinking and other weird rendering glitchs */
}
.face {
  background-size: 100% 100%!important;
  background-position: center;
}
.face-wrapper .face {
  left: 100%;
  width: 100%;
  height: 100%
}
.photon-shader {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%
}
.side {
  left: 50%;
}
.cr, .cr .side {
  height: 100%;
}
[class*="cuboid"] .ft, [class*="cuboid"] .bk {
  width: 100%;
  height: 100%;
}
[class*="cuboid"] .bk {
  left: 100%;
}
[class*="cuboid"] .rt {
  transform: rotateY(-90deg) translateX(-50%);
}
[class*="cuboid"] .lt {
  transform: rotateY(90deg) translateX(-50%);
}
[class*="cuboid"] .tp {
  transform: rotateX(90deg) translateY(-50%);
}
[class*="cuboid"] .bm {
  transform: rotateX(-90deg) translateY(-50%);
}
[class*="cuboid"] .lt {
  left: 100%;
}
[class*="cuboid"] .bm {
  top: 100%;
}
/* .cub-1 styles */
.cub-1 {
  transform:translate3D(0em, 0em, 0em) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  opacity:1;
  width:5em;
  height:5em;
  margin:-2.5em 0 0 -2.5em;
}
.cub-1 .ft {
  transform:translateZ(2.5em);
}
.cub-1 .bk {
  transform:translateZ(-2.5em) rotateY(180deg);
}
.cub-1 .rt, .cub-1 .lt {
  width:5em;
  height:5em;
}
.cub-1 .tp, .cub-1 .bm {
  width:5em;
  height:5em;
}
.cub-1 .face {
  // background-color:#FFFFFF;
}

.face__text {
  position: absolute;
  // top: -30%;
  top: -0%;
  left: 0;
  width: 100%;
  height: 100%;
  color: $color-blue;
  // font-size: 80px;
  font-size: 50px;
  display: flex;
  justify-content: center;
}
</style>
