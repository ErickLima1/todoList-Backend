const validateBody = (req, res, next) => {
    const {body} = req;
    
    if(body.titulo === undefined) {
        return res.status(400).json({message: 'Campo Titulo é Obrigatorio!'});
    }

    if(body.titulo === '') {
        return res.status(400).json({message: 'Campo em Branco!'});
    }

    next();
};

const validateStatus = (req, res, next) => {
    const {body} = req;

    if(body.status === undefined) {
        return res.status(400).json({message: 'Campo do status é Obrigatorio!'});
    }

    if(body.status === '') {
        return res.status(400).json({message: 'Campo do status em Branco!'});    
    }
    next();
};

module.exports = {
    validateBody,
    validateStatus,
};