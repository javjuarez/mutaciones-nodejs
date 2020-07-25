const hasMutation = require("../utils/hasMutation");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post("/mutation", (req, res) => {
    const dna = req.body.dna;

    const mutationResult = hasMutation(dna);

    switch (mutationResult) {
        case -1:
            return res.status(403).json({
                status: "OK",
                mensaje: "El ADN NO contiene una mutación",
            });

        case 1:
            return res.status(400).json({
                status: "ERROR",
                mensaje:
                    "La longitud de las cadenas debe coincidir con el tamaño del arreglo ingresado",
            });

        case 2:
            return res.status(400).json({
                status: "ERROR",
                mensaje:
                    "El ADN sólo debe tener bases nitrogenadas válidas: (A, T, G, C)",
            });

        case 3:
            return res.status(400).json({
                status: "ERROR",
                mensaje: "No es un arreglo",
            });

        case 4:
            return res.status(400).json({
                status: "ERROR",
                mensaje: "El arreglo no puede estar vacío",
            });

        case 5:
            return res.status(400).json({
                status: "ERROR",
                mensaje: "El arreglo sólo debe contener Strings",
            });

        default:
            return res.status(200).json({
                status: "OK",
                mensaje: "El ADN contiene una mutación",
            });
    }
});

module.exports = app;
