var map = []

var rows = 20
var cols = 20
var snakebody = 20

var snake = {
    snakePos: [
        { x: 0, y: 0, dom: "", flag: 'body' },
        { x: 1, y: 0, dom: "", flag: 'body' },
        { x: 2, y: 0, dom: "", flag: 'body' },
        { x: 3, y: 0, dom: "", flag: 'head' }
    ]

}

var container = document.querySelector('.container')
var foodPos = {
    x: 0, y: 0, dom: "", pic: ""
}