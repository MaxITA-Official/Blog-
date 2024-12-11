const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        try {
            const body = JSON.parse(event.body);
            const fileContent = body.content;
            const fileName = body.fileName;

            const pageName = fileName.replace('.txt', '') + '-blog.html';
            const filePath = path.join('/tmp', pageName);  // Salva nella cartella temporanea

            const htmlContent = `
                <html>
                <head><title>${fileName}</title></head>
                <body>
                    <header><h1>Blog - ${fileName}</h1></header>
                    <article><pre>${fileContent}</pre></article>
                </body>
                </html>
            `;

            await fs.promises.writeFile(filePath, htmlContent);

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Pagina creata con successo!', pageName })
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Errore nel caricamento del file', error })
            };
        }
    }
    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Metodo non consentito' })
    };
};
