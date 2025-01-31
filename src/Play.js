class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // useful variables
        this.SHOT_VELOCITY_Y_MIN = 700
        this.SHOT_VELOCITY_Y_MAX = 1100
        this.SHOT_VELOCITY_X_MIN = 700
        this.SHOT_VELOCITY_X_MAX = 1100
        this.wallSpeedMin = 100
        this.wallSpeedMax = 200
        this.shots = 0
        this.score = 0
        this.shotpercent = 0
        
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png')
        this.load.image('wall', 'wall.png')
        this.load.image('oneway', 'one_way_wall.png')
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        this.cup = this.physics.add.sprite(width / 2, height / 10, 'cup',)
        this.cup.body.setCircle(this.cup.width/4)
        this.cup.body.setOffset(this.cup.width / 4)
        this.cup.body.setImmovable(true)

        // add ball
        this.ball = this.physics.add.sprite(width / 2, height - height/10, 'ball')
        this.ball.body.setCircle(this.ball.width / 2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(0.5)
        this.ball.body.setDamping(true).setDrag(0.5)


        // add walls
        let wallA = this.physics.add.sprite(0, height / 4, 'wall')
        wallA.setX(Phaser.Math.Between(0 + wallA.width/2, width - wallA.width/2))
        wallA.body.setImmovable(true)
        wallA.setVelocityX(Phaser.Math.Between(this.wallSpeedMin, this.wallSpeedMax))
        wallA.body.setCollideWorldBounds(true)
        wallA.body.setBounce(1)

        let wallB = this.physics.add.sprite(0, height / 2, 'wall')
        wallB.setX(Phaser.Math.Between(0 + wallB.width/2, width - wallB.width/2))
        wallB.body.setImmovable(true)

        this.walls = this.add.group(wallA, wallB)

        // add one-way
        this.oneWay = this.physics.add.sprite(0, height / 4 * 3,'oneway')
        this.oneWay.setX(Phaser.Math.Between(0 + this.oneWay.width / 2, width - this.oneWay.width / 2))
        this.oneWay.body.setImmovable(true)
        this.oneWay.body.checkCollision.down = false

        // add pointer input
        this.input.on('pointerdown', (pointer) => {
            let shotDirectionY = pointer.y <= this.ball.y ? 1 : -1
            let shotDirectionX = pointer.x <= this.ball.x ? 1 : -1
            this.ball.body.setVelocityX(Phaser.Math.Between(this.SHOT_VELOCITY_X_MIN, this.SHOT_VELOCITY_X_MAX) * shotDirectionX)
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX) * shotDirectionY)
            this.shots += 1

            this.shotstext.text = "shots: " + this.shots
            this.shotpercent = this.score / this.shots
            this.shotpercenttext.text = "successful shot percentage: " + Math.trunc(this.shotpercent *  100) + "%"
        })

        // cup/ball collision
        this.physics.add.collider(this.ball, this.cup, (ball, cup) => {
            ball.setX(width/2)
            ball.setY(height - height/10)
            ball.setVelocity(0, 0)
            this.score += 1
            this.scoretext.text = "score: " + this.score
            this.shotpercent = this.score / this.shots
            this.shotpercenttext.text = "successful shot percentage: " + Math.trunc(this.shotpercent *  100) + "%"
        })

        // ball/wall collision
        this.physics.add.collider(this.ball, this.walls)

        // ball/one-way collision
        this.physics.add.collider(this.ball, this.oneWay)


        this.shotstext = this.add.text(width/20, height/50, "shots: " + this.shots)
        this.scoretext = this.add.text(width/20, height/50*2, "score: " + this.score)
        this.shotpercenttext = this.add.text(width/20, height/50*3, "successful shot percentage: " + this.shotpercent + "%")
    }

    update() {

    }
}
/*
CODE CHALLENGE
Try to implement at least 3/4 of the following features during the remainder of class (hint: each takes roughly 15 or fewer lines of code to implement):
[done] Add ball reset logic on successful shot
[done] Improve shot logic by making pointer’s relative x-position shoot the ball in correct x-direction
[done] Make one obstacle move left/right and bounce against screen edges
[done] Create and display shot counter, score, and successful shot percentage
*/