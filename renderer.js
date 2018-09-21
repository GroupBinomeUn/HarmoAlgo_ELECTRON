// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {dialog} = require('electron').remote;
var serialize = require('serialize-to-js').serialize;
var deserialize = require('serialize-to-js').deserialize;
var fs = require('fs');

// --- DEB. jeu d'essai --- //
var lePeople = new People("1", "Pompidou", "George", "0554684548", "Paris", "75000", "15 rue des Mimosa");
var lePeople2 = new People("2", "François", "Dumas", "0555454875", "Paris", "75000", "5 rue des Mimosa");
var lePeople3 = new People("3", "Rustre", "Jean-Paul", "0555445875", "Paris", "75000", "2 rue des Mimosa");
var lePeople4 = new People("4", "Tapis", "Jean", "0555884525", "Paris", "75000", "10 rue des Mimosa");
var lePeople5 = new People("5", "Check", "Bernard", "0556987425", "Paris", "75000", "44 rue des Mimosa");
var lePeople6 = new People("6", "Dumond", "Pauline", "0525458545", "Paris", "75000", "8 rue des Mimosa");
var lePeople7 = new People("7", "Math", "Mélanie", "0554875421", "Paris", "75000", "9 rue des Mimosa");
var lePeople8 = new People("8", "Dupont", "Kévin", "0554215487", "Paris", "75000", "16 rue des Mimosa");
var lePeople9 = new People("9", "Fougare", "Carine", "0545487544", "Paris", "75000", "28 rue des Mimosa");
var lePeople10 = new People("10", "Montier", "Eric", "0102030405", "Paris", "75000", "12 rue des Mimosa");

listPeoples.push(lePeople, lePeople2, lePeople3, lePeople4, lePeople5, lePeople6, lePeople7, lePeople8, lePeople9, lePeople10);
// --- FIN. jeu d'essai --- //

// --- Exit --- //
function closeApp(){
    window.close();
}


// --- Home Scroll --- //
function enterInTheNewWorld(){
	document.querySelector('#list').scrollIntoView({
		behavior: 'smooth'
	});
}

// --- Address Book -- //
document.querySelector('#first_main').addEventListener('click', enterInTheNewWorld);

// --- Menu --- //
document.addEventListener('DOMContentLoaded', update());
document.querySelector('#up').addEventListener('click', enterInTheNewWorld);
document.querySelector('#menu_loadFile').addEventListener('click', loadFile);
document.querySelector('#menu_saveFile').addEventListener('click', saveFile);
document.querySelector('#menu_addPeople').addEventListener('click', displayDialogAddPeople);
document.querySelector('#menu_searchList').addEventListener('click', select_search);
document.querySelector('#menu_deletePeople').addEventListener('click', displayDialogDeletePeople);
document.querySelector('#menu_close').addEventListener('click', closeApp);

// --- Dialog - Add People --- //
document.querySelector('#btn_addPeople').addEventListener('click', addPeople);
document.querySelector('#close_dialogAddPeople').addEventListener('click', closeDialogAddPeople);
document.querySelector('#btn_clearAddPeople').addEventListener('click', clearAddPeople);

// --- Dialog - Delete People --- //
document.querySelector('#btn_deletePeople').addEventListener('click', select_deletePeople);
document.querySelector('#close_dialogDeletePeople').addEventListener('click', closeDialogDeletePeople);

// --- Search --- //
document.querySelector('#list_search').addEventListener('change', search);
document.querySelector('#txt_search').addEventListener('keyup', search);
document.querySelector('#txt_search').addEventListener('click', search);
document.querySelector('#txt_search').addEventListener('blur', reloadSearchBar);
document.querySelector('#btn_eraseSearch').addEventListener('click', eraseSearch);

// --- multiple BTN --- //
/**
 * Méthodes pour mettre à jour/actualiser les boutons.
 * Le code HTML étant update par le javascript, on a besoin de mettre à jour le querySelectorAll
 * pour pouvoir lister tous les boutons qui possédes le même #id>html.	
 */
function reloadBtnArray(){
	var btnDisplayAddContactDialog = document.querySelectorAll('#svg_addPeople')
	for(var i = 0; i < btnDisplayAddContactDialog.length; i++) {
		btnDisplayAddContactDialog[i].addEventListener('click', displayDialogAddPeople);
	}
	
	var btnDeleteThisContact = document.querySelectorAll('.bin')
	for(var i = 0; i < btnDeleteThisContact.length; i++) {
		btnDeleteThisContact[i].addEventListener('click', table_deletePeople);
	}
}

setInterval(reloadBtnArray, 10);