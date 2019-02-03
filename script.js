
let Size = 10
let Color = {
    Red:{r:255,g:0,b:0},
    Green:{r:0,g:255,b:0},
    Blue:{r:0,g:0,b:255},
    Yellow:{r:238, g:244, b:66},
    White:{r:255,g:255,b:255}
}

//let Rules = [[Color.Red, "Left"], [Color.Green, "Right"], [Color.Blue, "Right"], [Color.Yellow,"Left"]]
//let Rules = [[Color.Red, "Right"], [Color.Green, "Left"], [Color.Blue, "Right"], [Color.Yellow,"Left"]]
let Rules = [[Color.Red, "Right"], [Color.Green, "Left"], [Color.Yellow,"Left"], [Color.Blue, "Right"]]


let pos
let direction = "Up"


let map = []


function setup() {
    createCanvas(600, 600)
    pos = {x:width / 2 / Size, y:width / 2 / Size}
    pixelDensity(1)
    for (let x = 0; x < width / Size; x++) {
        map[x] = []
        for (let y = 0; y < height / Size; y++) {
            map[x][y] = Color.White
        }
    }
    map[pos.x][pos.y] = Rules[0][0]
    background(90)
}

function draw() {
    //console.log(frameCount)
    step()
    fill(map[pos.x][pos.y].r,map[pos.x][pos.y].g,map[pos.x][pos.y].b,255)
    //point(pos.x, pos.y)
    stroke(0)
    rect(pos.x * Size, pos.y * Size, Size, Size)
    //drawMapToScreen()
}

function step(){
    var newPos = pos
    switch (direction) {
        case "Up":
            newPos.y -= 1
            if(newPos.y < 0) newPos.y = height / Size
            break
        case "Down":
            newPos.y += 1
            if(newPos.y >= height / Size) newPos.y = 0
            break
        case "Right":
            newPos.x += 1
            if(newPos.x < 0) newPos.x = width / Size
            break
        case "Left":
            newPos.x -= 1
            if(newPos.x >= width / Size) newPos.x = 0
            break
    }
    for (let i = 0; i < Rules.length; i++) {
        if(map[newPos.x][newPos.y] == Rules[i][0]){
            Turn(Rules[i][1])
            map[newPos.x][newPos.y] = Rules[(i + 1) % Rules.length][0]
            return
        }
    }
    map[newPos.x][newPos.y] = Rules[0][0]
    Turn(Rules[0][1])
}

function Turn(Way){
    if(Way == "Left"){
        if(direction == "Up"){
            direction = "Left"
        }
        else if(direction == "Left"){
            direction = "Down"
        }
        else if(direction == "Down"){
            direction = "Right"
        }
        else{
            direction = "Up"
        }
    }
    else{
        if(direction == "Up"){
            direction = "Right"
        }
        else if(direction == "Right"){
            direction = "Down"
        }
        else if(direction == "Down"){
            direction = "Left"
        }
        else{
            direction = "Up"
        }
    }
}

function drawMapToScreen(){
    loadPixels()
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            pixels[x + y * width] = map[x][y].r
            pixels[x + y * width + 1] = map[x][y].g
            pixels[x + y * width + 2] = map[x][y].b
            pixels[x + y * width + 3] = 255
        }
    }
    updatePixels()
}

function srandom() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

