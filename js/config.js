var map = []

var rows = 20
var cols = 20
var snakebody = 20

var dirs = {
    up: {
        x: 0,
        y: -1,
        rotate: 'rotate(-90deg)',
        flag: 'up'
    },
    down: {
        x: 0,
        y: 1,
        rotate: 'rotate(90deg)',
        flag: 'down'
    },
    left: {
        x: -1,
        y: 0,
        rotate: 'rotate(180deg)',
        flag: 'left'
    },
    right: {
        x: 1,
        y: 0,
        rotate: 'rotate(0deg)',
        flag: 'right'
    }
}
var snake = {
    snakePos: [
        { x: 0, y: 0, dom: "", flag: 'body' },
        { x: 1, y: 0, dom: "", flag: 'body' },
        { x: 2, y: 0, dom: "", flag: 'body' },
        { x: 3, y: 0, dom: "", flag: 'head' }
    ],
    dir: dirs.right,
    isCollide: false,
    getFood: false

}

var container = document.querySelector('.container')
var foodPos = {
    x: 0, y: 0, dom: "", pic: ""
}