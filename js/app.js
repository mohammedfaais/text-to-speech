const main = document.querySelector('main');
const voiceSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const btn = document.getElementById('read');
const pitch = document.querySelector('#pitch');


const data = [
{
	image : 'img/Pikachu(1).png',
	text : 'Pikachu'
},
{
	image : 'img/Minion(1).jpg',
	text : 'Minion'
},
{
	image : 'img/PowerpuffGirls(1).jpg',
	text : 'Power Puff Girls'
},
{
	image : 'img/TomandJerry(1).jpg',
	text : 'Tom And Jerry'
}
];

data.forEach(createBox);
function createBox(item){
    const box = document.createElement('div');
	const { image,text } = item;
	box.classList.add('box');
	box.innerHTML= `
    <img src="${image}" alt="${text}"/>
    <p class="info"> ${text}</p>
	`
    box.addEventListener('click',()=>{
    	setMessage(text);
    	setPitch();
	    setSpeek();

	    box.classList.add('active')
	    setTimeout(()=>box.classList.remove('active'),800)
    })

    main.appendChild(box);

}

const message = new SpeechSynthesisUtterance();

let voices = [];

function getVoices(){
	voices = speechSynthesis.getVoices();
	voices.forEach(voice =>{
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText =`${voice.name} ${voice.lang}`;
    voiceSelect.appendChild(option);
});
}



function setMessage(text){
	message.text=text;
}

function setSpeek(){
	speechSynthesis.speak(message);
}

function setVoice(e){
	message.voice = voices.find(voice => voice.name === e.target.value);
}

function setPitch(){
	message.pitch = pitch.value;
}

speechSynthesis.addEventListener('voiceschanged',getVoices);
btn.addEventListener('click', ()=>{
	setMessage(textArea.value);
	setPitch();
	setSpeek();

});
voiceSelect.addEventListener('change', setVoice);

getVoices();



