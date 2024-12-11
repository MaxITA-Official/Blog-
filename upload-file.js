const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

exports.handler = async (event, context) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '../site/blog'); // Dove vuoi salvare il file
  form.keepExtensions = true;
  form.parse(event.body, (err, fields, files) => {
    if (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Errore nel caricamento del file' })
      };
    }

    const file = files.file[0]; // il file caricato
    const fileName = file.newFilename;
    const filePath = path.join(form.uploadDir, fileName);

    try {
      // Salva il file
      fs.renameSync(file.filepath, filePath);

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'File caricato con successo', fileName: fileName })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Errore nel salvataggio del file' })
      };
    }
  });
};
