let outputWidth;
let outputHeight;

let faceTracker; // Face Tracking
let videoInput

let imgDetectionSquare; // detection Mask Filter
let imgDogEarRight, imgDogEarLeft, imgDogNose; // Dog Face Filter

let selected = -1; // Default no filter

let cnv;
let videocamara;
var CameraIsPlay = true;
/*
 * **p5.js** library automatically executes the `preload()` function. Basically, it is used to load external files. In our case, we'll use it to load the images for our filters and assign them to separate variables for later use.
 */
function preload() {
    // DetectionSquare Mask Filter asset
    imgDetectionSquare = loadImage("https://i.ibb.co/nQcTyRL/Detection-Square.png");
    // Dog Face Filter assets
    imgDogEarRight = loadImage("https://i.ibb.co/bFJf33z/dog-ear-right.png");
    imgDogEarLeft = loadImage("https://i.ibb.co/dggwZ1q/dog-ear-left.png");
    imgDogNose = loadImage("https://i.ibb.co/PWYGkw1/dog-nose.png");

}

/**
 * In p5.js, `setup()` function is executed at the beginning of our program, but after the `preload()` function.
 */
function setup() {
    const maxWidth = Math.min(windowWidth, windowHeight);
    pixelDensity(1);
    outputWidth = maxWidth;
    outputHeight = maxWidth * 0.75; // 4:3

    cnv = createCanvas(outputWidth, outputHeight);
    cnv.parent('miCamara');

    // webcam capture
    videoInput = createCapture(VIDEO); //document.getElementById('miCamara');
    videoInput.parent('miCamara');
    videoInput.size(outputWidth, outputHeight);
    videocamara = videoInput;
    videoInput.hide();

    // select filter
    const sel = select('#filtrosDisponibles');
    const selectList = ['Detection Square', 'Dog Filter']; // list of filters
    sel.option('Select Filter', -1); // Default no filter
    for (let i = 0; i < selectList.length; i++) {
        sel.option(selectList[i], i);
    }
    sel.changed(applyFilter);

    // tracker
    faceTracker = new clm.tracker();
    faceTracker.init();
    faceTracker.start(videoInput.elt);
}

// callback function
function applyFilter() {
    selected = this.selected(); // change filter type
}

/*
 * In p5.js, draw() function is executed after setup(). This function runs inside a loop until the program is stopped.
 */
function draw() {

    image(videoInput, 0, 0, outputWidth, outputHeight); // render video from webcam

    // apply filter based on choice
    switch (selected) {
        case '-1':
            break;
        case '0':
            drawDetectionSquare();
            break;
        case '1':
            drawDogFace();
            break;
        case '2':
            drawFilterInstagram(2);
            break;
        case '3':
            drawFilterInstagram(3);
            break;
        case '4':
            drawFilterInstagram(4);
            break;
        case '5':
            drawFilterInstagram(5);
            break;
        case '6':
            drawFilterInstagram(6);
            break;
        case '7':
            drawFilterInstagram(7);
            break;
        case '8':
            drawFilterInstagram(8);
            break;
        case '9':
            drawFilterInstagram(9);
            break;
    }
}

function previewFile() {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}

// Detection Square Mask Filter
function drawDetectionSquare() {
    const positions = faceTracker.getCurrentPosition();
    if (positions !== false) {
        push();
        const wx = Math.abs(positions[13][0] - positions[1][0]) * 1.2; // The width is given by the face width, based on the geometry
        const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) * 1.2; // The height is given by the distance from nose to chin, times 2
        translate(-wx / 2, -wy / 2);
        image(imgDetectionSquare, positions[62][0], positions[62][1], wx, wy); // Show the mask at the center of the face
        pop();
    }
}

// Dog Face Filter
function drawDogFace() {
    const positions = faceTracker.getCurrentPosition();
    if (positions !== false) {
        if (positions.length >= 20) {
            push();
            translate(-100, -150); // offset adjustment
            image(imgDogEarRight, positions[20][0], positions[20][1]);
            pop();
        }

        if (positions.length >= 16) {
            push();
            translate(-20, -150); // offset adjustment
            image(imgDogEarLeft, positions[16][0], positions[16][1]);
            pop();
        }

        if (positions.length >= 62) {
            push();
            translate(-57, -20); // offset adjustment
            image(imgDogNose, positions[62][0], positions[62][1]);
            pop();
        }
    }
}

function drawFilterInstagram(numero) {
    //Lo programe como filter(filterType, [filterParam])
    if (numero == 2) {
        filter(GRAY);
    }
    if (numero == 3) {
        filter(THRESHOLD);
    }
    if (numero == 4) {
        filter(OPAQUE);
    }
    if (numero == 5) {
        filter(POSTERIZE, 3);
    }
    if (numero == 6) {
        filter(DILATE);
    }
    if (numero == 7) {
        filter(BLUR, 3);
    }
    if (numero == 8) {
        filter(ERODE);
    }
    if (numero == 9) {
        filter(INVERT);
    }
    if (numero == 10) {

    }
    if (numero == 11) {
        //filter(INVERT);
    }
}

function windowResized() {
    const maxWidth = Math.min(windowWidth, windowHeight);
    pixelDensity(1);
    outputWidth = maxWidth;
    outputHeight = maxWidth * 0.75; // 4:3
    resizeCanvas(outputWidth, outputHeight);
}

function pauseCamera() {
    if (CameraIsPlay == true) { CameraIsPlay = false; } else { CameraIsPlay = true; }
    console.log(CameraIsPlay);
    if (CameraIsPlay == true) {
        videocamara.play();
        document.getElementById('btn_Camera').innerText = "Camera:ON";
        bandera = true;
    } else {
        document.getElementById('btn_Camera').innerText = "Camera:OFF";
        videocamara.pause();
        bandera = false;
    }
}

function uploadPhoto() {
    location.href = "photo.html";
}



function saveImages() {
    saveCanvas(cnv);
}