/*
Não usa mais o require por conta do type: module no package.json
const express = require('express');
const path = require('path');
*/

//Importar dependencias
import express from "express";
import path from "path"; //ajuda na navegação de diretório colocando a barra certa de acordo com o S.O
import { createOrphanage, index, orphanage, orphanages, saveFormOrphanage } from "./pages.js";
/*
diretorio no windows é com "\" => c:\nlw\src
diretorio no mac e linux é com "/" => c:/nlw/src
*/

//Iniciando o express
const server = express();

server
  //Utilizar o req do body
  .use(express.urlencoded({ extended: true }))
  
  //Utilizando os arquivos estáticos (imagens, css, javascript)
  .use(express.static("public"))

  //Configurar template engine
  .set("views", path.join(path.dirname("src/server.js"), "/views"))
  .set("view engine", "hbs")

  //Rotas da aplicação
  .get("/", index)
  .get("/orphanage", orphanage)
  .get("/orphanages", orphanages)
  .get("/create-orphanage", createOrphanage)
  .post("/save-orphanage", saveFormOrphanage)

//Ligar o servidor na porta 5500
server.listen(5500);
