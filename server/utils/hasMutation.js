const { esBaseNitrogenada, transformToMatrix, encuentraSecuenciasHorizontales, encuentraSecuenciaDiagonal } = require('./auxiliares');
const _ = require('underscore');

// const dnaConMutacion = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
// const dnaSinMutacion = ["ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]

/**
 * Dado cualquier valor, verifica si es de tipo String
 * 
 * @param {Object} valor 
 */
const isString = (valor) => typeof valor === "string";

/**
 * Dado un arreglo de ADN de NxN (con N el tamaño del arreglo y el tamaño de cada
 * cadena) detecta si hay una mutación en el ADN ingresado.
 * Una mutación se detecta si se encuentra más de una secuencia de cuatro letras
 * iguales, de forma diagonal, horizontal o vertical.
 * 
 * @author  Javier Juárez Carrillo
 * @param   {String[]}  dna El ADN a analizar
 * @returns {number}        0 si existe una mutación en el ADN,
 *                          -1 si no existe una mutación, 
 *                          1 si la longitud de las cadenas y el tamaño del arreglo no coinciden, 
 *                          2 si no contienen bases nitrogenadas válidas.
 *                          3 si el parámetro no es un arreglo
 *                          4 si el arreglo está vacío
 *                          5 si el arreglo no es únicamente de Strings
 */
function hasMutation(dna) {
    if(!Array.isArray(dna)) {
        return 3;
    }

    if (dna.length === 0) {
        return 4;
    }

    if(!dna.every(isString)) {
        return 5;
    }

    // Obtenemos el String con mayor longitud y validamos si el tamaño del arreglo coincide con él
    let maxString = dna.reduce((a, b) => a.length > b.length ? a : b);
    let minString = dna.reduce((a, b) => a.length < b.length ? a : b);
    if (maxString.length != minString.length || maxString.length != dna.length) {
        // throw new Error("La longitud de las cadenas debe coincidir con el tamaño del arreglo ingresado");
        return 1;
    }

    // Validamos si cada String contiene únicamente bases nitrogenadas
    for (const cadena of dna) {
        if (!esBaseNitrogenada(cadena)) {
            // throw new Error("El ADN sólo debe tener bases nitrogenadas válidas: (A, T, G, C)")
            return 2;
        }
    }

    // Transformamos el arreglo en una matriz de NxN
    let dnaMatrix = transformToMatrix(dna);
    // Obtenemos la traspuesta de la matriz
    let dnaMatrixTranspose = _.zip.apply(_, dnaMatrix);
    let secuenciasEncontradas = 0;

    // Para obtener las secuencias de forma vertical de la matriz original
    // aplicamos la función para encontrar las horizontales de la traspuesta
    for (let i = 0; i < dna.length; i++) { 
        secuenciasEncontradas += encuentraSecuenciasHorizontales(dnaMatrix[i]);
        secuenciasEncontradas += encuentraSecuenciasHorizontales(dnaMatrixTranspose[i]);
    }
    secuenciasEncontradas += encuentraSecuenciaDiagonal(dnaMatrix);
    
    return (secuenciasEncontradas >= 2 ? 0 : -1);
}

module.exports = hasMutation;

// let dnaMatrix = transformToMatrix(dnaConMutacion);
// console.log(encuentraSecuenciaDiagonal(dnaMatrix));

// console.log("Matriz de ADN:\n", dnaMatrix);
// console.log(encuentraSecuenciasHorizontales(dnaMatrix[4]));

// let dnaMatrixTranspose = _.zip.apply(_, dnaMatrix);
// console.log("Matriz transpuesta:\n", dnaMatrixTranspose);
// console.log(encuentraSecuenciasHorizontales(dnaMatrixTranspose[4]));

// let dnaMatrixConMutacion = transformToMatrix(dnaConMutacion);
// console.log("ADN con mutación:", dnaConMutacion);
// console.log("Matriz de ADN:\n", dnaMatrixConMutacion);
// console.log("¿Se detecta mutación en el ADN?", hasMutation(dnaConMutacion));

// let dnaMatrixSinMutacion = transformToMatrix(dnaSinMutacion);
// console.log("ADN sin mutación:", dnaSinMutacion);
// console.log("Matriz de ADN:\n", dnaMatrixSinMutacion);
// console.log("¿Se detecta mutación en el ADN?", hasMutation(dnaSinMutacion));