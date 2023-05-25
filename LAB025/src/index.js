const prompt = require("prompt-sync")();

class GestioneFileSynk {
    fs = require('fs'); //selezionare libreria

    constructor(nomeFile) {
        this.nomeFile = nomeFile;

    }
    ReadFile() {
        try {
            const data = this.fs.readFileSync(this.nomeFile, "utf8");
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
    AppendFile(msg){
        
    }
}

class Persona {
    nome;
    cognome;
    data_nascita;
    constructor(nome, cognome, data_nascita) {
        this.nome = nome;
        this.cognome = cognome;
        this.data_nascita = data_nascita;
    }
}

class Istituzione {
    nome;
    lista_personale;
    constructor(nome) {
        this.nome = nome;
        this.lista_personale = [];
    }
    aggiungiPersona(persona){
        this.lista_personale.push(persona);
    }
}

const istituzioni = [];

let gFs = new GestioneFileSynk("./src/istituzioni.json");
let data = JSON.parse(gFs.ReadFile());

for (let i = 0; i < data.length; i++) {
    let istituzioneValues = Object.values(data[i]);
    // let nome = data[i].nome;
    let persone = [];
    // let lista = data[i].lista_personale;
    for (let j = 0; j < istituzioneValues[1].length; j++) {
        let personaValues = Object.values(istituzioneValues[1][j]);
        // let nome_persona = lista[j].nome;
        // let cognome_persona = lista[j].cognome;
        // let data_nascita_persona = lista[j].data_nascita;

        // let persona = new Persona(nome_persona, cognome_persona, data_nascita_persona);
        let persona = new Persona(personaValues[0],personaValues[1],personaValues[2]);
        persone.push(persona);
    }
    let istituzione = new Istituzione(istituzioneValues[0], persone);
    istituzioni.push(istituzione);
}

console.log("Il file è importato correttamente");

persone = [];

let persona1 = new Persona("Mario", "Rossi", "11/11/2000")
persone.push(persona1);
let persona2 = new Persona("Giovanni", "Felpa", "12/12/2012")
persone.push(persona2);
let persona3 = new Persona("Alessandro", "Alessandria", "01/09/1999")
persone.push(persona3);

istituzione = new Istituzione("ISISS DE-GASPERI", persone);
istituzioni.push(istituzione);

let gfsEsporta = new GestioneFileSynk("./src/istituzioni1.json");
gfsEsporta.WriteFile(JSON.stringify(istituzioni, null, "\t"));
console.log("File esportato correttamente");