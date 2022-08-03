leftwrist_x = 0
leftwrist_y = 0
rightwrist_x = 0
rightwrist_y = 0
score_left = 0
score_right = 0
song1_status = ""
song2_status = "" 
song = ""


function setup(){
    canvas = createCanvas(500,400)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    posenet = ml5.poseNet(video, modelLoaded)
    posenet.on("pose", gotPoses)
}

function modelLoaded(){
    console.log(" Model has loaded.")
}

function gotPoses(results){
 if (results.length > 0) {
     console.log(results)
     leftwrist_x = results[0].pose.leftWrist.x
     leftwrist_y = results[0].pose.leftWrist.y
     rightwrist_x = results[0].pose.rightWrist.x
     rightwrist_y = results[0].pose.rightWrist.y
     
     score_left = results[0].pose.keypoints[9].score
     score_right = results[0].pose.keypoints[10].score
    }
}

song1 = ""
song2 = ""

function preload(){
    song1 = loadSound("unstoppable.mp3")
    song2 = loadSound("believer.mp3")
}

function draw(){
    image(video, 0, 0,500, 400)

    song1_status = song1.isPlaying()
    song2_status = song2.isPlaying()

    fill("#34ebd2")
    stroke("#34ebd2")

    if (score_left > 0.2) {
        circle(leftwrist_x,leftwrist_y,20)
        song2.stop()

        if (song1_status==false) {
            song1.play()
            song = song1
            document.getElementById('songPlaying').innerHTML = "Playing Unstoppale - Sia"
        }
    }

    if (score_right > 0.2) {
        circle(rightwrist_x,rightwrist_y,20)
        song1.stop()

        if (song2_status==false) {
            song2.play()
            song = song2
            document.getElementById('songPlaying').innerHTML = "Playing Believer - Imagine Dragons"
        }
    }
}

function play(){
    song.play()
    song.rate(1)
    song.setVolume(1)
}