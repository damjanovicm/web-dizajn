 //------RUNNING--------

let lastRenderTime = 0
const gameBoard = document.getElementById('game-board')
const SNAKE_SPEED = 7
const snakeBody = [{x: 11, y: 11}]
let inputDirection = {x: 0, y: 0}
let lasInputDirection = {x: 0, y: 0}
let food = getRandomFoodPosition()
const EXPANTION_RATE = 1
let newSegments = 0
let gameOver = false
const GRID_SIZe = 21


//WIN
function checkWin(){
    if(snakeBody.length == 440){
        confirm('YOU WON!!!')
    }
    return
}

//SCORE
function scoreBoard(){
        return document.getElementById('score').innerHTML = "Score: " + snakeBody.length 
}


//LOOP
function main(currentTime){

    if(gameOver){
       if(confirm('Game Over! You collected '+ snakeBody.length +' goods, press "ok" to restart.')){
           window.location = './snake.html'
       }
       return
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime-lastRenderTime) / 1000
     if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

 function update(){
 
    addSegments()  
    updateSnake()
    updateFood()
    checkDeath()
    scoreBoard()

}

function draw(){
    gameBoard.innerHTML = ''
    drawSnake()
    drawFood()
}


//CHECK FOR DEATH

function outsideGrid(position){
    return (
        position.x < 1 || position.x > GRID_SIZe || 
        position.y < 1 || position.y > GRID_SIZe
    )
}

function getSnakeHead(){
    return snakeBody[0]
}

function snakeIntersection(){
    return onSnake(snakeBody[0], {ignoreHead: true})
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}



//-----RUNNING-END--------


//---------SNAKE----------


//UPDATE

function updateSnake(){

  const inputDirection = getInputDirection()

  for (let i = snakeBody.length - 2; i >= 0; i--){
      snakeBody[i + 1] = { ...snakeBody[i]}
  }

  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y
}


//DRAW
function drawSnake (){
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}


//INPUT 
function getInputDirection(){
    lasInputDirection = inputDirection
    return inputDirection
}

//MOVING
window.addEventListener('keydown', e => {
    switch(e.key){
        case 'ArrowUp':
            if(lasInputDirection.y !== 0) break
            inputDirection = {x: 0, y: -1}
            break
        case 'ArrowDown':
            if(lasInputDirection.y !== 0) break
            inputDirection = {x: 0, y: 1}
            break
        case 'ArrowLeft':
            if(lasInputDirection.x !== 0) break
            inputDirection = {x: -1, y: 0}
            break
        case 'ArrowRight':
            if(lasInputDirection.x !== 0) break
            inputDirection = {x: 1, y: 0}
            break
    }
})

//-------SNAKE-END--------



//---------FOOD-----------

//NEW RANDOM APPLE POSITION

function getRandomFoodPosition(){
    let newFoodPosition
    
    while( newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}

function randomGridPosition(){

    const GRID_SIZE = 21

    return{
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

 //EXPANDING SNAKE ON EATEN APPLE
 function expandSnake(amount){
    newSegments += amount
}

function onSnake(position, {ignoreHead = false} = {}){
   return snakeBody.some((segment, index) => {
       if(ignoreHead && index === 0) return false
       return equalPositions(segment, position)
   })
}

function equalPositions(pos1, pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
  for(let i = 0; i < newSegments; i++){
      snakeBody.push({ ...snakeBody[snakeBody.length - 1 ]})
  }
  newSegments = 0
}



//UPDATE
function updateFood(){
     if(onSnake(food)){
      expandSnake(EXPANTION_RATE)
      food = getRandomFoodPosition()
    }

  }
  
  //DRAW
  function drawFood (){
          const foodElement = document.createElement('div')
          
          foodElement.style.gridRowStart = food.y
          foodElement.style.gridColumnStart = food.x
          foodElement.classList.add('food')
          gameBoard.appendChild(foodElement)
  }


 //------FOOD-END------ 

