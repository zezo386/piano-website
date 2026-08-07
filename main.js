Tone.start();
const synth = new Tone.PolySynth(Tone.Synth).toDestination();

let pressedKeys = new Set()
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
    synth.triggerAttack(`${Note}4`);
    console.log(pressedKeys)
}

function finishNote(Note){
    synth.triggerRelease(`${Note}4`,"+0.25");
    
}

document.onkeydown = function (e){
    let key = e.key;
    if ("sedrfgyhujik".includes(key.toLowerCase()) && !pressedKeys.has(key)){
        let note = codeToKey[key];
        pressedKeys.add(key);
        playNote(note);
        document.getElementById(note).style.backgroundColor = `rgb(237, 18, 91)`;
    }
}

document.onkeyup = function (e){
    let key = e.key;
    if ("sedrfgyhujik".includes(key.toLowerCase()) && pressedKeys.has(key)){
        let note = codeToKey[key];
        pressedKeys.delete(key);
        finishNote(note);
        console.log("finished")
        document.getElementById(note).style.backgroundColor = note.includes("#") ? `black` : `white`;
    }
}