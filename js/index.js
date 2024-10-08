

function start() {
    initMap()
    drawSnake()
    drawFood()
    timer = timerFN()
}

function initMap() {
    // 1. init map
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            map.push({
                x: j,
                y: i
            })
        }
    }
}


function drawSnake() {
    // 2. init snake: create dom
    snake.snakePos.forEach((snk) => {
        if (!snk.dom) {
            // create dom
            var div = document.createElement('div')
            div.style.width = snakebody + 'px'
            div.style.height = snakebody + 'px'
            div.style.position = 'absolute'
            snk.dom = div
        }
        if (snk.flag === 'body') {
            snk.dom.style.backgroundImage = 'none'
            snk.dom.style.backgroundColor = '#E2A1A1'
            snk.dom.style.borderRadius = '50px'
        } else {
            snk.dom.style.background = 'url(../img/pig.png) center/contain no-repeat'
            snk.dom.style.transform = snake.dir.rotate
        }

        // change position 
        snk.dom.style.left = snk.x * snakebody + 'px'
        snk.dom.style.top = snk.y * snakebody + 'px'
        // 3. draw snake
        container.appendChild(snk.dom)
    })
}


function drawFood() {
    // initfood 
    // find valid food position 
    isValid = true
    while (true) {
        var foodX = Math.floor(Math.random() * 20)
        var foodY = Math.floor(Math.random() * 20)
        snake.snakePos.forEach((snk) => {
            if (snk.x === foodX && snk.y === foodY) {
                isValid = false; // forEach不可以break
            }
        })
        if (isValid) {
            foodPos.x = foodX
            foodPos.y = foodY
            break
        }
    }

    // random food [1,4] 
    var index = Math.floor(Math.random() * 4) + 1

    // draw food
    if (!foodPos.dom) {
        var div = document.createElement('div')
        div.style.width = snakebody + 'px'
        div.style.height = snakebody + 'px'
        div.style.position = 'absolute'
        foodPos.dom = div
    }
    foodPos.dom.style.background = `url(../img/food/meat-${index}.png) center/contain no-repeat`
    foodPos.dom.style.left = foodPos.x * snakebody + 'px'
    foodPos.dom.style.top = foodPos.y * snakebody + 'px'
    container.appendChild(foodPos.dom)
    console.log(foodPos.dom)
}

function isCollide() {
    // 1. edge 
    var oldHead = snake.snakePos[snake.snakePos.length - 1]
    var newHead = {
        x: oldHead.x + snake.dir.x,
        y: oldHead.y + snake.dir.y,
        dom: "",
        flag: 'head'
    }
    if (((newHead.x < 0) || (newHead.x >= 20)) ||
        ((newHead.y < 0) || (newHead.y >= 20))) {
        snake.isCollide = true;
        return
    }
    // 2. snake itself 
    snake.snakePos.forEach((p) => {
        if (newHead.x === p.x && newHead.y === p.y) {
            snake.isCollide = true;
        }
    })

    // 3. getFood?
    if (newHead.x === foodPos.x && newHead.y === foodPos.y) {
        score++;
        snake.getFood = true
    }
    return newHead
}

function removeAll() {
    snake.snakePos.forEach((p) => {
        container.removeChild(p.dom)
    })
    container.removeChild(foodPos.dom)
}

function moveSnake() {
    // 1. iscollide?
    var newHead = isCollide()

    // collide -> return 
    // getfood -> change food pos 
    if (snake.isCollide) {
        console.log('collide')
        if (window.confirm(`Restart? Your score is ${score}`)) {
            removeAll()
            snake = {
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
            foodPos = {
                x: 0, y: 0, dom: "", pic: ""
            }
            score = 0;
            drawSnake()
            drawFood()
        } else {
            document.onkeydown = null
            clearInterval(timer)
        }
        return
    }

    if (snake.getFood) {
        addPos = { x: foodPos.x, y: foodPos.y }
        //  console.log("get food -> " + addPos)
        drawFood()
    }

    // 2. change snake pos 
    // 2.1 body
    snake.snakePos[snake.snakePos.length - 1].flag = 'body'
    var tail = snake.snakePos[0]
    if (addPos == null || ((addPos.x !== tail.x) || (addPos.y !== tail.y))) {
        var tail = snake.snakePos.shift() // remove the tail
        container.removeChild(tail.dom)
        console.log(1)
    } else {
        addPos = null
        console.log(2)
    }

    // 2.2  head 
    snake.snakePos.push(newHead)

    // 3. draw the dom 
    drawSnake()

    // 4. restore snake state
    snake.isCollide = false;
    snake.getFood = false
}

function onkeydownFN(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (snake.dir.flag !== 'down') {
                snake.dir = dirs.up
            }
            break
        case 'ArrowDown':
            if (snake.dir.flag !== 'up') {
                snake.dir = dirs.down
            }
            break
        case 'ArrowLeft':
            if (snake.dir.flag !== 'right') {
                snake.dir = dirs.left
            }
            break
        case 'ArrowRight':
            if (snake.dir.flag !== 'left') {
                snake.dir = dirs.right
            }
            break
    }
}

function timerFN() {
    return setInterval(function () {
        moveSnake()
    }, 100)
}

function bindEvent() {
    startbtn.addEventListener('click', function (event) {
        startbtn.style.display = 'none'
        start()
        event.stopPropagation();
        document.onkeydown = function (e) {
            onkeydownFN(e)
        }
        document.onclick = function () {
            replaybtnDom.style.display = 'block'
            document.onkeydown = null
            clearInterval(timer)
        }
        replaybtnDom.onclick = function (event) {
            document.onkeydown = function (e) {
                onkeydownFN(e)
            }
            replaybtnDom.style.display = 'none'
            event.stopPropagation();
            timer = timerFN()
        }
    })

}

bindEvent()

