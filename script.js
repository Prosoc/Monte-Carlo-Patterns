var windowSize
var ruleInp
let Size = 1
let ColorNames = []
let Color = {
    Red:cc(220,20,60,"Red"),
    Green:cc(34,139,34,"Green"),
    Blue:cc(0,0,128,"Blue"),
    Yellow:cc(238, 244, 66,"Yellow"),
    White:cc(255,255,255,"White"),
    Magenta:cc(255,0,255,"Magenta"),
    Lime:cc(128,255,0,"Lime"),
    Purple:cc(205,0,170,"Purple"),
    Cyan:cc(0,255,255,"Cyan"),
    Black:cc(0,0,0,"Black"),
    Pink:cc(255,105,180,"Pink"),
    Brown:cc(160,82,45, "Brown")
}
ColorNames.sort()

function cc(r,g,b,name){
    ColorNames.push(name)
    return {r:r, g:g, b:b, Name:name}
}


//let Rules = [[Color.Red, "Left"], [Color.Green, "Right"], [Color.Blue, "Right"], [Color.Yellow,"Left"]]
//let Rules = [[Color.Red, "Right"], [Color.Green, "Left"], [Color.Blue, "Right"], [Color.Yellow,"Left"]]
let Rules = [[Color.Red, "Right"], [Color.Green, "Left"], [Color.Yellow,"Right"]]


let pos
let direction = "Up"


let map = []


function setup() {
    windowSize = Math.floor(Math.min(windowHeight * 0.97, windowWidth * 0.97))
    
    
    Size = Math.max(Size, Math.floor(windowSize / 60))
    var canvas = createCanvas(windowSize, windowSize)
    canvas.elt.setAttribute("style", "float: left")
    pos = {x:Math.floor(windowSize / 2 / Size), y:Math.floor(windowSize / 2 / Size)}
    pixelDensity(1)
    for (let x = 0; x < windowSize / Size; x++) {
        map[x] = []
        for (let y = 0; y < windowSize / Size; y++) {
            map[x][y] = Color.White
        }
    }
    map[pos.x][pos.y] = Rules[0][0]
    background(90)

    var d = createDiv()
    var p2 = createP("Rule: ")
    p2.parent(d)
    ruleInp = createInput('');
    ruleInp.input(ruleEvent, "textarea");
    ruleInp.elt.setAttribute("style", "")
    ruleInp.elt.value = RuleToString(Rules)
    ruleInp.size(600)
    ruleInp.parent(d)

    var cstr = ""
    for (let i = 0; i < ColorNames.length; i++) {
        const element = ColorNames[i];
        cstr += element + (i < ColorNames.length - 1?", ":"")
        
    }
    var p1 = createP("Colors: <br>" + cstr)
    
    p1.size(300)
    p1.parent(d)
    d.elt.setAttribute("style", "margin-left: " + (windowSize + 20) + "px")
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
            break
        case "Down":
            newPos.y += 1
            break
        case "Right":
            newPos.x += 1
            break
        case "Left":
            newPos.x -= 1
            break
    }
    if(newPos.x < 0 || newPos.x >= map.length - 1 || newPos.y < 0 || newPos.y >= map.length - 1)
    {
        Reset()
        return
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
    for (let x = 0; x < windowSize; x++) {
        for (let y = 0; y < windowSize; y++) {
            pixels[x + y * windowSize] = map[x][y].r
            pixels[x + y * windowSize + 1] = map[x][y].g
            pixels[x + y * windowSize + 2] = map[x][y].b
            pixels[x + y * windowSize + 3] = 255
        }
    }
    updatePixels()
}

function srandom() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function ruleEvent(){
    var newRules = StringToRule(this.elt.value)
    if(newRules.length != Rules.length){
        Rules = newRules
        Reset()
    }
}

function RuleToString(rules){
    var out = ""
    for (let i = 0; i < rules.length; i++) {
        out += rules[i][0].Name + "-" + rules[i][1] + (i < rules.length - 1?"->":"")
    }
    return out
}

function StringToRule(str){
    var newRules = []
    var parts = str.split("->")
    for(var i = 0; i < parts.length; i++){
        var r = parts[i].split("-")
        if(Color[r[0]] != undefined && (r[1] == "Left" || r[1] == "Right")){
            newRules.push([Color[r[0]], r[1]])
        }
    }
    return newRules
}

function Reset(){
    pos = {x:Math.floor(windowSize / 2 / Size), y:Math.floor(windowSize / 2 / Size)}
    for (let x = 0; x < windowSize / Size; x++) {
        map[x] = []
        for (let y = 0; y < windowSize / Size; y++) {
            map[x][y] = Color.White
        }
    }
    map[pos.x][pos.y] = Rules[0][0]
    
    direction = "Up"
    background(90)
}