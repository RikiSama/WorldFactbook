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
    document.getElementById('countryDetail').innerHTML = `
        <div> Name: ${cobj.name}</div>
        <div> Continent: ${cobj.continent}</div>
        <div> Capial: ${cobj.capital}</div>
        <div> Area: ${cobj.area}</div>
        <div> Population: ${cobj.population}</div>
        <div> Gross Domestic Product: ${cobj.gdp}</div>
        <img src='${cobj.flag}'>
        <button onclick='doDelete()'>Delete</delete>
        `;
}

function doDelete(){
    console.log("You tried to delete");
}