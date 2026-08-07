Tone.start();
const synth = new Tone.PolySynth(Tone.Synth).toDestination();

let pressedKeys = new Set()
let Octave = 4;
const codeToKey = {
    "s":"C",
    "e":"C#",
    "d":"D",
    "r":"D#",
    "f":"E",
    "g":"F",
    "y":"F#",
    "h":"G",
    "u":"G#",
    "j":"A",
    "i":"A#",
    "k":"B"
}

function playNote(Note){
    synth.triggerAttack(`${Note}${Octave}`);
    console.log(pressedKeys)
}

function finishNote(Note){
    synth.triggerRelease(`${Note}${Octave}`,"+0.25");
    
}

document.onkeydown = function (e){
    e.preventDefault();
    let key = e.key;
    console.log(key);
    if ("sedrfgyhujik".includes(key.toLowerCase()) && !pressedKeys.has(key)){
        let note = codeToKey[key];
        pressedKeys.add(key);
        playNote(note);
        document.getElementById(note).style.backgroundColor = `rgb(237, 18, 91)`;
    }
    if (key == "ArrowUp" && Octave + 2 <= 10 ){
        Octave += 2;
    }
    if (key == "ArrowDown" && Octave - 2 >= 1){
        Octave -= 2;
    }
    if (key == "ArrowRight" && Octave + 2 <= 10){
        Octave += 1;
    }
    if (key == "ArrowLeft" && Octave - 1 >= 1){
        Octave -= 1;
    }
    document.getElementById("Octave").innerText = Octave;
}

document.onkeyup = function (e){
    e.preventDefault();
    let key = e.key;
    if ("sedrfgyhujik".includes(key.toLowerCase()) && pressedKeys.has(key)){
        let note = codeToKey[key];
        pressedKeys.delete(key);
        finishNote(note);
        console.log("finished")
        document.getElementById(note).style.backgroundColor = note.includes("#") ? `black` : `white`;
    }
}

document.getElementById("waveFormSelect").addEventListener("change",(e) => {
    e.preventDefault();
    synth.set({oscillator:{type: e.target.value}});
})