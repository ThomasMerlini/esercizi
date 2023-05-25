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
    #nome;
    #cognome;
    #data_nascita;
    constructor(nome, cognome, data_nascita) {
        this.nome = nome;
        this.cognome = cognome;
        this.data_nascita = data_nascita;
    }
    set nome(name) {
        this.#nome = name;
    }
    set cognome(surname) {
        this.#cognome = surname;
    }
    set data_nascita(date) {
        this.#data_nascita = date;
    }
    get nome() {
        return this.#nome;
    }
    get cognome() {
        return this.#cognome;
    }
    get data_nascita() {
        return this.#data_nascita;
    }
    ToString() {
        return `Nome : ${this.nome}\nCognome : ${this.cognome}\nData nascita : ${this.data_nascita}`;
    }
    ToCsv() {
        return `${this.nome},${this.cognome},${this.data_nascita}`;
    }
}

function importFile(file, persone) {
    let gFs = new GestioneFileSynk(file);
    let data = gFs.ReadFile().split(/\r?\n/);
    data.splice(0, 1);

    for (let i = 0; i < data.length; i++) {
        var riga = data[i].split(",");
        var persona = new Persona(riga[0], riga[1], riga[2]);
        persone.push(persona);
    }

    console.log("Il file è importato correttamente");

    for (let i = 0; i < persone.length; i++) {
        console.log("Persona " + (i + 1) + ":\n");
        console.log(persone[i].ToString());
    }
}

function exportFile(file, persone) {
    let gfsEsporta = new GestioneFileSynk(file);
    gfsEsporta.WriteFile("Nome,Cognome,data_di_nascita");
    for (let i = 0; i < persone.length; i++) {
        gfsEsporta.WriteFile(persone[i].ToCsv());
    }
    console.log("File esportati correttamente");
}

function countWord(file, word) {
    let count = 0;
    let gFs = new GestioneFileSynk(file);
    let data = gFs.ReadFile();
    let righe = data.split(/\r?\n/);
    righe.splice(0, 1);

    for (let i = 0; i < righe.length; i++) {
        var riga = righe[i];
        var parole = riga.split(",");
        for (let j = 0; j < parole.length; j++) {
            var parola = parole[j];
            if (parola == word) {
                count++;
            }
        }
    }

    console.log(`Ci sono ${count} occorrenze della parola ${word}`);
}

function menu() {
    const persone = [];
    let controllo = true;
    while (controllo) {
        console.log("Menu: \n1) import;\n2) export;\n3) conta numero occorrenze di una parola;\n4) uscita dal programma.");
        var choice = prompt("Inserire 1, 2, 3 o 4? ");
        switch (parseInt(choice)) {
            case 1:
                var file = prompt("Inserisci il percorso del file? ");
                importFile(file, persone);
                break;
            case 2:
                var file = prompt("Inserisci il percorso del file? ");
                exportFile(file, persone);
                break;
            case 3:
                var file = prompt("Inserisci il percorso del file? ");
                var word = prompt("Inserisci la parola da cercare? ");
                countWord(file, word);
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
