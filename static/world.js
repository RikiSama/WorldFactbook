document.getElementById('newCountry').onclick = async () => {
    document.getElementById('countryDetails').innerHTML='';

    let divName = document.createElement('div');
    divName.innerHTML = `<label>Country Name: <input id=CountryName></label>`;

    let divCapital = document.createElement('div');
    divCapital.innerHTML = `<label>Capital: <input id=Capital></label>`;

    let divID = document.createElement('div');
    divID.innerHTML = `<label>ID: <input id=CID></label>`;

    let divArea = document.createElement('div');
    divArea.innerHTML = `<label>Area: <input type="number" id=Area></label>`;

    let divPopulation = document.createElement('div');
    divPopulation.innerHTML = `<label>Population: <input type="number" id=Population></label>`;

    let divContinent = document.createElement('div');
    divContinent.innerHTML = `<label>Continent: <select id="Continent"> <option>Africa</option> <option>Asia</option> <option>Caribbean</option> <option>Eurasia</option> <option>Europe</option> <option>North America</option> <option>Oceania</option> <option>South America</option> </select></label>`;

    let divGDP = document.createElement('div');
    divGDP.innerHTML = `<label>Gross Domestic Product: <input type="number" id=GDP></label>`;

    let addbotton = document.createElement('button');
    addbotton.innerText = 'Add New Country'
    
    addbotton.onclick = () =>{
        let payload={
            
               
                    "area": parseInt(document.getElementById('Area').value),
                    "capital": document.getElementById('Capital').value,
                    "continent": document.getElementById('Continent').value,
                    "flag": "//upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Armenia.svg",
                    "gdp": parseInt(document.getElementById('GDP').value),
                    "id": parseInt(document.getElementById('CID').value),
                    "name": document.getElementById('CountryName').value,
                    "population": parseInt(document.getElementById('Population').value),
                    "tld": ".am"
                  
              };
              fetch('/api/newCountry',{method:'PUT',body: JSON.stringify(payload),headers:{'content-type':'application/json'}});


        }
        
    document.getElementById('countryDetails').append(divName,divID,divContinent,divCapital,divArea,divPopulation,divGDP,addbotton);
    
}
document.body.onload= async ()=>{
    let ret =await fetch("/api/continentList");
    let cl = await ret.json();
    for(let cont of cl.list){
        let div = document.createElement('div');
        div.innerHTML = cont;
        div.classList.add('continent-label')
        div.onclick = async () =>{
            let ret = await fetch(`/api/getListOfCountries/${cont}`);
            let countryList = await ret.json();
            for(let c of countryList.result){
                let cdiv = document.createElement('div')
                cdiv.innerHTML = c;
                cdiv.classList.add('country-label');
                cdiv.onclick = async() => {
                    let ret = await fetch(`/api/country/${c}`);
                    let countryData = await ret.json();
                    showOneCountry(countryData.result[0]);
                }
                document.getElementById('listOfCountries').append(cdiv);
            }
        }
        let contList = document.getElementById('continentList');
        if (contList){
        document.getElementById('continentList').append(div,' ');
        }
    }
}

function showOneCountry(cobj){
function human_readable_format(num){
    if(num>1000000000000){
        return(num/100000000000).toFixed(1) + ' trillion';
    }else if(num>1000000000){
        return(num/1000000000).toFixed(1) + ' billion';
    }else if(num>1000000){
        return(num/1000000).toFixed(1) + ' million';   
    }else
        return(num)
}
    var area = Intl.NumberFormat();
    document.getElementById('countryDetail').innerHTML = `
        <h2 id='current'>${cobj.name}</h2>
        <div> ID:<span id=currentId> ${cobj.id}</span></div>
        <div> Name: ${cobj.name}</div>
        <div> Continent: ${cobj.continent}</div>
        <div> Capial: ${cobj.capital}</div>
        <div> Area: ${area.format(cobj.area)}</div>
        <div> Population: ${human_readable_format(cobj.population)}</div>
        <div> Gross Domestic Product: ${human_readable_format(cobj.gdp)}</div>
        <img src='${cobj.flag}'>
        <button onclick='doDelete()'>Delete</delete>
        `;
        console.log(area.format(cobj.area));
        console.log(human_readable_format(cobj.population));
        console.log(human_readable_format(cobj.gdp));
}

function doDelete(){
    let victim = document.querySelector('#current').innerText;
    console.log(`You tried to delete ${victim}`);
}