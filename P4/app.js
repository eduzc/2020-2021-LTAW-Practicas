const io = require('socket.io-client');
const socket = io('http://localhost:9000');
const v_node = document.getElementById("info1");
const v_chrome = document.getElementById("info2");
const v_electron = document.getElementById("info3");

