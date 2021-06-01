// Definimos las constantes 
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const electron = require('electron');
const ip = require('ip');
const process = require('process');
let n_usuarios = 0;
const app = express();
const server = http.Server(app);










