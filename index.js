var data ;
var forecst;
// console.log(data)
fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {console.log(json); data  = json; forecst=data.forecast.forecastday;
         prtD();
         setForCst(); 
         getHrForCast(); 
         setMFunc(); 
         chk();
         document.getElementById('loading').style.backdropFilter = 'blur(0px)';
             setTimeout(()=>{
                document.getElementById('loading').style.display='none';

             },1500);
        });

    const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var valentines = new Date("1995-02-14");
var day = valentines.getDay();

console.log(weekday[day]); // "Monday"
// data.forecast.forecastday.forEach(day =>{

// });
function prtD(date){
        valentines = new Date(date);
        day = valentines.getDay();
        // console.log(weekday[day]);
        return weekday[day];
}
var ele = document.getElementsByClassName('forecast')[0];
function setForCst(){
    ele.innerHTML='';
    for (let i = 1; i < forecst.length; i++) {
        console.log(forecst[i])
        ele.innerHTML+=`
        <div class="fcast" ind="${i}">
            <h3>${prtD(forecst[i].date)}</h3>
            <img src="Weather PNG/${forecst[i].day.condition.text}.png" width="60px" alt="">
            <p>${forecst[i].day.avgtemp_c}°C</p>
        </div>
        `
    }

}
// setForCst()
function getHr(data){
    const birthday = new Date(data);

    return birthday.getHours();
}
var HFcast = [];
function getHrForCast(){
    let i=0;
    data.forecast.forecastday.forEach(element => {
        // let tmp = {};
        // let arr=[]
        console.log(element.hour)
        setForecastElements(element.hour);
        HFcast.push(element.hour)
        // console.log(typeof(element.hour))
        // console.log( prtD(element.date))
        
        // element.hour.forEach(element => {
        //     // console.log(element.time +` ___ ${element.condition.text}  ____ `+ element.temp_f);
        //     tmp.time = element.time;
        //     tmp.condition=element.condition.text;
        //     tmp.temperature= element.temp_f;
        //     arr.push(tmp);
        // });
        // HFcast.push(arr);
    });
}
let tar = document.getElementsByClassName('hForecast');

function setForecastElements(data){
    tar[0].innerHTML='';
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        tar[0].innerHTML+=`
        <div class="hFcast"
            style="-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;"
            unselectable="on";
            onselectstart="return false;" 
            onmousedown="return false;"
        >
        <h3 style="opacity: 0.5; font-weight: 100;">${element.temp_c}°C</h3>
        <img src="Weather PNG/${element.condition.text}${(element.condition.text == 'Overcast' && getHr(element.time) > 17)? 'N' :(element.condition.text == 'Overcast'?'D':'') }.png" width="60px" alt=""/>
            <div>

                <p>${element.condition.text}</p>
                <p>${getHr(element.time)}:00</p>
            </div>
        </div>
        
        `
    }
}

let src = document.getElementsByClassName('srch');
let kywd = document.getElementsByClassName('src');
src[0].addEventListener('click',(e)=>{
    console.log("Search button clicked");
    document.getElementById('loading').style.display='flex';
    document.getElementById('loading').style.backdropFilter = 'blur(20px)';
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=4f5b6dc6d12d4c8fa6663353232208&q=${kywd[0].value}&days=7`)
        .then((response) => response.json())
        .then((json) => {console.log(json); data  = json; forecst=data.forecast.forecastday;
             prtD();
             setForCst(); 
             getHrForCast(); 
             setMFunc(); 
             chk();
             document.getElementById('loading').style.backdropFilter = 'blur(0px)';
             setTimeout(()=>{
                document.getElementById('loading').style.display='none';

             },1500);
            });

})

function setMFunc(){
    document.getElementsByClassName('mTemp')[0].innerHTML= data.current.temp_c;
    document.getElementsByClassName('texty')[0].innerHTML= data.current.condition.text;
    document.getElementsByClassName('city')[0].innerHTML= `${data.location.name} ,${data.location.region}`;
    document.getElementsByClassName('wfor')[0].innerHTML= `${data.current.wind_dir}, ${data.current.wind_kph} KMPH`;
    document.getElementsByClassName('wPrs')[0].innerHTML= `${data.current.pressure_mb}MB`;
    document.getElementsByClassName('humd')[0].innerHTML= `${data.current.humidity}%`;
}
let lisfcast = document.getElementsByClassName('fcast');
function chk(){

    for (let index = 0; index < lisfcast.length; index++) {
        console.log(lisfcast[index])
        lisfcast[index].addEventListener('click',()=>{
            console.log("clicked");
            console.log(lisfcast[index].getAttribute('ind'));
            setForecastElements(HFcast[lisfcast[index].getAttribute('ind')]);
        })
        // console.log(lisfcast[index].getAttribute('ind'))
    }
}