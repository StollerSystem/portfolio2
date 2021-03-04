import * as p5 from 'p5';
import Entity from './entity.js';
import Laser from './laser.js';
import { input } from '../utility/input.js';
import { lineIntersect } from '../utility/line-intersect.js';
import VaporTrail from '../effects/vapor-trail.js';
import Thruster from '../effects/thruster.js';
import { reduceLaserCharge, addDust } from '../utility/entity-utility.js';
// import { resetCanvas } from '../utility/reset.js'


export default function Ship(state, g) {
  this.w = state.windowWidth / 1800;  
  var windowMod = state.windowWidth < 1024 ? .99 : null;
  Entity.call(this, 200, g.height / 2, 20 * this.w, g, windowMod);
  this.isDestroyed = false;
  this.destroyFrames = 1000;
  this.shields = state.shieldTime;
  this.rmax = this.r * 1.5;
  this.rmax2 = this.rmax * this.rmax;
  this.buttons = state.buttons;
  this.beginGame = false;
  this.lives = state.lives;
  this.laserCharge = null;
  var scope = this;
  var backSet = 10 * this.w; // centers ship on 0, 0 

  // VAPOR TRAIL
  var trailColor = state.rgbColor3;
  var trailLength = Math.round(20 * this.w)
  this.vaporTrail = new VaporTrail(g, this.pos, trailColor, this.shields, this.r, trailLength, this.w)


  g.keyReleased = () => {
    input.handleEvent(g.key, g.keyCode, false);
  }

  g.keyPressed = () => {
    input.handleEvent(g.key, g.keyCode, true);
  }

  g.mousePressed = () => {    
    if (this.lives < 0) {
      state.fullReset = true;
    }
    this.beginGame = true;
    for (var i = 0; i < this.buttons.length; i++) {
      let key = this.buttons[i].clicked()
      if (key) {
        input.handleEvent(key[0], key[1], true);
      }
    }
    return false;
  }

  g.mouseReleased = () => {
    input.handleEvent(g.UP_ARROW, 38, false);
    input.handleEvent(g.DOWN_ARROW, 40, false);
    input.handleEvent(g.LEFT_ARROW, 37, false);
    input.handleEvent(g.RIGHT_ARROW, 39, false);
    input.handleEvent(" ".charCodeAt(0), 32, false);
  }

  var chargeEffect = false;
  var chargeEffectCount = 0;
  var charge = 0
  var keyReleased = false;
  let offSet = 29 * scope.w;
  this.shoot = function () {
    chargeEffect = true;
    chargeEffectCount = 0;
    charge = 0;
    keyReleased = false;
    setTimeout(function () {
      if (keyReleased) {
        if (reduceLaserCharge(state)) {
          chargeEffect = false;
          let scatter = g.random(.015, -.015)
          let shootPos = g.createVector(scope.pos.x + offSet * g.cos(scope.heading), scope.pos.y + offSet * g.sin(scope.heading));
          var laser = new Laser(shootPos, scope.vel, scope.heading - scatter, g, state.rgbColor2, false, scope.heading - scatter, scope.w);
          var dustVel = laser.vel.copy();
          addDust(state, shootPos, dustVel.mult(.5), 4, .045, state.rgbColor2, 5 * scope.w, g);
          state.lasers.push(laser);
        }
      } else {
        scope.chargeShot()
      }
    }, 100)
  }

  this.chargeShot = function () {
    if (!keyReleased && reduceLaserCharge(state)) {
      charge += 1
      setTimeout(function () {
        scope.chargeShot();
      }, 50)
    } else {
      chargeEffect = false;      
      if (!this.isDestroyed) {
        let scatter = g.random(.015, -.015)
        let shootPos = g.createVector(scope.pos.x + offSet * g.cos(scope.heading), scope.pos.y + offSet * g.sin(scope.heading));
        var laser = new Laser(shootPos, scope.vel, scope.heading - scatter, g, state.rgbColor2, false, scope.heading - scatter, scope.w, charge * 3);
        var dustVel = laser.vel.copy();
        addDust(state, shootPos, dustVel.mult(.5), 4, .045, state.rgbColor2, 5 * scope.w, g);
        state.lasers.push(laser);
      }
    }
  }

  input.registerAsListener(" ".charCodeAt(0), function (char, code, press) {
    if (press) {
      scope.shoot();
      return;
    }
    if (!press) {
      keyReleased = true;
      chargeEffect = false;
      return;
    }    
  });

  input.registerAsListener(g.RIGHT_ARROW, function (char, code, press) {
    scope.setRotation(press ? 0.06 : 0);    
  });

  input.registerAsListener(g.LEFT_ARROW, function (char, code, press) {
    scope.setRotation(press ? -0.06 : 0);    
  }); 

  input.registerAsListener(g.UP_ARROW, function (char, code, press) {
    scope.setAccel(press ? 0.1 : 0);    
  });

  input.registerAsListener(g.DOWN_ARROW, function (char, code, press) {
    scope.setAccel(press ? -0.1 : 0);    
  });

  this.update = function (laserCharge) {    
    this.laserCharge = state.laserCharge;    
    this.edges();
    Entity.prototype.update.call(this);
    if (this.isDestroyed) {
      for (var i = 0; i < this.brokenParts.length; i++) {
        this.brokenParts[i].pos.add(this.brokenParts[i].vel);
        this.brokenParts[i].heading += this.brokenParts[i].rot;
      }
    } else {
      this.vel.mult(1);
    }
    if (this.shields > 0) {
      this.shields -= 1;
    }
    this.vaporTrail.update(this.pos, this.heading);
  }

  this.brokenParts = [];
  this.destroy = function () {
    this.lives -= 1;
    this.isDestroyed = true;
    for (var i = 0; i < 6; i++)
      this.brokenParts[i] = {
        pos: this.pos.copy(),
        vel: this.vel.copy().add(p5.Vector.random2D().mult(g.random(1, 1.8))),
        heading: g.random(0, 360),
        rot: g.random(-0.07, 0.07)
      };
  }

  this.hits = function (asteroid) {
    if (this.shields > 0) {
      return false;
    }
    var dist2 = (this.pos.x - asteroid.pos.x) * (this.pos.x - asteroid.pos.x)
      + (this.pos.y - asteroid.pos.y) * (this.pos.y - asteroid.pos.y);
    if (dist2 >= (asteroid.rmax + this.rmax2) * (asteroid.rmax + this.rmax2)) {
      return false;
    }
    if (dist2 <= asteroid.rmin2) {      
      return true;
    }
    // HITBOX
    let backSet = 10 * this.w;
    var shipVertices = [
      g.createVector(-this.r - backSet, this.r / 2).rotate(this.heading),
      g.createVector(this.r * 2 - backSet, this.r / 2).rotate(this.heading),
      g.createVector(this.r * 2.2 - backSet, 0).rotate(this.heading),
      g.createVector(0 - backSet, -this.r / 3).rotate(this.heading),
      g.createVector(-this.r - backSet, -this.r).rotate(this.heading)
    ];
    for (var i = 0; i < shipVertices.length; i++) {
      shipVertices[i] = p5.Vector.add(shipVertices[i], this.pos);
    }
    var asteroid_vertices = asteroid.vertices();    
    for (let i = 0; i < asteroid_vertices.length; i++) {
      for (let j = 0; j < shipVertices.length; j++) {
        var next_i = (i + 1) % asteroid_vertices.length;
        if (lineIntersect(shipVertices[j], shipVertices[(j + 1) % shipVertices.length],
          asteroid_vertices[i], asteroid_vertices[next_i],g)) {           
          return true;
        }
      }
    }
    return false;
  }  

  //HITBOX 
  this.vertices = function () {
    let backSet = 10 * this.w;
    var shipVertices = [
      p5.Vector.add(g.createVector(-this.r - backSet, this.r / 2), this.pos),
      p5.Vector.add(g.createVector(this.r * 2 - backSet, this.r / 2), this.pos),
      p5.Vector.add(g.createVector(this.r * 2.2 - backSet, 0), this.pos),
      p5.Vector.add(g.createVector(0 - backSet, -this.r / 3), this.pos),
      p5.Vector.add(g.createVector(-this.r - backSet, -this.r), this.pos),
    ]
    return shipVertices;
  }

  this.edges = function () {
    if (this.pos.x >= this.g.width - this.rmax) {
      let rebound = this.vel.x < 2 ? -2 * this.w : -this.vel.x / 2;
      this.vel = g.createVector(rebound, 0);
    } else if (this.pos.x <= + this.rmax) {
      if (this.vel.x < 0) {
        this.vel.x = 0
      }
    }
    if (this.pos.y >= this.g.height - this.rmax) {
      let rebound = this.vel.y < 2 ? -2 * this.w : this.vel.y / 2;
      this.vel = g.createVector(this.vel.x, rebound);

    } else if (this.pos.y <= +this.rmax) {
      let rebound = this.vel.y > -2 ? 2 * this.w : -this.vel.y / 2;
      this.vel = g.createVector(this.vel.x, rebound);
    }
  }

  this.render = function () {
    if (this.isDestroyed) {
      for (var i = 0; i < this.brokenParts.length; i++) {
        g.push();
        let transNum = (1 * ((this.destroyFrames--) / 1000))
        let trans = transNum > 0 ? transNum : 0;
        g.stroke(`rgba(${state.rgbColor3[0]},${state.rgbColor3[1]},${state.rgbColor3[2]},${trans})`);
        var bp = this.brokenParts[i];
        g.fill(0);
        g.translate(bp.pos.x, bp.pos.y);
        g.rotate(bp.heading);
        if (i === 1) {
          g.triangle(-this.r, this.r,
            -this.r, this.r / 4,
            this.r / 2, this.r / 4);
        } else {
          g.line(-this.r / 2, -this.r / 2, this.r / 2, this.r / 2);
        }
        g.pop();
      }
    } else {      
      this.vaporTrail.render();
      g.push();
      g.translate(this.pos.x, this.pos.y);
      g.rotate(this.heading);
      g.fill(0);

      // shield up effect 
      var shieldTrans = g.random(.5, .04)
      var shieldCol = `rgba(${state.rgbColor3[1]},${state.rgbColor3[0]},${state.rgbColor3[2]},${shieldTrans})`
      var weight = this.shields > 0 ? g.random(1.5, 4) : g.random(1, 1.5);
      var shipColor = this.shields > 0 ? shieldCol : `rgba(${state.rgbColor3[0]},${state.rgbColor3[1]},${state.rgbColor3[2]},1)`;
      g.stroke(shipColor);
      g.strokeWeight(weight)

      // thruster animations
      if (this.accelMagnitude > 0) {
        let thrustEnd = g.random(-75 * this.w, -30 * this.w)
        Thruster(g, state.rgbColor2, this.r - 52 * this.w, this.r - 10 * this.w, this.r - 52 * this.w, -this.r + 10 * this.w, thrustEnd, 0)
      }
      if (this.accelMagnitude < 0) {
        let thrustEnd = g.random(70 * this.w, 50 * this.w)
        Thruster(g, state.rgbColor2, this.r * 2 - (9 * this.w), this.r / 2 - this.w - 1, this.r * 2.5 - (9 * this.w), this.w + 1, thrustEnd, this.r / 4)
      }
      if (this.rotation > 0) {
        let thrustEnd = g.random(-25 * this.w, -10 * this.w)
        Thruster(g, state.rgbColor2, 25 * this.w, -4 * this.w, 30 * this.w, -3 * this.w, 27.5 * this.w, thrustEnd)
      }
      if (this.rotation < 0) {
        let thrustEnd = g.random(30 * this.w, 10 * this.w)
        Thruster(g, state.rgbColor2, 25 * this.w, this.r / 2 * this.w, 30 * this.w, this.r / 2 * this.w, 27.5 * this.w, thrustEnd)
      }      
      
      // laser charge effect
      if (chargeEffect) {
        chargeEffectCount += .9;
        g.push()
        g.stroke(`rgba(${state.rgbColor2[0]},${state.rgbColor2[1]},${state.rgbColor2[2]},${g.random(.6,.9)})`)
        g.strokeWeight(g.random(.5,chargeEffectCount));
        g.point(this.r * 2.5 - backSet, 0)        
        g.pop()
      }

      // THE SHIP

      g.push()
      var canopyColor = this.shields > 0 ? shieldCol : `rgba(${state.rgbColor3[2]},${state.rgbColor3[0]},${state.rgbColor3[1]},1)`;
      g.stroke(canopyColor)
      g.curve(
        -1, 20,
        0 - backSet, -this.r / 3,
        this.r - backSet, -this.r / 8,
        this.r * 2, this.r * 4,
      )
      g.pop()

      g.beginShape()
      g.vertex(-this.r - backSet, this.r / 2)
      g.vertex(this.r * 2 - backSet, this.r / 2)
      g.vertex(this.r * 2.5 - backSet, 0)
      g.vertex(0 - backSet, -this.r / 3)
      g.vertex(-this.r - backSet, -this.r)
      g.endShape(g.CLOSE)
      g.triangle(-this.r - backSet, this.r,
        -this.r - backSet, this.r / 4,
        this.r / 2 - backSet, this.r / 4);
      g.pop();
    }
  }
}

Ship.prototype = Object.create(Entity.prototype);