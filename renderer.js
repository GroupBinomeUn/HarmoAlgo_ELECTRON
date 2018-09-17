// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {dialog} = require('electron').remote;

//dialog.showErrorBox('Erreur !', 'L\'application a rencontré une erreur. Votre ordinateur va s\'auto-détruire dans 10 secondes.');

function setContact() {
    /* à terminer */
}

function addContact() {
    document.querySelector('#dialog').style.display = "block";
}

function closeDialog() {
    document.querySelector('#dialog').style.display = "none";
}

function loadFile(){
    /* à terminer */
    dialog.showErrorBox('Erreur !', 'L\'application a rencontré une erreur. Votre ordinateur va s\'auto-détruire dans 10 secondes.');
}

function saveFile(){
    /* à terminer */
    dialog.showErrorBox('Erreur !', 'L\'application a rencontré une erreur. Votre ordinateur va s\'auto-détruire dans 10 secondes.');
}

function closeApp(){
    window.close();
}

document.querySelector('#addContact').addEventListener('click', addContact);
document.querySelector('#submit').addEventListener('click', setContact);
document.querySelector('#close').addEventListener('click', closeDialog);
document.querySelector('#close_app').addEventListener('click', closeApp);
document.querySelector('#load_file').addEventListener('click', loadFile);
document.querySelector('#save_file').addEventListener('click', saveFile);