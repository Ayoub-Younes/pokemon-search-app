

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const name_p = document.getElementById("pokemon-name");
const id_p = document.getElementById("pokemon-id");
const image_p = document.getElementById("image")
const pokHd = document.getElementById("pok-hd")
const pokHdUrl = document.getElementById("pok-hd-url")
const weight_p = document.getElementById("weight");
const height_p = document.getElementById("height");
const types_p = document.getElementById("types");
const hp_p = document.getElementById("hp");
const attack_p = document.getElementById("attack");
const defense_p = document.getElementById("defense");
const specialAttack_p = document.getElementById("special-attack");
const specialDefense_p = document.getElementById("special-defense");
const speed_p = document.getElementById("speed");
const bp = document.getElementById("bp");
const bar = document.querySelectorAll(".bar");

let pokemonData = {};
let allPoksData = [];
let link = "";

//fetchs
fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
  .then((res) => res.json())
  .then((data) => {
    allPoksData = data.results;
  })
  .catch((err) => {
    console.error(`There was an error: ${err}`);
  });
  const fetchPokII = () => {
    displayPokData(pokemonData);
  }

  //FUNCTIONS
  const fetchPokI = () => {

    pokHd.src = ''
    //Check if Pok available//
    let input = searchInput.value.toLowerCase()
    const pokemon = allPoksData.find(pok => (pok.id == searchInput.value || pok.name == input));
    if(!pokemon){
      alert("Pokémon not found");
      return;
    }
    console.log("POK",pokemon)

    //fetch//
    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon.name}`)
    .then((res) => res.json())
    .then((data) => {
    pokemonData = data;
    displayPokData(pokemonData)
    })
    .catch((err) => {
        console.error(`There was an error: ${err}`);
    });
    
    }
  //display function//
  const displayPokData = (data) => {
    //constants//
    const {name, id, weight, height,sprites: {front_default},} = data;
    let pokDetails = {name, id, weight, height};
    const types = data.types.map(obj => obj.type.name);
  
    let statsI = ["hp", "attack", "defense", "special_attack", "special_defense", "speed"];
  for (let i = 0 ; i < data.stats.length ; i++ ){
    pokDetails[statsI[i]] = Object.values(data.stats[i])[0];
    pokDetails.types = types;
    pokDetails.image = front_default;
  }
  const total = pokDetails.hp + pokDetails.attack + pokDetails.defense + pokDetails.special_attack + pokDetails.special_defense + pokDetails.speed;
  
  //HTML display//
      name_p.innerHTML = `${Object.values(pokDetails)[0].toUpperCase()}`;
      id_p.innerHTML = `#${Object.values(pokDetails)[1]}`;
      weight_p.innerHTML = `${Object.values(pokDetails)[2]/10} <span>kg</span>`;
      height_p.innerHTML = `${Object.values(pokDetails)[3]/10} <span>m</span>` ;
      hp_p.innerHTML = `${Object.values(pokDetails)[4]}`;
      types_p.innerHTML = ""
      Object.values(pokDetails)[5].forEach((type,index) => types_p.innerHTML +=`<span class=type${index}>${type.toUpperCase()}</span>`)
      attack_p.innerHTML = `${Object.values(pokDetails)[7]}`;
      defense_p.innerHTML = `${Object.values(pokDetails)[8]}`;
      specialAttack_p.innerHTML = `${Object.values(pokDetails)[9]}`;
      specialDefense_p.innerHTML = `${Object.values(pokDetails)[10]}`;
      speed_p.innerHTML = `${Object.values(pokDetails)[11]}`;
      bp.innerHTML = `${total}`;
      const fallbackSrc = `imgs/Pokemons_Images/${pokDetails.name}.png`;
      const primarySrc = `https://raw.githubusercontent.com/Ayoub-Younes/build-a-pokemon-search-app/master/imgs/Pokemons_Images/${pokDetails.name}.png`;
      const iconSrc = `<img id="sprite" src="${Object.values(pokDetails)[6]}">`;
      // Function to load the image using a Promise
      function loadImage(src) {
          return new Promise((resolve, reject) => {
              pokHd.onload = () => {
                  pokHd.style.visibility = 'visible';
                  resolve(src);
              };
              pokHd.onerror = () => reject(new Error('Image failed to   load'));
              pokHd.src = src;
              image_p.innerHTML = iconSrc
          });
      }
      loadImage(primarySrc)
      .catch(() => {
          console.log("Primary image failed, loading fallback...");
          return loadImage(fallbackSrc);
      })
      let {hp, attack, defense, special_attack, special_defense, speed} = pokDetails;
      let stats = [hp, attack, defense, special_attack, special_defense, speed] 
      for (let i = 0; i < stats.length; i++){
        bar[i].style.width = `${(parseInt(stats[i])/255)*100}%`
      }
  }
  searchButton.addEventListener("click",fetchPokI)
  searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") { fetchPokI() }
  })
 



  document.addEventListener('DOMContentLoaded', function() {
    const img = document.getElementById('background-img');
    const mainContent = document.body;

    let imageLoaded = false;

    function showContent() {
      mainContent.style.display = 'block';
    }

    if (img.complete) {
      imageLoaded = true;
      showContent();
    } else {

      img.onload = function() {
        imageLoaded = true;
        showContent();
      };
    }

    // Fallback in case the image takes too long or fails to load
    setTimeout(function() {
      if (!imageLoaded) {
        showContent();
      }
    }, 3000);
  });


    const info = document.getElementById("info");
    const wrapper = document.querySelector(".wrapper")

function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}


function scaleToFit() {
  const baseWidth = 990;
  const baseHeight = 640;

  const width = isMobile() ? screen.width : window.innerWidth;
  const height = isMobile() ? screen.height : window.innerHeight;

  const scaleX = width / baseWidth;
  const scaleY = height / baseHeight;
  const scale = Math.min(scaleX, scaleY);

  wrapper.style.transform = `scale(${scale})`;

}
    if (isMobile()) {
    wrapper.style.transformOrigin = 'top left';
} else {
  wrapper.style.transformOrigin = 'top center';
}

  window.addEventListener('load', scaleToFit);
  window.addEventListener('resize', scaleToFit);
window.addEventListener("orientationchange", scaleToFit);

    info.innerText = `
      screen.width = ${screen.width}px
      screen.height = ${screen.height}px
      window.innerWidth = ${window.innerWidth}px
      window.innerHeight = ${window.innerHeight}px
    `;