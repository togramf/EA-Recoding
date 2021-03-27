//RECODING V1
//08/03/2021

// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    y: 1,
    x: 1,
    h: 0,
    w: 0,
    n: 1,
    m: 1,
    scale : 0,
    Download_Image: () => save(),
}
gui.add(params, "y", 0, 20, 0.1)
gui.add(params, "x", 0, 20, 0.1)
gui.add(params, "h", 0, 1, 0.01)
gui.add(params, "w", 0, 1, 0.01)
gui.add(params, "n", 1, 20, 0.1)
gui.add(params, "m", 1, 20, 0.1)
gui.add(params, "scale", 0, 500, 0.1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function draw() {
    background(0)
    translate(width/2, height/2)
    strokeWeight(3)
    stroke(240)
    noFill()

    /*beginShape()
    let w = 1;
    let h = 0.5;
    for (let a = 0; a < TWO_PI; a += 0.01) {
        const y = sin(w* a)
        const x = cos(h* a) * tan(params.y)
        vertex(x * height * 0.3, y * height * 0.3)
    }
    endShape(CLOSE)*/

    /*beginShape()
    for (let a = 0; a < TWO_PI; a+= 0.0001){
        const x = cos(params.n*a) 
        const y = sin(params.m*a)
        vertex (x * height *0.3, y* height * 0.3 * exp(-abs(x)))
        
    }
    endShape(CLOSE)*/

    //Version ok 27.03
    // beginShape()
    // for (let a=0; a<TWO_PI; a+= 0.001){
    //     const x = cos (a * params.x) 
    //     const y = a * params.y - params.n * sin(a * params.m)
    //     vertex (x * exp(-abs(y)) * params.w * params.scale, y * exp(-abs(x))* params.h * params.scale)
    // }
    // endShape()

    // beginShape()
    // for (let a = 0; a<PI/4; a+= 0.001){
    //     const x = cos(a)
    //     const y = sin (a - PI/6) * sin (a - PI/6) 
    //     vertex (x * height * 0.3, y * height * 0.3)
    // }
    // endShape()

    beginShape()
    for (let a=0; a<TWO_PI; a+= 0.0001){
        const x =  - cos (a * params.x) 
        const y =  - params.n * sin(a * params.m) * sin(a * params.m)
        vertex (x * exp(-abs(y)) * params.w * params.scale, y * exp(-abs(x))* params.h * params.scale)
    }
    endShape()
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}