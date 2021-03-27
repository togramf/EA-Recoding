//RECODING V1
//08/03/2021

// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    y: 2,
    x: 5,
    h: 0.5,
    w: 0.5,
    n: 0.5,
    m: 1,
    scale : 400,
    Download_Image: () => save(),
}
gui.add(params, "y", 0, 20, 0.01)
gui.add(params, "x", 0, 20, 0.1)
gui.add(params, "h", 0, 1, 0.01)
gui.add(params, "w", 0, 1, 0.01)
gui.add(params, "n", 0, 20, 0.01)
gui.add(params, "m", 1, 20, 0.1)
gui.add(params, "scale", 0, 500, 0.1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function draw() {
    background(240)
    translate(width/2, height/2)
    strokeWeight(3)
    stroke(0)
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

    //essai ok 2
    // beginShape()
    // for (let a=0; a<TWO_PI; a+= 0.0001){
    //     const x =  - cos (a * params.x) 
    //     const y =  - params.n * sin(a * params.m) * sin(a * params.m)
    //     vertex (x * exp(-abs(y)) * params.w * params.scale, y * exp(-abs(x))* params.h * params.scale)
    // }
    // endShape()

    // beginShape()
    // for (let a=0; a<TWO_PI; a+= 0.01){
    //     const y = sin(a * params.y)
    //     const x = cos (a * params.x)  * tan(y * params.n)
    //     vertex (x * exp(-abs(y)) * params.w * params.scale, y * exp(-abs(x)) * params.h * params.scale)
    // }
    // endShape()

    motif(1,-1);
    stroke(255, 102, 0)
    motif(-1,-1);
    stroke(102, 255,0)
    motif(1,1);
    stroke(0)
    motif(-1,1);
        
}   

function motif( a,  b){
    let w = params.w;
    let h = params.h; 
    push()
    for (let i = 0.2; i <1.2 ; i+=0.2){
        beginShape()
            curveVertex(a* 0 * w * params.scale,b* 3 * h  * params.scale)
            curveVertex(a* 1 * w  * params.scale,b*1.5* h  * params.scale)
            curveVertex(a* 0 * w  * params.scale,b*.5* h  * params.scale)
            curveVertex(a* 0.1 * w  * params.scale,b*.1* h  * params.scale)
            curveVertex(a* 3 * w  * params.scale,b*0* h  * params.scale)
            curveVertex(a* 6 * w  * params.scale,b*1.5* h  * params.scale)
        endShape(CLOSE)
        translate(0, b*(3 * h/2 * params.scale));
        w=w/exp(i);
        h=h *exp(i); 
    }
    pop()
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