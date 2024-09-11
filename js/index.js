function initGame() {
    // 1. init map
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            map.push({
                x: j,
                y: i
            })
        }
    }
    // 2. init snake: create dom
    snake.snakePos.forEach((snk) => {
        if (!snk.dom) {
            // create dom
            var div = document.createElement('div')
            div.style.width = snakebody + 'px'
            div.style.height = snakebody + 'px'
            div.style.position = 'absolute'
            if (snk.flag === 'body') {
                div.style.backgroundColor = '#E2A1A1'
                div.style.borderRadius = '50px'
            } else {
                div.style.background = 'url(../img/pig.png) center/contain no-repeat'
            }
            snk.dom = div
        }
        // change position 
        snk.dom.style.left = snk.x * snakebody + 'px'
        snk.dom.style.top = snk.y * snakebody + 'px'
        // 3. draw snake
        container.appendChild(snk.dom)
    })

    // initfood 
    // find valid food position 
    isValid = true
    while (true) {
        var foodX = Math.floor(Math.random() * 20)
        var foodY = Math.floor(Math.random() * 20)
        snake.snakePos.forEach((snk) => {
            if (snk.x === foodX && snk.y === foodY) {
                isValid = false;
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
        div.style.background = `url(../img/food/meat-${index}.png) center/contain no-repeat`
        foodPos.dom = div
    }
    foodPos.dom.style.left = foodPos.x * snakebody + 'px'
    foodPos.dom.style.top = foodPos.y * snakebody + 'px'
    container.appendChild(foodPos.dom)
    console.log(foodPos.dom)


}
initGame()