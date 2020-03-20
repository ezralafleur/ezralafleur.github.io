now=new Date();
let rev = new Tone.Reverb(5).toMaster();
let dist = new Tone.Distortion(0.6).toMaster();
rev.generate();
let mainPoly = new Tone.PolySynth(6, Tone.Synth).connect(rev);
mainPoly.volume.value=-10;
let bassSynth = new Tone.Synth("sine").connect(dist);
let singGran = new Tone.GrainPlayer("Samples/Ah.wav");

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
    document.getElementById("fund").innerText=newfundamental+"hz";
    partials=[];
    // Chord (aka the second tone) updates every minute
    partials.push(now.getUTCMinutes()%6+2);
    partials.push((now.getUTCMilliseconds()%3)+1);
    partials.push((now.getUTCMinutes()%6+2)*((now.getUTCSeconds()%3)+1));
    partials.push(1/((now.getUTCSeconds()%2)+1));
    partials.push(quarterMinute/((now.getUTCMilliseconds()%2)+1));
    p=document.getElementById("partials");
    p.innerText="";
    for (i=0;i<partials.length;i++){
        p.innerText+=" "+partials[i];
    }
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

document.getElementById("startButton").addEventListener("click", ()=>Tone.Transport.start());
document.getElementById("stopButton").addEventListener("click", ()=>Tone.Transport.stop());
Tone.Transport.scheduleRepeat(playChord, "0:0.5:0");
Tone.Transport.scheduleRepeat(playBass, "1:0:0");