var screen = []
var id = 0

const soundTrack = new Audio("./img/GameTheme.mp3")
const breakLine = new Audio("./img/bonusSound.wav")
const soundMove = new Audio("./img/mixkit-arcade-video-game-pop-2887.wav")
const gameOverSound = new Audio("./img/gameOver.wav")

let screenDiv = document.getElementById("gameScreen")
for(let i=0;i<22;i++)
{
    let gridDiv = document.createElement("div")
    gridDiv.className = "grid-container"
    screenDiv.appendChild(gridDiv)

    let array =[]
    screen[i] = array

    for(let j=0;j<12;j++)
    {
        id+=1
        screen[i].push(id)
        let divImage = document.createElement("div")
        divImage.id = id
        divImage.className = "divImages"
        gridDiv.appendChild(divImage)

    }
}
console.log(screen)
var step = 1

// lets put all the divs id in the left and right edges
let leftEdge = []
let rightEdge = []
for(let i =1;i<265;i+=12)
{
    leftEdge.push(i)
    document.getElementById(String(i)).style.background = "grey"
    rightEdge.push(i+11)
    document.getElementById(String(i+11)).style.background = "grey"
}
console.log(leftEdge)
console.log(rightEdge)

var interval;
// alreadyshaped: we are puting the edge bottom so once the shape arrived to the bottom it stoped 
var alreadyshaped = [] // 
var alreadyColored = []
for(let i =253;i<265;i++)
{
    alreadyshaped.push(i)
    alreadyColored.push("grey")
    document.getElementById(String(i)).style.background = "grey"
}

//console.log(alreadyshaped)
alreadyshaped.sort(function(a, b){return b-a}) //making it in descending order
console.log("this"  +alreadyshaped)

var b;

//const shapes = [[4,5,6,7,"lShape"],[15,16,5,6,"square"],[15,4,5,6,"tShape"],[14,4,25,15,"sShape"],[4,14,24,25]]

var shape
var rotationDegree=0
var color
var deficulties = 600
var score = 0

function deleteShape()
{
    document.getElementById(String(shape[0])).style.background = "black"
    document.getElementById(String(shape[1])).style.background = "black"
    document.getElementById(String(shape[2])).style.background = "black"
    document.getElementById(String(shape[3])).style.background = "black"
}

function drawShape(steps)
{
    shape[0] = shape[0] + steps
    shape[1] = shape[1] + steps
    shape[2] = shape[2] + steps
    shape[3] = shape[3] + steps
    b+=steps
    document.getElementById(String(shape[0])).style.background = color
    document.getElementById(String(shape[1])).style.background = color
    document.getElementById(String(shape[2])).style.background = color
    document.getElementById(String(shape[3])).style.background = color
}




function rotateBanned(newShape)
{
    if(leftEdge.includes(newShape[0])===false && leftEdge.includes(newShape[1])===false && leftEdge.includes(newShape[2])===false &&
    leftEdge.includes(newShape[3])===false && rightEdge.includes(newShape[0])===false && rightEdge.includes(newShape[1])===false && 
    rightEdge.includes(newShape[2])===false && rightEdge.includes(newShape[3])===false) 
    {
        return newShape
    }
    else
    {
        return shape
    }

}



function generateRandomShapes()
{
    soundTrack.play()
    soundTrack.repeat =  true
    b=17
    rotationDegree = 0
    var iShape = /*first rotation*/ [b-1,b,b+1,b+2,"i"]// second [b-10,b,b+10,b+20,"i"] 3th [b-2,b-1,b,b+1,"i"] 4th[b-20,b-10,b,b+10,"i"]
    var tShape = [b-1,b,b+1,b+12,"t"] //[b-10,b,b-1,b+10,"t"],[b,b-1+10,b+10,b+10+1,"t"],[b-10,b+1,b,b+10,"t"]
    var sShape = [b,b+12,b+12+1,b+1+24,"s"]//[b,b+1,b+10-1,b,"s"],[b-10+1,b+1,b,b+10-1,"s"],[b,b+1,b+10-1,b,"s"]]
    var lShape = [b+12,b,b+24,b+1,"l"]//[b-1,b,b+1,b-1+10,"l"],[b+1,b-10+1,b-10,b+1,b+10+1,"l"],[b+1,b+1+10,b+10,b+10-1,"l"]]
    var squarShape = [b,b+1,b+12,b+12+1,"sq"]//[b,b+1,b+10,b+10+1,"sq"],[b,b+1,b+10,b+10+1,"sq"],[b,b+1,b+10,b+10+1,"sq"]
    const shapes = [iShape,tShape,sShape,lShape,squarShape]
    document.getElementById("start").disabled = true
    color = ["red","yellow","pink","green","purple","orange","orangered","olive","orchid","blue","azure","chartreuse","cyan","lime","navajowhite","tan"][Math.floor(Math.random()*16)]
    console.log(color)

    shape = shapes[Math.floor(Math.random()* (shapes.length))]


   // first rotation
    //console.log("this is the shape " + shape)
    //console.log("this is the color " + color)
    for(let i = 0; i< 4;i++)
    {
        document.getElementById(String(shape[i])).style.background = color
    }
    
    if(alreadyshaped.includes(shape[0]) === false && alreadyshaped.includes(shape[1]) === false && alreadyshaped.includes(shape[2]) === false && alreadyshaped.includes(shape[3]) === false) // else Game Over
    {
        var interval = setInterval(() => {
            // console.log(b)

                if(alreadyshaped.includes(shape[0]+12) === false && alreadyshaped.includes(shape[1] +12) === false && alreadyshaped.includes(shape[2]+12) === false && alreadyshaped.includes(shape[3]+12) === false) 
                {

                        deleteShape()
                        drawShape(12)
                }
                else
                {
                    for(let i=0;i<4;i++)
                    {
                        if(alreadyshaped.includes(shape[i]) === false)
                        {
                            alreadyshaped.push(shape[i])
                            alreadyColored.push(document.getElementById(String(shape[i])).style.background)
                        }
                        
                    }
                    clearInterval(interval)
                    alreadyshaped.sort(function(a, b){return b-a})
                    deletingLine()
                    generateRandomShapes()
                    
                }
            },deficulties)


    console.log(alreadyshaped)

}

else
{

    document.getElementById("gOver").style.display = "block"
    soundTrack.pause()
    gameOverSound.play()
    document.getElementById("reset").disabled = false
    console.log(alreadyshaped)
    b=14 // reset b to the first index at the top of the screen



}
}

function reset()
{
    document.getElementById("gOver").style.display = "none"
    document.getElementById("start").disabled = false;
    b=14 // reset b to begin the shape at the div id 14 .. top of  screen
    rotationDegree = 0
    alreadyshaped = [] 
    for(let i =253;i<265;i++)
    {
        alreadyshaped.push(i)

    }
    for(let i =1;i<265;i++)
    {
        document.getElementById(String(i)).style.background="rgb(66, 52, 52)"
    }
}




document.getElementById("start").addEventListener("click",generateRandomShapes)
document.getElementById("right").addEventListener("click",turnRight)
document.getElementById("left").addEventListener("click",turnLeft)
document.getElementById("reset").addEventListener("click",reset)
document.getElementById("rotate").addEventListener("click",rotate)
document.getElementById("mode").addEventListener("click",setDeficulties)




function turnLeft()
{
   
    if(( leftEdge.includes(shape[0]-1) === false && leftEdge.includes(shape[1]-1) === false && leftEdge.includes(shape[2]-1) === false && leftEdge.includes(shape[3]-1) === false)&&( alreadyshaped.includes(shape[0]-1) === false && alreadyshaped.includes(shape[1]-1) === false && alreadyshaped.includes(shape[2]-1) === false && alreadyshaped.includes(shape[3]-1) === false))
        {
            //console.log(shape)
            soundMove.play()
            deleteShape()
            drawShape(-1)
        




            //console.log(shape)
        }
    
}

function turnRight()
{
   
    if(( rightEdge.includes(shape[0]+1) === false && rightEdge.includes(shape[1]+1) === false && rightEdge.includes(shape[2]+1) === false && rightEdge.includes(shape[3]+1) === false)&&( alreadyshaped.includes(shape[0]+1) === false && alreadyshaped.includes(shape[1]+1) === false && alreadyshaped.includes(shape[2]+1) === false && alreadyshaped.includes(shape[3]+1) === false))
        {
            soundMove.play()
            //console.log(shape)
            deleteShape()
            drawShape(1)


            //console.log(shape)
        }

    
}


function rotate()
{
    
    if (rotationDegree ===0)
    {
        
        deleteShape()

        
        switch (shape[4]) {
            case "i":
              //shape = [b-12,b,b+12,b+24,"i"]; 
              shape = rotateBanned([b-12,b,b+12,b+24,"i"])
              break;
            case "t":
              //shape = [b-12,b,b-1,b+12,"t"];
              shape = rotateBanned([b-12,b,b-1,b+12,"t"])
              break;
            case "s":
               //shape = [b,b-1,b-1+12,b-1-1+12,"s"];
               shape = rotateBanned([b,b-1,b-1+12,b-1-1+12,"s"])
              break;
            case "l":
              //shape = [b,b-1,b-2,b+12,"l"];
              shape = rotateBanned([b,b-1,b-2,b+12,"l"])
              break;
            case "sq":
              shape = [b,b+1,b+12,b+12+1,"sq"];
              break;

          }
        rotationDegree+=1
        drawShape(0)
 
        
    }

    else if (rotationDegree ===1)
    {

  
        
        deleteShape()

        

        switch (shape[4]) {
            case "i":
              //shape = [b-2,b-1,b,b+1,"i"];  
              shape = rotateBanned([b-2,b-1,b,b+1,"i"])
              break;
            case "t":
              //shape = [b,b-1+12,b+12,b+12+1,"t"];
              shape = rotateBanned([b,b-1+12,b+12,b+12+1,"t"],)
              break;
            case "s":
               //shape = [b,b-12,b-12-1,b-24-1,"s"];
               shape = rotateBanned([b,b-12,b-12-1,b-24-1,"s"])
              break;
            case "l":
              //shape = [b,b-1,b-12,b-24,"l"];  
              shape = rotateBanned([b,b-1,b-12,b-24,"l"])
              console.log(shape + "Problem")
              break

            case "sq":
              shape = [b,b+1,b+12,b+12+1,"sq"];
              break;

          }

        rotationDegree+=1

        drawShape(0)
 
        
    }

    else if(rotationDegree === 2 )
    {
        deleteShape()
        switch (shape[4]) {
            case "i":
              //shape = [b-24,b-12,b,b+12,"i"];
              shape = rotateBanned([b-24,b-12,b,b+12,"i"])
              break;
            case "t":
              //shape = [b-12,b+1,b,b+12,"t"];
              shape = rotateBanned([b-12,b+1,b,b+12,"t"])

              break;
            case "s":
               //shape = [b,b-1,b-1+12,b-2+12,"s"];
               shape = rotateBanned([b,b-1,b-1+12,b-2+12,"s"])
              break;
            case "l":
              //shape = [b,b-12,b+1,b+2,"l"];   77, 76, 65, 53, 'l']
              
              shape = rotateBanned([b,b-12,b+1,b+2,"l"])  
              console.log(shape)

              break
            case "sq":
              shape = [b,b+1,b+12,b+12+1,"sq"];
              break;

          }
         drawShape(0)
        rotationDegree +=1
        //console.log(rotationDegree)

    }

    else
    {
        deleteShape()
        rotationDegree = 0
        switch (shape[4]) {
            case "i":
              //shape = [b-1,b,b+1,b+2,"i"];
              shape = rotateBanned([b-1,b,b+1,b+2,"i"])
              break;
            case "t":
              //shape = [b-1,b,b+1,b+12,"t"]
              shape = rotateBanned([b-1,b,b+1,b+12,"t"])
              break;
            case "s":
               //shape = [b,b+12,b+12+1,b+1+24,"s"];
               shape = rotateBanned([b,b+12,b+12+1,b+1+24,"s"])
               break;
            case "l":
              //shape =  [b,b+1,b+12,b+24,"l"]
              shape = rotateBanned([b,b+1,b+12,b+24,"l"])
              console.log(shape)
              break;
            case "sq":
              shape = [b,b+1,b+12,b+12+1,"sq"]
              break;

          }
        drawShape(0)
    }


}
let count = 1
let mode = document.getElementById("mode")

function setDeficulties()
{
    count+=1
    if(count ===1)
    {
        deficulties = 800
        mode.innerHTML = "Mode: Easy"
        
    }
    else if(count === 2)
    {
        deficulties = 600
        mode.innerHTML = "Mode: normal"
    }
    else if(count === 3)
    {
        deficulties = 400
        mode.innerHTML = "Mode: deficult"
    }
    else if(count === 4)
    {
        deficulties = 200
        mode.innerHTML = "Mode: very deficult"
        count = 0
    }
}


function deletingLine()
{
    /*
    for(let x=0;x<241;x+=12)
    {

        if
        (
            (alreadyshaped.includes(x+1) == true) && (alreadyshaped.includes(x+2) == true) &&
            (alreadyshaped.includes(x+3) == true) && (alreadyshaped.includes(x+4) == true) &&
            (alreadyshaped.includes(x+5) == true) && (alreadyshaped.includes(x+6) == true) &&
            (alreadyshaped.includes(x+7) == true) && (alreadyshaped.includes(x+8) == true )&&
            (alreadyshaped.includes(x+9) == true) && (alreadyshaped.includes(x+9) == true )
        )
        
        {
            console.log("yeahhhoooooooo")
            score+=10
            document.getElementById(String(x+1)).style.background = "black" 
            document.getElementById(String(x+2)).style.background = "black" 
            document.getElementById(String(x+3)).style.background = "black" 
            document.getElementById(String(x+4)).style.background = "black" 
            document.getElementById(String(x+5)).style.background = "black"
            document.getElementById(String(x+6)).style.background = "black" 
            document.getElementById(String(x+7)).style.background = "black" 
            document.getElementById(String(x+8)).style.background = "black" 
            document.getElementById(String(x+9)).style.background = "black" 
            document.getElementById(String(x+10)).style.background = "black" 
            xonsole.log(alreadyshaped)
            for(let j=1;j<11;j++)
            {
                alreadyshaped.splice(alreadyshaped.indexOf(x+j), 1);
            }
            
           console.log(alreadyshaped)
        }


    }
    */
 

    for(let i =0;i<21;i++)
    {
        if
        (
            alreadyshaped.includes(screen[i][1]) == true && alreadyshaped.includes(screen[i][2]) == true &&
            alreadyshaped.includes(screen[i][3]) == true && alreadyshaped.includes(screen[i][4]) == true &&
            alreadyshaped.includes(screen[i][5]) == true && alreadyshaped.includes(screen[i][6]) == true &&
            alreadyshaped.includes(screen[i][7]) == true && alreadyshaped.includes(screen[i][8]) == true &&
            alreadyshaped.includes(screen[i][9]) == true && alreadyshaped.includes(screen[i][10]) == true 
        )
        {
            breakLine.play()
            console.log(alreadyshaped)
            score+=10
            document.getElementById("score").innerHTML = "Score: " + score
            document.getElementById(String(screen[i][1])).style.background = "black" 
            document.getElementById(String(screen[i][2])).style.background = "black" 
            document.getElementById(String(screen[i][3])).style.background = "black" 
            document.getElementById(String(screen[i][4])).style.background = "black" 
            document.getElementById(String(screen[i][5])).style.background = "black"
            document.getElementById(String(screen[i][6])).style.background = "black" 
            document.getElementById(String(screen[i][7])).style.background = "black" 
            document.getElementById(String(screen[i][8])).style.background = "black" 
            document.getElementById(String(screen[i][9])).style.background = "black" 
            document.getElementById(String(screen[i][10])).style.background = "black" 
            for(let j=1;j<11;j++)
            {
                alreadyshaped.splice(alreadyshaped.indexOf(screen[i][j]), 1);
                alreadyColored.splice(alreadyshaped.indexOf(screen[i][j]), 1);
            }
            let newindices=[]
            for(let index =0;index<alreadyshaped.length;index++)
            {
                    if(alreadyshaped[index]<screen[i][1])  //all the shapes above the line (was full)
                    {
                        //console.log(previousColor)
                        console.log(Number(screen[i][index] + 12))
                        let previousColor = document.getElementById(String(alreadyshaped[index])).style.background
                        document.getElementById(String(alreadyshaped[index])).style.background = "black"
                        alreadyshaped[index] +=12
                        document.getElementById(String(alreadyshaped[index] )).style.background = previousColor

                    }
            }

                
            
 
        }
    }
    console.log(alreadyshaped)

    
}
