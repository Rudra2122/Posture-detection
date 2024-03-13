let capture;
let posenet;
let nosex,nosey;
let reyex,reyey;
let leyex,leyey;
let singlePose,skeleton;
function setup()
{
    createCanvas(800,500);
    capture=createCapture(VIDEO)
    capture.hide();

    posenet=ml5.poseNet(capture,modelLoaded);
    posenet.on('pose',receivedPoses)
}
function receivedPoses(poses) {
    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
  
    }
}

function modelLoaded()
    {
        console.log('model has loaded');
    }

function draw() 
    {
        image(capture, 0, 0, 800, 600);
        fill(255, 0, 0);


        if(singlePose){
            for(let i=0; i<singlePose.keypoints.length; i++){
                let scaledX = map(singlePose.keypoints[i].position.x, 0, capture.width, 0, width);
                let scaledY = map(singlePose.keypoints[i].position.y, 0, capture.height, 0, height);
                scaledX+=3;
                scaledY+=15;
                ellipse(scaledX, scaledY, 20);
            }
            stroke(255,255,255);
            for(let j=0; j<skeleton.length; j++){
                let scaledX = map(skeleton[j][0].position.x, 0, capture.width, 0, width);
                let scaledY = map(skeleton[j][0].position.y, 0, capture.height, 0, height);
                let scaleX = map(skeleton[j][1].position.x, 0, capture.width, 0, width);
                let scaleY = map(skeleton[j][1].position.y, 0, capture.height, 0, height);
                scaledX+=3;
                scaledY+=15;
                scaleX+=3;
                scaleY+=15;
                line(scaledX, scaledY, scaleX, scaleY);
        }
    }
    

}