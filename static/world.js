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
                    document.getElementById('countryDetail').innerHTML = `
                    <div> Name: ${countryData.result[0].name}</div>
                    <div> Continent: ${countryData.result[0].continent}</div>
                    <img src='${countryData.result[0].flag}'>
                    `;
                }
                document.getElementById('listOfCountries').append(cdiv);
            }
        }
        document.getElementById('continentList').append(div,' ');
        
    }
}