const prompt = require("prompt-sync")();
const os = require('os');


//https://it.wikiversity.org/wiki/File_Binari_%28superiori%29
//https://www.mrw.it/javascript/node-js-buffer-cosa-come-usarli_12438.html

class GestioneFileSynk {
  fs = require('fs');
  
  constructor(nomeFile) {
    this.nomeFile = nomeFile;
  
  }
  ReadFile() {
    try {
      const data = this.fs.readFileSync(this.nomeFile,"utf8");
      return data;
    } catch (err) {
      console.error(err);
    }
  }; 
  WriteFile(msg) {
    try {
      this.fs.writeFileSync(this.nomeFile, msg + " \r\n", { flag: 'a+' });
      // file written successfully
    } catch (err) {
      console.error(err);
    }
  };
  AppendFile(msg) {
    ////?????????????????????
  };
}

let gFs = new GestioneFileSynk("./src/prova.txt");

console.log("........ReadFile..........");
let data = gFs.ReadFile();
console.log("File content:1", data);
console.log("........WriteFile..........");
input = prompt("Testo? ");
gFs.WriteFile(input);
console.log("........ReadFile..........");
let data1 = gFs.ReadFile();
console.log("File content:2", data1);

const lines = data1.split(os.EOL);  // or: text.split(/\r?\n/)

console.log(lines);  // ['line 1', 'line 2']

let gFs1 = new GestioneFileSynk("./src/prova1.txt");
gFs1.WriteFile("cccc");