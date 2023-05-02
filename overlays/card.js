const tl = gsap.timeline({repeat: -1});
const urlParams = new URLSearchParams(window.location.search);
const playerName = urlParams.get('name');
const socials = [
    { "name": "twitter", "value": urlParams.get('twitter') },
    { "name": "instagram", "value": urlParams.get('instagram') },
    { "name": "twitch", "value": urlParams.get('twitch') }
]
console.log(socials);

//for each social, if it exists, add it to the overlay

for (let i = 0; i < socials.length; i++){
    if (socials[i].value != null){
        document.querySelector(".overlay-wrapper > .info-wrapper").innerHTML += getSocialPhase(socials[i].name, socials[i].value);
    }
}

document.querySelector(".player-name").innerText = playerName;

const numPhasesToShow = Math.floor(document.body.clientHeight / 48);

const phases = document.querySelectorAll(".phase");
for (let i = 0; i < phases.length; i++){
    phases[i].style.display = "none";
    phases[i].style.opacity = 0;
}

for (let i = 0; i < phases.length; i += numPhasesToShow){
    let phasesToChange = [];
    for (let j = 0; j < numPhasesToShow; j++){
        phasesToChange.push(phases[i+j]);
    }
    if (phasesToChange.length != phases.length){
        tl.to(phasesToChange, {opacity: 1, duration: .5, display: "block"})
            .to(phasesToChange, {opacity: 0, duration: .5, display: "none"}, i==0 ? "+=8" : "+=5");
    } else {
        gsap.set(phasesToChange, {opacity: 1, display: "block"});
    }
    console.log(phasesToChange);
}

function getSocialPhase(icon, text){
    return `
    <div class="phase">
        <div class="socials">
            <img src="../assets/${icon}.svg" class="social-icon">
            <div class="social-text">${text}</div>
        </div>
    </div>
    `;
}