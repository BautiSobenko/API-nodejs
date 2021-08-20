const axios = require('axios');

class Busquedas {

    historial = ['Mar del plata', 'Madrid', 'Buenos Aires'];

    constructor() {
        //TODO: Leer DB si existe
    }

    get paramsMapBox(){
        return{
            'access_token': process.env.MAPBOX_KEY,
            'limit' : 5,
            'language': 'es'
        }
    }
  
    async ciudad( lugar = '' ) {
    
        try {
            //Peticion HTTP
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapBox
            });

            const resp = await instance.get();

            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));
                 
        } catch (error) {
            //Si el user escribio algo que no existe, regreso un
            //arreglo vacia dando a entender que no se encontro nada
            return [];     
        }
    }
    
    get paramsWeather(){ //Defino los query params del postman
        return{ 
            appid: process.env.OPENWEATHER_KEY ,
            units: 'metric' ,
            lang: 'es', 
        }
    }
    
    async climaLugar( lat, lon ) {

        try {
            //Instance axios.create
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {...this.paramsWeather, lat, lon}
            });

            //Peticion http get
            const resp = await instance.get(); //Me devuelve un object
            const {weather, main} = resp.data
            
            return {
                desc: weather[0].description,
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max,
            }
            
            
        } catch (error) {
            console.log(error);
        }

    }

}

module.exports = Busquedas;