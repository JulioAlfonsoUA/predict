'use strict';

const Prediccion = require('../model/prediccion');

async function crearPrediccion(datosPredicicon) {
    try {
        const prediccion = new Prediccion(datosPredicicon);
        return await prediccion.save();
    } catch (err) {
        throw new Error(`Error al crear la prediccion: ${err}`);
    }
}

module.exports = {
    crearPrediccion
};