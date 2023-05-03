gsap.to("#turb-freq", {duration: 18, attr:{baseFrequency: 0.006}, repeat: -1, yoyo: true, ease: "sine.inOut"});
gsap.to(".stripe", {duration: 70, backgroundPosition: "2866px 0px", repeat: -1, ease: "none"});

const urlParams = new URLSearchParams(window.location.search);
const playerName = urlParams.get('name');
const socials = [
    { "name": "twitter", "value": urlParams.get('twitter') },
    { "name": "instagram", "value": urlParams.get('instagram') },
    { "name": "twitch", "value": urlParams.get('twitch') }
]

const nameElem = document.querySelector(".player-name");
nameElem.innerText = playerName;

for (let i = 0; i < socials.length; i++){
    if (socials[i].value != null){
        document.querySelector(".socials-container").innerHTML += getSocialWrapper(socials[i].name, socials[i].value);
    }
}

window.onload =  function() {
    const stripes = document.querySelectorAll(".stripe");
    fitStripe(stripes[0], true);
    fitStripe(stripes[1], false);
}

function getSocialWrapper(icon, name){
    return`
    <div class="social-wrapper">
        <img src="../assets/${icon}.svg">
        <div class="social-text">${name}</div>
    </div>
    `
}

function fitStripe(elem, isLeft){
    const rect = nameElem.getBoundingClientRect();
    const height = nameElem.parentElement.clientHeight;
    const fixedHeight = Math.ceil(height / 29) * 29;
    console.log(fixedHeight);
    const clientWidth = rect.width;
    const padding = 36;
    elem.style.height = `${fixedHeight}px`;
    elem.style.left = isLeft ? `${rect.left + clientWidth + padding}px` : `${rect.left - 1920 - padding}px`;
    elem.style.top = `${rect.top- ((fixedHeight - height) / 2)}px`;
}