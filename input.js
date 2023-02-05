export class InputHandler {
    constructor(game) {
        this.game = game
        this.keys = []
        window.addEventListener('keydown', e => {
            if ((e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ')
                && this.keys.indexOf(e.key) === -1
            ) {
                if (!this.game.inputDisabled) this.keys.push(e.key)
            } else if (e.key === 'd') {
                this.game.debug = !this.game.debug
            } else if (e.key === 'Enter') {
                this.game.gamePaused = !this.game.gamePaused
                this.game.player.currentState = this.game.player.setState(0, 0)
            }

        })
        window.addEventListener('keyup', e => {
            if ((e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ')) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        })
    }
}