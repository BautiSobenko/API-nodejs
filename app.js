require('dotenv').config() //Configurcion de las variables de entorno

const { leerInput, 
        inquirerMenu, 
        confirmar, 
        pausa,
        listarLugares, 
} = require("./helpers/inquirer")

const Busquedas = require('./models/busquedas');

const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    do {
        // Options menu
        opt = await inquirerMenu();
        
        //Mostrar mensaje
        const ciudad = await leerInput('Ingrese una ciudad: ');
        
        //Buscar los lugares
        const lugares = await busquedas.ciudad(ciudad);
        
        //Seleccionar el lugar
        const id = await listarLugares(lugares);
        if( id === '0' ) continue;
        const lugarSel = lugares.find( lugar => lugar.id === id ); //me devuelve un obj
        
        //Clima
        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

        //Mostrar rtados
        console.log('\nInformacion de la ciudad\n'.green);
        console.log('Ciudad:',lugarSel.nombre );
        console.log('Lat:', lugarSel.lat);
        console.log('Lng:', lugarSel.lng );
        console.log('Temperatura:', clima.temp,'°C' );
        console.log('Max:', clima.max,'°C');
        console.log('Min:', clima.min,'°C' );
        console.log('Como esta el clima:',clima.desc);
    
        if( opt !== 0 )
            await pausa();

    } while ( opt !== 0 );

}

main();