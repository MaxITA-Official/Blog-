const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

exports.handler = async function(event, context) {
    const formData = await new Promise((resolve, reject) => {
        let body = '';
        event.body.on('data', chunk => body += chunk);
        event.body.on('end', () => resolve(parse(body)));
        event.body.on('error', reject);
    });

    const file = formData.file;
    const fileName = path.basename(file.name, path.extname(file.name)); // estrai il nome senza estensione

    // Crea un file nella cartella blog con il contenuto del file caricato
    const blogPath = path.join(__dirname, '../site/blog', `${fileName}.html`);

    // Scrivi il contenuto del file come una nuova pagina HTML
    const content = `<!DOCTYPE html>
    <html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Blog: ${fileName}</title>
    </head>
    <body>
        <h1>${fileName}</h1>
        <pre>${file.content}</pre>
    </body>
    </html>`;

    // Salva il contenuto del file
    try {
        fs.writeFileSync(blogPath, content);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'File caricato con successo', fileName: fileName })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Errore nel salvataggio del file' })
        };
    }
};
