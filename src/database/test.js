/*
Não usa mais o require por conta do type: module no package.json
const Database = require('./database/db');
const saveOrphanage = require("./saveOrphanage");
*/
import Database from "./db.js"; //importar dependencia
import { saveOrphanage } from "./saveOrphanage.js";

Database.then(async (db) => {
  //Inserir dados da tabela
  await saveOrphanage(db, {
    name: "Lar de teste",
    lat: "-27.222633",
    lng: "-49.6555874",
    about:
      "Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.",
    whatsapp: "18981777966",
    images: [
      "https://images.unsplash.com/photo-1502307100811-6bdc0981a85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=378&q=80",

      "https://images.unsplash.com/photo-1511551203524-9a24350a5771?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",

      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1138&q=80",

      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",

      "https://images.unsplash.com/photo-1477511614005-61bd8b91d218?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",

      "https://images.unsplash.com/photo-1469406396016-013bfae5d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    ].toString(),
    instructions:
      "Venha como se sentir a vontade e traga muito amor e paciência para dar.",
    opening_hours: "Horário de visitas Das 8h até 19h",
    open_on_weekends: "0",
  });

  //Consultar dados da tabela
  const selectedOrphanages = await db.all("SELECT * FROM orphanages");
  console.log(selectedOrphanages);

  //Consultar orfanato apenas pelo ID
  /*const orphanage = await db.all('SELECT * FROM orphanages WHERE id = "3"');
  console.log(orphanage);*/

  //Deletar dado da tabela
  //console.log(await db.run("DELETE FROM orphanages WHERE id='3'"));
});
