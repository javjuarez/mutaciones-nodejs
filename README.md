# Detección de mutaciones

## Instalación
`$ npm install`

## Para ejecutar el código
`$ npm start`

Creará un servidor local, el cuál acepta una petición POST al endpoint **/mutation**, regresa una respuesta HTTP con una respuesta adecuada en formato JSON.

---

Proyecto sencillo hecho con [NodeJS](https://nodejs.org/) y [Express](https://www.npmjs.com/package/express) que detecta si una persona tiene diferencias genéticas basándose en su secuencia de ADN.

La función principal:
```javascript
hasMutation(dna: String[])
```
recibe un arreglo de `String` las cuales representa cada base nitrogenada del ADN.

Existe una mutación en el ADN si existe más de una secuencia de cuatro letras iguales de forma oblícua (diagonal), horizontal y vertical. 

Por ejemplo:

**Sin mutación**

A T G C G A

C A G T G C

T T A T T T

A G A C G G

G C G T C A

T C A C T G

**Con mutación:**

A T G C G A

C A G T G C

T T A T G T

A G A A G G

C C C C T A

T C A C T G

