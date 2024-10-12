import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {

        this.load.audio('break', '/assets/audio/break.ogg')
        this.load.audio('change', '/assets/audio/change.ogg')
        this.load.audio('jump', '/assets/audio/jump.ogg')
        this.load.audio('die', '/assets/audio/die.ogg')
        this.load.audio('switch', '/assets/audio/switch.ogg')

        this.load.setPath('assets');

        this.load.image('debris', 'debris.png');

        this.load.image('ground', 'block5.png');
        this.load.image('ground2', 'block6.png');

        this.load.image('trophy', 'trophy.png');

        this.load.image('bg', 'bg.png');
        this.load.image('bg-dark', 'bg-dark.png');
        this.load.image('window', 'window.png');

        this.load.image('enemy', 'enemy.png');
        this.load.image('slim', 'slim.png');
        this.load.image('fat', 'fat.png');
        this.load.image('box', 'box.png');
        this.load.image('spike', 'spike.png');
        this.load.image('spike-left', 'spike-left.png');
        this.load.image('spike-down', 'spike-down.png');

        this.load.image('laser', 'laser.png');
        this.load.image('laser2', 'laser2.png');
        this.load.image('switch', 'switch-blue.png');
        this.load.image('breakBlock', 'block-breaki.png');

        this.load.image('player-right', 'du.png');
        this.load.image('player-left', 'du-left.png');
        this.load.image('dead', 'dead.png');
        this.load.image('flag', 'exit.png');
        this.load.image('switchOff', 'switch-red.png');

        this.load.image('player-right-yellow', 'du2.png');
        this.load.image('player-left-yellow', 'du-left2.png');
        this.load.image('dead-yellow', 'dead2.png');
        this.load.image('flag-yellow', 'exit2.png');
        this.load.image('switchOff-yellow', 'switch-yellow.png');

        this.load.image('gun', 'gun.png');
        this.load.image('bullet', 'bullet.png');
        this.load.image('bullet-yellow', 'bullet-yellow.png');

        



    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
