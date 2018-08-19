"use strict";
let JSZip = require("jszip");
let Docxtemplater = require("docxtemplater");

let fs = require("fs");
// declare let MONGO_DB_FILIALEN_COLLECTION_STRING: string;
// declare let MONGO_DB_ROUTEN_COLLECTION_STRING: string;

class DokumentService {
  public CreateDocX(complateFilename: string, complateTemplateFilepath: string, templateMetaData: {}) {
    return new Promise(async (resolve, reject) => {
      // Load the docx file as a binary
      let content = fs.readFileSync(complateTemplateFilepath, "binary");

      let zip = new JSZip(content);

      let doc = new Docxtemplater();
      doc.loadZip(zip);

      // set the templateVariables
      doc.setData(templateMetaData);

      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render();
      } catch (error) {
        let e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties
        };
        console.log(JSON.stringify({ error: e }));
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error;
      }

      let buf = doc.getZip().generate({ type: "nodebuffer" });

      // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
      fs.writeFileSync(complateFilename, buf);
      resolve();
    });
  }
}

export let DokumentServiceInstance = new DokumentService();
