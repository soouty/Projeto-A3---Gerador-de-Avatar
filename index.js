const express = require('express');
const crypto = require('crypto');
const jdenticon = require('jdenticon');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do jdenticon
jdenticon.config = {
    hues: [195], // Cor principal
    lightness: {
        color: [0.4, 0.8],
        grayscale: [0.3, 0.9]
    },
    saturation: {
        color: 0.5,
        grayscale: 0.0
    },
    backColor: "#ffffff00"
};

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para obter um ícone com base em um identificador
app.get('/icon', (req, res) => {
    const { key } = req.query;
    if (!key) {
        return res.status(400).send('Key query parameter is required');
    }
    const hash = crypto.createHash('sha256').update(key).digest('hex');
    const svgIcon = jdenticon.toSvg(hash, 100);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svgIcon);
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
