const tl = gsap.timeline({repeat: -1});
const urlParams = new URLSearchParams(window.location.search);
const playerName = urlParams.get('name');
const socials = [
    { "name": "twitter", "value": urlParams.get('twitter') },
    { "name": "instagram", "value": urlParams.get('instagram') },
    { "name": "twitch", "value": urlParams.get('twitch') }
]

for (let i = 0; i < socials.length; i++){
    if (socials[i].value != null){
        document.querySelector(".overlay-wrapper > .info-wrapper").innerHTML += getSocialPhase(socials[i].name, socials[i].value);
    }
}

const playerNameElem = document.querySelector(".player-name");
playerNameElem.innerText = playerName;
const playerNameScale = Math.min(
    (document.querySelector(".info-wrapper").clientHeight / playerNameElem.clientHeight) * .8,
    (document.querySelector(".info-wrapper").clientWidth / playerNameElem.clientWidth) * .7
)
playerNameElem.style.transform = `scale(${playerNameScale})`;

const numPhasesToShow = Math.floor(document.body.clientHeight / 48);

const phases = document.querySelectorAll(".phase");
for (let i = 0; i < phases.length; i++){
    phases[i].style.opacity = 0;
    phases[i].style.display = "none";
}

for (let i = 0; i < phases.length; i++){
    let phasesToChange = [];
    if (i != 0){
        for (let j = 0; j < numPhasesToShow; j++){
            phasesToChange.push(phases[i+j]);
        }
    } else {
        phasesToChange = [phases[i]];
    }
    if (phasesToChange.length != phases.length){
        tl.fromTo(phasesToChange, {x: 45}, {x: 0, opacity: 1, duration: .5, display: "block", ease: "power4.out"})
            .to(phasesToChange, {x: -30, opacity: 0, duration: .5, display: "none", ease: "power3.in"}, i==0 ? "+=8" : `+=${phasesToChange.length*3}`);
        if (i != 0){
            i += numPhasesToShow-1;
        }
    } else {
        gsap.set(phasesToChange, {opacity: 1, display: "block"});
    }
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