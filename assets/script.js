const url = "https://api.apify.com/v2/key-value-stores/TyToNta7jGKkpszMZ/records/LATEST?disableRedirect=true";

async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  const infectedByRegion = data.infectedByRegion;
  const deceasedByRegion = data.deceasedByRegion;

  criaCard(infectedByRegion, deceasedByRegion);
  verificaMapa(infectedByRegion);
  atualizarCard(data);
  criaCardMapa(infectedByRegion, deceasedByRegion);
}

getData();

function atualizarCard({ infected, recovered, deceased }) {
  const h2Card1 = document.querySelector(".h2-card1");
  const h2Card2 = document.querySelector(".h2-card2");
  const h2Card3 = document.querySelector(".h2-card3");

  h2Card1.innerHTML = `Total de Infectados:<br><br>\n${infected}`;
  h2Card2.innerHTML = `Número de Óbitos:<br><br>\n${deceased}`;
  h2Card3.innerHTML = `Pacientes Curados:<br><br>${recovered}`;
}

function verificaMapa(infectedByRegion) {

  infectedByRegion.forEach((region) => {
    if (region.count > 3000000) {
      const mapRegion = document.getElementById(region.state);
      mapRegion.classList.add("mapaRed");
    }
  });
}

function criaCard(infectedByRegion, deceasedByRegion) {
  const dadosEstados = document.querySelector(".dados-estados");

  infectedByRegion.forEach((region) => {

    const deceasedRegion = deceasedByRegion.find((item) => item.state === region.state);


    const divElement = document.createElement("div");
    divElement.classList.add("borda");


    const h3Element = document.createElement("h3");
    h3Element.textContent = `${region.state}:`;


    const pElement = document.createElement("p");

    if (region.count > 3000000) {
      pElement.textContent = `${region.count}`;
      pElement.style.color = "red";
    } else {
      pElement.textContent = `${region.count}`;
    }


    divElement.appendChild(h3Element);
    divElement.appendChild(pElement);


    dadosEstados.appendChild(divElement);
  });
}

function criaCardMapa(infectedByRegion, deceasedByRegion) {
  const estados = document.querySelector(".estados-g");
  const cardMapa = document.querySelector(".card-mapa");

  estados.addEventListener("click", (e) => {
    const classEstado = e.target.classList[0];
    const estadoEscolhido = infectedByRegion.find((item) => item.state === classEstado);
    const nomeCompletoEstado = estadosBrazil[estadoEscolhido.state];


    const deceasedRegion = deceasedByRegion.find((item) => item.state === estadoEscolhido.state);


    if (!cardMapa.classList.contains("card")) {
      cardMapa.classList.add("card");
      cardMapa.style.display = "flex";
    }


    if (estadoEscolhido.count > 3000000) {

      cardMapa.innerHTML = `
        <p id="xEsc">Sair</p>
        <h2>${nomeCompletoEstado}</h2>
        <p>Óbitos: ${deceasedRegion.count}</p>
        <p>Infectados: ${estadoEscolhido.count}</p>
        <textarea></textarea>
        <button class="coment">Enviar comentário</button>`
        ;
      closeInfoMap();
    } else {
      // cria card normal
      cardMapa.innerHTML = `
        <p id="xEsc">Sair</p>
        <h2>${nomeCompletoEstado}</h2>
        <p>Óbitos: ${deceasedRegion.count}</p>
        <p>Infectados: ${estadoEscolhido.count}</p>`;
      closeInfoMap();
    }
  });
}

function closeInfoMap() {
  const xEsc = document.getElementById("xEsc");
  const cardMapa = document.querySelector(".card-mapa");
  xEsc.addEventListener("click", (e) => {
    console.log(e.target);
    cardMapa.classList.remove("card");
    cardMapa.style.display = "none";
  });
}

const estadosBrazil = {
  AC: "Acre",
  AL: "Alagoas",
  AP: "Amapá",
  AM: "Amazonas",
  BA: "Bahia",
  CE: "Ceará",
  DF: "Distrito Federal",
  ES: "Espírito Santo",
  GO: "Goiás",
  MA: "Maranhão",
  MT: "Mato Grosso",
  MS: "Mato Grosso Do Sul",
  MG: "Minas Gerais",
  PA: "Pará",
  PB: "Paraíba",
  PR: "Paraná",
  PE: "Pernambuco",
  PI: "Piauí",
  RJ: "Rio De Janeiro",
  RN: "Rio Grande DoNorte",
  RS: "Rio Grande Do Sul",
  RO: "Rondônia",
  RR: "Roraima",
  SC: "Santa Catarina",
  SP: "São Paulo",
  SE: "Sergipe",
  TO: "Tocantins",
};