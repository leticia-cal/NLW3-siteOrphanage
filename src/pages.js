/*
const orphanages = require('./database/fakedata');
const Database = require('./database/db');
Não usa mais o require por conta do type: module no package.json
*/

import Database from "./database/db.js";
import { saveOrphanage } from "./database/saveOrphanage.js";

//Não usa mais o module.exports = { index() ... } por conta do type: module no package.json

export function index(req, res) {

  /*
  __dirname = retorna o meu diretorio atual , ou seja, c:/nlw/src
  path.join() = faz o caminho do diretorio para vc de acordo com os argumentos que vc passar
  sendFile = invoca o arquivo de acordo com o seu caminho

  return response.sendFile(path.join(__dirname, "views", "index.html")); // C:\nlw\src\views\index.html
  */

  return res.render("index");
};

export async function orphanage(req, res) {
  const id = req.query.id; //pega o id do orfanato pela query da requisição
  try {
    //passar o banco
    const db = await Database;
    const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`);
    const orphanage = results[0];

    orphanage.images = orphanage.images.split(","); //transforma as strings de imagens em um array toda vez que achar ","
    orphanage.firstImage = orphanage.images[0]; //pega só a primeira imagem do array

    if(orphanage.open_on_weekends == "0"){
      orphanage.open_on_weekends = false;
    } else {
      orphanage.open_on_weekends = true;
    }

    return res.render("orphanage", { orphanage });
  } catch (error) {
    console.log(error);
    res.send("Erro no banco de dados");
  }
};

export async function orphanages(req, res) {
  try {
    //passar o {orphanages} pelo banco
    const db = await Database;
    const orphanages = await db.all("SELECT * FROM orphanages");
    return res.render("orphanages", { orphanages });
  } catch (error) {
    console.log(error);
    res.send('Erro no banco de dados!');
  }
};

export function createOrphanage(req, res) {
  return res.render("create-orphanage");
};

export async function saveFormOrphanage(req, res){
  console.log(req.body);
  const fields = req.body;

  //validar se todos os campos estão preenchidos
  if(Object.values(fields).includes('')){
    return res.send('Todos os campos devem estar preenchidos!');
  }

  try {
    //salvar um orfanato
    const db = await Database;
    await saveOrphanage(db, {
      lat: fields.lat,
      lng: fields.lng,
      name: fields.name,
      about: fields.about,
      whatsapp: fields.whatsapp,
      images: fields.images.toString(),
      instructions: fields.instructions,
      opening_hours: fields.opening_hours,
      open_on_weekends: fields.open_on_weekends
    })
    
    //redirecionamento
    return res.redirect("orphanages");
  } catch (error) {
    console.log(error);
    return res.send("Erro no banco de dados");
  }

};