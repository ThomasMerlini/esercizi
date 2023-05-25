const fs = require('fs');
const prompt = require('prompt-sync')();

class Persona {
  #nome;
  #cognome;
  #dataDiNascita;

  constructor(nome, cognome, dataDiNascita) {
    this.nome = nome;
    this.cognome = cognome;
    this.dataDiNascita = dataDiNascita;
  }

  get nome() {
    return this.#nome;
  }

  set nome(nuovoNome) {
    this.#nome = nuovoNome;
  }

  get cognome() {
    return this.#cognome;
  }

  set cognome(nuovoCognome) {
    this.#cognome = nuovoCognome;
  }

  get dataDiNascita() {
    return this.#dataDiNascita;
  }

  set dataDiNascita(nuovaData) {
    this.#dataDiNascita = nuovaData;
  }

  stampaNomeCompleto() {
    return this.cognome + " " + this.nome;
  }

  stampaEta() {
    let dataOdierna = new Date();
    let eta = dataOdierna.getFullYear() - this.dataDiNascita.getFullYear()
    if (dataOdierna.getMonth() <= this.dataDiNascita.getMonth()) {
      if (dataOdierna.getDate() < this.dataDiNascita.getDate()) {
        eta--;
      }
    }
    return eta;
  }

  stampaDataDiNascita() {
    return this.dataDiNascita.toLocaleDateString();
  }

  ToString() {
    return `Nome e cognome: ${this.stampaNomeCompleto()}\n` +
      `Data di nascità: ${this.stampaDataDiNascita()}\n` +
      `Età: ${this.stampaEta()}\n`
  }
}

function readCSV() {
  let data;
  try {
    data = fs.readFileSync(path, "utf8")
  } catch (err) {
    console.error(err);
  }
  data = data.split(/\r?\n/);
  data.splice(0, 1);
  // console.log(data);

  for (let i = 0; i < data.length; i++) {
    var riga = data[i].split(",");
    var dataDiNascita = riga[2].split("/");
    var date = new Date(parseInt(dataDiNascita[2]), parseInt(dataDiNascita[1]) - 1, parseInt(dataDiNascita[0]));
    var persona = new Persona(riga[0], riga[1], date);
    persone.push(persona);
  }

  print();
}

function print() {
  for (let i = 0; i < persone.length; i++) {
    console.log("Persona " + (i + 1) + ":\n");
    console.log(persone[i].ToString());
  }
}

function writeCSV() {
  var csv = "Nome,Cognome,Data\r\n";
  for (let i = 0; i < persone.length; i++) {
    var year = persone[i].dataDiNascita.getFullYear();
    var month = persone[i].dataDiNascita.getMonth()+1;
    var day = persone[i].dataDiNascita.getDate();
    var name = persone[i].nome;
    var surname = persone[i].cognome;

    // console.log(year+" "+month+" "+day)

    var date = day + "/" + month + "/" + year;
    let data = `${name},${surname},${date}`;
    if (i==persone.length-1){
      csv += data;
    }else{
      csv += data+"\r\n";
    }
  }
  try {
    fs.writeFileSync(path, csv, { flag: 'w+' });
    // file written successfully
  } catch (err) {
    console.error(err);
  }
}

function create() {
  var name = prompt("Qual'è il tuo nome? ");
  var surname = prompt("Qual'è il tuo cognome? ");

  var date = prompt("Qual'è la tua data di nascità? Usando questo formato (dd/mm/yyyy). ");
  date = date.split("/");
  var day = date[0];
  var month = date[1];
  var year = date[2];
  date = new Date(parseInt(year), parseInt(month)-1, parseInt(day));
  var persona = new Persona(name, surname, date);
  persone.push(persona);
}

const path = "./src/persone - Foglio1.csv";
const persone = [];

readCSV();

create();

print();

writeCSV();
