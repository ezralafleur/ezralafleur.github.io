now=new Date();
let rev = new Tone.Reverb(5).toMaster();
let wide = new Tone.StereoWidener(1).toMaster();
let dist = new Tone.Distortion(0.6).toMaster();
var pingPong = new Tone.PingPongDelay("8n", 0.4).toMaster();
rev.generate();
rev.wet.value=0.85;
let mainPoly = new Tone.PolySynth(6, Tone.Synth).connect(rev);
mainPoly.volume.value=-12;
let bassSynth = new Tone.Synth("sine").connect(dist);
let melSynth = new Tone.Synth("triangle").connect(pingPong);
let melSynth2 = new Tone.Synth("triangle").connect(pingPong);
melSynth.volume.value=-10;
melSynth.portamento=0.1;
melSynth2.volume.value=-10;
melSynth2.portamento=0.1;

bassSynth.volume.value=-10;

// TUNING SECTION

// Fundamental frequency is date divided by four
let fundamental=150+now.getUTCDate()*2;
let newfundamental=fundamental;


// TIMING SECTION
let pulse = ((now.getUTCHours()+1)*4)+60;
Tone.Transport.bpm.value=pulse;
Tone.Transport.timeSignature=(now.getUTCMonth()+1)/2;

function playChord(){
    now=new Date();
    thirdMinute=(Math.floor(now.getUTCSeconds()/20))+1;
    quarterMinute=(Math.floor(now.getUTCSeconds()/15))+1;
    newfundamental=((quarterMinute+1)*fundamental)/(quarterMinute);
    minuteTone=((now.getUTCMinutes()%6+2)*newfundamental)/(now.getUTCMinutes()%6+1);
    mainPoly.triggerAttackRelease([newfundamental, minuteTone,
                newfundamental*((now.getUTCMilliseconds()%3)+1), minuteTone*((now.getUTCSeconds()%3)+1),
                newfundamental/((now.getUTCSeconds()%2)+1), quarterMinute*newfundamental/((now.getUTCMilliseconds()%2)+1)],
                (60/pulse)-0.1);
}
function playBass(){
    now=new Date();
    bassSynth.triggerAttackRelease(newfundamental/8, (60/pulse)-0.1);
}

function playMel(){
    melSynth.triggerAttackRelease(((minuteTone)*((now.getUTCSeconds()%4)+2))/((now.getUTCSeconds()%4)+1), "4:0:0");
    melSynth2.triggerAttackRelease(((minuteTone)*((now.getUTCMilliseconds()%4)+2))/((now.getUTCMilliseconds()%4)+1), "4:0:0");
}

document.getElementById("startButton").addEventListener("click", ()=>Tone.Transport.start());
document.getElementById("stopButton").addEventListener("click", ()=>Tone.Transport.stop());
Tone.Transport.scheduleRepeat(playChord, "0:0.5:0");
Tone.Transport.scheduleRepeat(playBass, "1:0:0");
Tone.Transport.scheduleRepeat(playMel, "4:0:0");