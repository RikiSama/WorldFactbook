document.getElementById('newCountry').onclick = () => {
    document.getElementById('countryDetails').innerHTML='';

    let divContinent = document.createElement('div');
    divContinent.innerHTML = `
    <div class="row align-items-center ff">
    <div class="col-md-3"></div>
    <div class="col-md-3">
    <label for="cont" class="col-form-label">Continent: </label>
    </div>
    <div class="col-md-3">
    <select id="Continent" required> <option>Africa</option> 
    <option>Asia</option> <option>Caribbean</option> <option>Eurasia</option> 
    <option>Europe</option> <option>North America</option> <option>Oceania</option> 
    <option>South America</option> </select>
    </div>
    </div>
    <div class="col-md-3"></div>
    `;

    let divName = document.createElement('div');
    divName.innerHTML = `
    <div class="row align-items-center ff">
    <div class="col-md-3"></div>
    <div class="col-md-3">
    <label for="cname" class="col-form-label">CountryName: </label>
    </div>
    <div class="col-md-3">
    <input type="text" onkeypress="return (event.charCode > 64 && 
        event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)" id=CountryName required>
    </div>
    </div>
    <div class="col-md-3"></div>
    `;

    let divCapital = document.createElement('div');
    divCapital.innerHTML = `
    <div class="row align-items-center ff">
    <div class="col-md-3"></div>
    <div class="col-md-3">
    <label for="ccap" class="col-form-label">Capital: </label>
    </div>
    <div class="col-md-3">
    <input type="text" onkeypress="return (event.charCode > 64 && 
        event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)" id=Capital required>
    </div>
    </div>
    <div class="col-md-3"></div>
    `;

    let divID = document.createElement('div');
    divID.innerHTML = `
    <div class="row align-items-center ff">
    <div class="col-md-3"></div>
    <div class="col-md-3">
    <label for="cid" class="col-form-label">ID: </label>
    </div>
    <div class="col-md-3">
    <input type="number" id=CID required>
    </div>
    </div>
    <div class="col-md-3"></div>
    `;

    let divArea = document.createElement('div');
    divArea.innerHTML = `
    <div class="row ff">
    <div class="col-md-3"></div>
    <div class="col-md-3">
    <label for="area" class="col-form-label">Area: </label>
    </div>
    <div class="col-md-3">
    <input type="number" id=Area required>
    </div>
    </div>
    <div class="col-md-3"></div>
    `;

    let divPopulation = document.createElement('div');
    divPopulation.innerHTML = `
    <div class="row ff">
    <div class="col-md-3"></div>
    <div class="col-md-3">
    <label for="popl" class="col-form-label">Population: </label>
    </div>
    <div class="col-md-3">
    <input type="number" id=Population required>
    </div>
    </div>
    <div class="col-md-3"></div>
    `;

    let divGDP = document.createElement('div');
    divGDP.innerHTML = `
    <div class="row ff">
    <div class="col-md-1"></div>
    <div class="col-md-5">
    <label for="gdp" class="col-form-label">Gross Domestic Product: </label>
    </div>
    <div class="col-md-3">
    <input type="number" id=GDP required>
    </div>
    </div>
    <div class="col-md-3"></div>
    `;

    let addbotton = document.createElement('div');
    addbotton.innerHTML = `
    <div class="row ff">
    <div class="col-md-3"></div>
    <div class="col-md-6">
    <span class="input-group-btn">
    <button id="newCountry" class="btn btn-secondary" type="submit" onclick="alert('Successfully! Created New Country');">Add New Country
    </button>
    </span>
    </div>
    </div>
    <div class="col-md-3"></div>  
    `;

    addbotton.onclick = () =>{
        let payload={
                    "area": parseInt(document.getElementById('Area').value),
                    "capital": document.getElementById('Capital').value,
                    "continent": document.getElementById('Continent').value,
                    "gdp": parseInt(document.getElementById('GDP').value),
                    "id": parseInt(document.getElementById('CID').value),
                    "name": document.getElementById('CountryName').value,
                    "population": parseInt(document.getElementById('Population').value),
                    "tld": ".am"
                  
              };
              console.log(document.getElementById('CountryName').value);
                //clear input field
                document.getElementById('Area').value = '';
                document.getElementById('Capital').value = '';
                //document.getElementById('Continent').value = '';
                document.getElementById('GDP').value = '';
                document.getElementById('CID').value = '';
                document.getElementById('CountryName').value = '';
                document.getElementById('Population').value = '';

              fetch('/api/newCountry',{method:'PUT',body: JSON.stringify(payload),headers:{'content-type':'application/json'}});
            }     
    document.getElementById('countryDetails').append(divContinent,divName,divCapital,divID,divArea,divPopulation,divGDP,addbotton);
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
                cdiv.style.color = '#343A3E';
                cdiv.style.fontFamily = "'DynaPuff', cursive";
                cdiv.style.justifyContent = 'center';
                cdiv.style.margin = '5px';
                cdiv.style.padding = '8px';
                cdiv.style.cursor = 'pointer';

                cdiv.onclick = async() => {
                    let ret = await fetch(`/api/country/${c}`);
                    let countryData = await ret.json();
                    showOneCountry(countryData.result[0]); 
                }
                
                let span = document.createElement('span');
                span.innerHTML = cont;
                span.classList.add(cont);
                
                document.getElementById('listOfCountries').append(cdiv); 
            }

            document.getElementById('countrylistbycon').append(cont);
            console.log(cont);
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
        
        <div class="row">
        <div class="col-lg-12">
            <div class="row">
                
                <div class="col-lg-12">
                <img src='${cobj.flag}' class="img-fluid">
                </div>
                
            </div>
            <div class="row">
                <div class="col-lg-3"></div>
                <div class="col-lg-6">
                <h2 class="text-center cd1 current">${cobj.name}</h2>
                </div>
                <div class="col-lg-3"></div>
            </div>
            <div class="row">
                <div class="col-lg-4"></div>
                <div class="col-lg-5">
                
                <div><span class="cdd"> ID:</span><span id=currentId class="cd"> ${cobj.id}</span></div>
                <div><span class="cdd"> Name:</span><span class="cd"> ${cobj.name}</span></div>
                <div><span class="cdd"> Continent:</span><span class="cd"> ${cobj.continent}</span></div>
                <div><span class="cdd"> Capital:</span><span class="cd"> ${cobj.capital}</span></div>
                <div><span class="cdd"> Area:</span><span class="cd"> ${area.format(cobj.area)}</span></div>
                <div><span class="cdd"> Population:</span><span class="cd"> ${human_readable_format(cobj.population)}</span></div>
                <div><span class="cdd"> GDP:</span><span class="cd"> $ ${human_readable_format(cobj.gdp)}</span></div>

                </div>
                <div class="col-lg-3"></div>
            </div>
        </div>
        </div>
        
        <div class="row">
        <div class="col-lg-9"></div>
        <div class="col-lg-3">
        <button class="btn btn-secondary del" onclick='doDelete()'>Delete</delete>
        </div>
        </div>
        
        `;
}

async function doDelete(){
    let victim = document.querySelector('h2.current').innerText;
    console.log (`You tried to delete ${victim}`);
    let r = await fetch(`/api/country/${victim}`,{method:"DELETE"})
    let r1 = await r.json();
    console.log('deleting button success ');
    location.reload()
}

function locationreload() {
    location.reload();  
}