const BASES_NITROGENADAS = "ATGC".split("");

/**
 * Función auxiliar que valida si una cadena sólo contiene
 * las bases nitrogenadas (A, T, G, C).
 * 
 * @author  Javier Juárez Carrillo
 * @param   {String}    cadena  String que representa una secuencia de ADN.
 * @returns {boolean}           El string es válido o no.
 */
function esBaseNitrogenada(cadena) {
    let arregloCadena = cadena.split("");
    for (const base of arregloCadena) {
        if (!BASES_NITROGENADAS.includes(base)) {
            return false;
        }   
    }
    return true;
}

/**
 * Transforma un arreglo de Strings en una matriz
 * de NxN, con N el tamaño del arreglo y de cada
 * String dentro de ella.
 * 
 * @author  Javier Juárez Carrillo
 * @param   {String[]}      dnaArray    Arreglo de Strings que contiene las secuencias de ADN
 * @returns {String[][]}                La representación en matriz del arreglo
 */
function transformToMatrix(dnaArray) {
    let n = dnaArray.length;
    let dnaMatrix = [];

    for (let index = 0; index < n; index++) {
        dnaMatrix[index] = dnaArray[index].split("");
    }

    return dnaMatrix;
}

/**
 * Se encarga de encontrar secuencias de cuatro letras 
 * iguales consecutivas en un arreglo de Strings
 * 
 * Por ejemplo:
 * 
 * [ 'C', 'C', 'C', 'C', 'T', 'A' ]
 * 
 * Existe una secuencia de 4 letras consecutivas en el arreglo.
 * 
 * @author  Javier Juárez Carrillo
 * @param   {String[]}  arr Arreglo de Strings que contiene una secuencia de ADN
 * @returns {Number}        El número de secuencias iguales a 4 letras iguales consecutivas encontradas
 */
function encuentraSecuenciasHorizontales(arr) {
    let secuencia = [];
    let secuenciasEncontradas = 0;
    let arrLength = arr.length;
    for (let i = 0; i < arrLength; i++) {
        secuencia.push(arr[i]);
        if (secuencia.length >= 4) {
            secuenciasEncontradas++;
        }
        if (i < arrLength - 1) {
            if (arr[i+1] != secuencia[i]) {
                secuencia = [];
            }
        }
    }
    return secuenciasEncontradas;
}

/**
 * Se encarga de encontrar secuencias de 4 o más letras 
 * iguales consecutivas en las diagonales de la matriz que
 * representa las secuencias de ADN
 * 
 * Por ejemplo:
 * 
 * [ [ 'A', 'T', 'G', 'C', 'G', 'A' ],
 *   [ 'C', 'A', 'G', 'T', 'G', 'C' ],
 *   [ 'T', 'T', 'A', 'T', 'G', 'T' ],
 *   [ 'A', 'G', 'A', 'A', 'G', 'G' ],
 *   [ 'C', 'C', 'C', 'C', 'T', 'A' ],
 *   [ 'T', 'C', 'A', 'C', 'T', 'G' ] ]
 * 
 * Las diagonales de la matriz serían:
 * ['A', 'A', 'A', 'A', 'T', 'G']
 * ['A', 'G', 'T', 'A', 'C', 'T']
 * 
 * En las diagonales existe una secuencia con 4 letras iguales
 * 
 * @author  Javier Juárez Carrillo
 * @param   {String[][]}  matrix    La matriz de ADN
 * @returns {Number}                El número de secuencias iguales a 4 letras iguales consecutivas encontradas
 */
function encuentraSecuenciaDiagonal(matrix) {
    let secuenciaDiag1 = [];
    let secuenciaDiag2 = [];
    let matrixLength = matrix.length;
    let secuenciasEncontradas = 0;
    for (let i = 0; i < matrixLength; i++) {
        secuenciaDiag1.push(matrix[i][i]);
        secuenciaDiag2.push(matrix[i][matrixLength-1-i]);
        if (secuenciaDiag1.length >= 4) {
            secuenciasEncontradas++;
        }
        if (secuenciaDiag2.length >= 4) {
            secuenciasEncontradas++;            
        }

        if (i < matrixLength - 1) {
            if (matrix[i+1][i+1] != secuenciaDiag1[i]) {
                secuenciaDiag1 = [];
            }
            if (matrix[i+1][matrixLength-i] != secuenciaDiag2[i]) {
                secuenciaDiag2 = [];
            }   
        }
    }
    return secuenciasEncontradas;
}

module.exports = {
    esBaseNitrogenada,
    transformToMatrix,
    encuentraSecuenciasHorizontales,
    encuentraSecuenciaDiagonal
}