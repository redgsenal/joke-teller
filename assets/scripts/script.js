const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

audioElement.addEventListener('play', () => {
    console.log('audio playing');
    buttonToggle(true);
});

audioElement.addEventListener('pause', () => {
    console.log('audio paused');
    buttonToggle(false);
});

audioElement.addEventListener('stop', () => {
    console.log('audio stopped');
    buttonToggle(false);
});

audioElement.addEventListener('ended', () => {
    console.log('audio ended');
    buttonToggle(false);
});

const buttonToggle = (toggle) => {
    button.disabled = toggle;
}

const tellAJoke = async () => {
    const jokeText = await fetchAJoke();
    VoiceRSS.speech({
        key: 'cf0c9274c5f04fba805ea696c439ca19',
        src: jokeText,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


const fetchAJoke = async () => {
    // fetch a joke from API
    try {
        const resp = await fetch('https://v2.jokeapi.dev/joke/Programming,Pun');
        const result = await resp.json();
        console.log(result);
        if (result.error) {
            return 'Ooops';
        }
        return (result.type === 'twopart') ? `${result.setup} ... ${result.delivery}` : result.joke
    } catch (err) {
        // heres the error
        console.log(err)
    }
}

button.addEventListener('click', tellAJoke);
button.disabled = false;
