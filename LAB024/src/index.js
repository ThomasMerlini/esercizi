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
    AppendFile(msg) {
        ////?????????????????????
    };
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
    ToString() {
        return `Nome : ${this.nome}\nCognome : ${this.cognome}\nData nascita : ${this.data_nascita}`;
    }
}

class Prova{
    #persone;
    constructor(){
        this.#persone = [];
    }
    get persone(){
        return this.#persone;
    }
    importFile(file) {
        let gFs = new GestioneFileSynk(file);
        let data = JSON.parse(gFs.ReadFile());
    
        for (let i = 0; i < data.length; i++) {
            var riga = Object.values(data[i]);
            var persona = new Persona(riga[0], riga[1], riga[2]);
            this.persone.push(persona);
        }
    
        console.log("Il file è importato correttamente");
    
        for (let i = 0; i < this.persone.length; i++) {
            console.log("Persona " + (i + 1) + ":\n");
            console.log(this.persone[i].ToString());
        }
    }
    exportFile(file) {
        let gfsEsporta = new GestioneFileSynk(file);
        gfsEsporta.WriteFile(JSON.stringify(this.persone, null, 4));
        console.log("File esportati correttamente");
    }

    countWord(file, word) {
        let count = 0;
        let gFsSearch = new GestioneFileSynk(file);
        let data = JSON.parse(gFsSearch.ReadFile());
    
        for (let i = 0; i < data.length; i++) {
            var persona = data[i];
            var parole = Object.values(persona);
            for (let j = 0; j < parole.length; j++) {
                var parola = parole[j];
                if (parola == word) {
                    count++;
                }
            }
        }
    
        console.log(`Ci sono ${count} occorrenze della parola ${word}`);
    }
}

function menu() {
    const prova = new Prova();
    let controllo = true;
    while (controllo) {
        console.log("Menu: \n1) import;\n2) export;\n3) conta numero occorrenze di una parola;\n4) uscita dal programma.");
        var choice = prompt("Inserire 1, 2, 3 o 4? ");
        switch (parseInt(choice)) {
            case 1:
                var file = prompt("Inserisci il percorso del file? ");
                prova.importFile(file);
                break;
            case 2:
                var file = prompt("Inserisci il percorso del file? ");
                prova.exportFile(file);
                break;
            case 3:
                var file = prompt("Inserisci il percorso del file? ");
                var word = prompt("Inserisci la parola da cercare? ");
                prova.countWord(file, word);
                break;
            case 4:
                controllo = false;
                break;
            default:
                controllo = false;
                break;
        }
    }
}

menu();
