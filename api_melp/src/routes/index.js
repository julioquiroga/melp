const { Router } = require('express');
const router = Router();

router.get('/', (req,res) => {
    res.send({"Mensaje":"Bienvenido al API de Melp"});
});

router.get('/version', (req,res) => {
    const data = {
        "Nombre":"API Rest Melp",
        "Versión":"1.0",
        "Autor":"Julio Quiroga",
        "Soporte":"julioquirogamx@gmail.com"
    };
    res.json(data);
});

module.exports = router;