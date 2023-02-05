export class UI {
    constructor(game) {
        this.game = game
        this.fontSize = 30
        this.fontFamily = 'Creepster'
        this.secondaryFontFamily = 'DM Sans'
        this.liveImage = document.getElementById('lives')
    }
    draw(context) {
        context.save()
        context.shadowOffsetX = 2
        context.shadowOffsetY = 2
        context.shadowColor = 'white'
        context.shadowBlur = 0
        context.font = this.fontSize + 'px ' + this.fontFamily
        context.textAlign = 'left'
        context.fillStyle = this.game.fontColor
        // score
        context.fillText('Score: ' + this.game.score, 20, 50)
        // timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily
        context.fillText('Time: ' + (this.game.time / 1000).toFixed(1), 20, 80)
        // lives
        for (let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.liveImage, 25 * i + 20, 95, 25, 25)
        }
        // game over messages
        if (this.game.gameOver) {
            context.textAlign = 'center'
            // context.font = this.fontSize * 2 + 'px ' + this.fontFamily
            // context.fillText('Boo-yah', this.game.width * 0.5, this.game.height * 0.5 - 20)
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily
            if (this.game.score > this.game.winningScore) {
                context.fillText('You Win!', this.game.width * 0.5, this.game.height * 0.5 + 30)
            } else {
                context.fillText('You Lose!', this.game.width * 0.5, this.game.height * 0.5 + 30)
            }
        }
        if (this.game.gamePaused) {
            context.textAlign = 'center'
            context.font = this.fontSize * 3 + 'px ' + this.fontFamily
            context.fillText('Paused', this.game.width * 0.5, this.game.height * 0.4)
            context.beginPath();
            context.rect(this.game.width * 0.2, this.game.height * 0.45, 600, 250)
            // context.fillStyle='#fa4b2a'
            context.fillRect(this.game.width * 0.2, this.game.height * 0.45, 600, 250)
            context.stroke()
            context.shadowOffsetX = 0
            context.shadowOffsetY = 0
            context.fillStyle = 'white'
            context.font = this.fontSize * 0.8 + 'px ' + this.secondaryFontFamily
            context.fillText('Controls', this.game.width * 0.5, this.game.height * 0.5)
            context.fillText('- Arrow keys to navigate', this.game.width * 0.5, this.game.height * 0.5 + 30)
            context.fillText('- Space to roll and attack', this.game.width * 0.5, this.game.height * 0.5 + 60)
            context.fillText('- Enter to pause/resume the game', this.game.width * 0.5, this.game.height * 0.5 + 90)

            context.fillText('Instructions', this.game.width * 0.5, this.game.height * 0.5 + 120)
            context.fillText('- You have to score 40 points in 30 seconds', this.game.width * 0.5, this.game.height * 0.5 + 150)
            context.fillText('- For every successful attack you get a +1 score', this.game.width * 0.5, this.game.height * 0.5 + 180)
            context.fillText('- For every hit you lose 1 life and a -5 score', this.game.width * 0.5, this.game.height * 0.5 + 210)



        }
        context.restore()
    }
}