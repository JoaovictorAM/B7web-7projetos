document.querySelector('.busca').addEventListener('submit',async(event)=>{
	event.preventDefault();

	let input = document.querySelector('#searchInput').value;
	if(input!==''){
		clearInfo();
		showWarnirg('Carregando...');
		let url =`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=ef31191ef4aa952fb13942fe80a9854f&units=metric&leng=pt_br`;
		let results = await fetch(url);
		let json = await results.json();
		
		if(json.cod === 200){
			showInfo({
				name: json.name,
				country: json.sys.country,
				temp: json.main.temp,
				tempIcon: json.weather[0].icon,
				windSpeed: json.wind.speed,
				windAngle: json.wind.dag
			});
		}else{
			clearInfo();
			showWarnirg('Não encontramos esta localização.')
		}
	}else{
		clearInfo();
	}
});
function showInfo (json){
	showWarnirg('');
	document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
	document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
	document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

	document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
	document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle -90}deg)`;
	document.querySelector('.resultado').style.display = 'block';

}
function showWarnirg(msg){
	document.querySelector('.aviso').innerHTML = msg;
}
function clearInfo(){
	showWarnirg('');
	document.querySelector('.resultado').style.display = 'none';
}