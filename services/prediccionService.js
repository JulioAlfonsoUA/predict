'use strict';

const Prediccion = require('../model/prediccion');

async function crearPrediccion(datosProducto) {
    try {
        const producto = new Prediccion(datosProducto);
        return await producto.save();
    } catch (err) {
        throw new Error(`Error al crear el producto: ${err}`);
    }
}

module.exports = {
    crearPrediccion
};