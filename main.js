import { Player } from './player.js'
import { InputHandler } from './input.js'
import { Background } from './background.js'
import { FlyingEnemies, ClimbingEnemies, GroundEnemies } from './enemies.js'
import { UI } from './UI.js'

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1')
    // const canvas2 = document.getElementById('canvas2')
    const ctx = canvas.getContext('2d')
    // const ctx2 = canvas2.getContext('2d')
    canvas.width = 1000
    canvas.height = 500
    // canvas2.width = 500
    // canvas2.height = 500

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 50
            this.speed = 0
            this.maxSpeed = 3
            this.maxParticles = 50
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.gamePaused = true
            this.floatingMessages = []
            this.UI = new UI(this);
            this.enemies = []
            this.particles = []
            this.collisions = []
            this.enemyTimer = 0
            this.enemyInterval = 1000
            this.debug = false
            this.score = 0
            this.fontColor = 'black'
            this.time = 0
            this.maxTime = 30000
            this.winningScore = 40
            this.gameOver = false
            this.lives = 5
            this.player.currectState = this.player.states[0]
            this.player.currectState.enter()
        }
        update(deltaTime) {
            if (deltaTime && !this.gamePaused) {
                this.time += deltaTime
            }
            if (this.time > this.maxTime) this.gameOver = true
            this.background.update()
            this.player.update(this.input.keys, deltaTime)
            // handleEnemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy()
                this.enemyTimer = 0
            } else {
                if (deltaTime) {
                    this.enemyTimer += deltaTime
                }
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime)
            })
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
            // handle particles
            this.particles.forEach((particles, index) => {
                particles.update()
            })
            this.particles = this.particles.filter(particle => !particle.markedForDeletion)
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles
            }
            // floating msgs
            this.floatingMessages.forEach((msg, index) => {
                msg.update()
            })
            this.floatingMessages = this.floatingMessages.filter(msgs => !msgs.markedForDeletion)
            // handle collisions sprites
            this.collisions.forEach((collision, index) => {
                if (deltaTime) {
                    collision.update(deltaTime)
                }
            })
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion)


        }
        draw(context) {
            this.background.draw(context)
            this.player.draw(context)
            this.enemies.forEach(enemy => {
                enemy.draw(context)
            })
            this.particles.forEach(particle => {
                particle.draw(context)
            })
            this.collisions.forEach(collision => {
                collision.draw(context)
            })
            this.floatingMessages.forEach((msg) => {
                msg.draw(context)
            })
            this.UI.draw(context)
        }
        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemies(this))
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemies(this))
            this.enemies.push(new FlyingEnemies(this))
        }
    }

    const game = new Game(canvas.width, canvas.height)
    // const game2 = new Game(canvas2.width, canvas2.height)

    let lastTime = 0
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
        game.update(deltaTime);
        // game2.update(deltaTime);
        game.draw(ctx);
        // game2.draw(ctx2);
        if (!game.gameOver) requestAnimationFrame(animate)
    }
    animate()
})

