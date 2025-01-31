// Code Practice: RNGolf
// Name: Tommy Nguyen
// Date: Jan 29 2025

'use strict';

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 960,
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
    scene: [Play]
};

const game = new Phaser.Game(config);
const { width, height } = game.config;