// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {dialog} = require('electron').remote;
var serialize = require('serialize-to-js').serialize;
var deserialize = require('serialize-to-js').deserialize;
var fs = require('fs');

// --- DEB. jeu d'essai --- //
var lePeople = new People("1", "George", "Pompidou", "0554684548", "Paris", "75000", "15 rue des Mimosa");
var lePeople2 = new People("2", "Dumas", "François", "0555454875", "Paris", "75000", "5 rue des Mimosa");
var lePeople3 = new People("3", "Jean-Paul", "Rustre", "0555445875", "Paris", "75000", "2 rue des Mimosa");
var lePeople4 = new People("4", "Jean", "Tapis", "0555884525", "Paris", "75000", "10 rue des Mimosa");
var lePeople5 = new People("5", "Bernard", "Check", "0556987425", "Paris", "75000", "44 rue des Mimosa");
var lePeople6 = new People("6", "Pauline", "Dumond", "0525458545", "Paris", "75000", "8 rue des Mimosa");
var lePeople7 = new People("7", "Mélanie", "Math", "0554875421", "Paris", "75000", "9 rue des Mimosa");
var lePeople8 = new People("8", "Kévin", "Dupont", "0554215487", "Paris", "75000", "16 rue des Mimosa");
var lePeople9 = new People("9", "Carine", "Fougare", "0545487544", "Paris", "75000", "28 rue des Mimosa");
var lePeople10 = new People("10", "Eric", "Montier", "0102030405", "Paris", "75000", "12 rue des Mimosa");

listPeoples.push(lePeople, lePeople2, lePeople3, lePeople4, lePeople5, lePeople6, lePeople7, lePeople8, lePeople9, lePeople10);
// --- FIN. jeu d'essai --- //




// --------------------------//
// --- Dialog Add People --- //
// --------------------------//
function addPeople() {
	if (verifyAddPeople()) {
		var lastName = document.querySelector('#lastName').value;
		var firstName = document.querySelector('#firstName').value;
		var phone = document.querySelector('#phone').value;
		var city = document.querySelector('#city').value;
		var postalCode = document.querySelector('#postalCode').value;
		var address = document.querySelector('#address').value;
		var leContact = new People(lastId++, lastName, firstName, phone, city, postalCode, address);
		listPeoples.push(leContact);
		
		document.querySelector('#dialog_deletePeople').style.display = "none";
		document.querySelector('#table_listPeoples').innerHTML = viewPeoples('table');
		
		clearAddPeople();
	}
}
function verifyAddPeople() {	
	//###>>>bug lors de l'ajout d'un +-*/... dans le codePostal ou le phone. Cela affiche une erreur sur les deux même si une seule entrée est fausse !!!
	if (document.querySelector('#lastName').value != "" && document.querySelector('#firstName').value != "" && document.querySelector('#phone').value != "" && document.querySelector('#city').value != "" && document.querySelector('#postalCode').value != "" && document.querySelector('#address').value != "") {
		return true;
	}
	else {
		if (document.querySelector('#lastName').value == "") {
			document.querySelector('#lastName').style = "border-color:red";
			document.querySelector('#text_lastName').innerHTML = "Veuillez rentrer un nom !";
		}
		else {
			document.querySelector('#lastName').style = "border-color:dark";
			document.querySelector('#text_lastName').innerHTML = "";	
		}
		
		if (document.querySelector('#firstName').value == "") {
			document.querySelector('#firstName').style = "border-color:red";
			document.querySelector('#text_firstName').innerHTML = "Veuillez rentrer un prénom !";
		}
		else {
			document.querySelector('#firstName').style = "border-color:dark";
			document.querySelector('#text_firstName').innerHTML = "";	
		}
		
		if (document.querySelector('#phone').value == "") {
			document.querySelector('#phone').style = "border-color:red";
			document.querySelector('#text_phone').innerHTML = "Veuillez rentrer un numéro de téléphone !";
		}
		else {
			document.querySelector('#phone').style = "border-color:dark";
			document.querySelector('#text_phone').innerHTML = "";
		}
		
		if (document.querySelector('#city').value == "") {
			document.querySelector('#city').style = "border-color:red";
			document.querySelector('#text_city').innerHTML = "Veuillez rentrer une ville !";
		}
		else {
			document.querySelector('#city').style = "border-color:dark";
			document.querySelector('#text_city').innerHTML = "";
		}
		
		if (document.querySelector('#postalCode').value == "" || document.querySelector('#postalCode').length != 5) {
			document.querySelector('#postalCode').style = "border-color:red";
			document.querySelector('#text_postalCode').innerHTML = "Veuillez rentrer un code postal valide !";
		}
		else {
			document.querySelector('#postalCode').style = "border-color:dark";
			document.querySelector('#text_postalCode').innerHTML = "";
		}
		
		if (document.querySelector('#address').value == "") {
			document.querySelector('#address').style = "border-color:red";
			document.querySelector('#text_address').innerHTML = "Veuillez rentrer une adresse !";
		}
		else {
			document.querySelector('#address').style = "border-color:dark";
			document.querySelector('#text_address').innerHTML = "";
		}
	}
}
function clearAddPeople() {
	document.querySelector('#lastName').value = "";
	document.querySelector('#lastName').style = "border-color:dark";
	document.querySelector('#text_lastName').innerHTML = "";
	
	document.querySelector('#firstName').value = "";
	document.querySelector('#firstName').style = "border-color:dark";
	document.querySelector('#text_firstName').innerHTML = "";
	
	document.querySelector('#phone').value = "";
	document.querySelector('#phone').style = "border-color:dark";
	document.querySelector('#text_phone').innerHTML = "";	
	
	document.querySelector('#city').value = "";
	document.querySelector('#city').style = "border-color:dark";
	document.querySelector('#text_city').innerHTML = "";
	
	document.querySelector('#postalCode').value = "";
	document.querySelector('#postalCode').style = "border-color:dark";
	document.querySelector('#text_postalCode').innerHTML = "";
	
	document.querySelector('#address').value = "";
	document.querySelector('#address').style = "border-color:dark";
	document.querySelector('#text_address').innerHTML = "";
}


// -----------------------------//
// --- Dialog Delete People --- //
// -----------------------------//
function select_deletePeople() {
	var idSelect = document.querySelector('#select_listPeoples').value;
	
	if (idSelect != null) {
		var index = listPeoples.findIndex(obj => obj.id == idSelect);
		
		if (index >= 0) {
			listPeoples.splice(index, 1);
			listPeoples.slice(index + 1);
		}
	}	

	autoCloseDialogDeletePeople();
	update();
}
function table_deletePeople() {
	index = this.id;
	console.log("Supprimer le:" + index);
	if (index >= 0) {
		listPeoples.splice(index, 1);
	}

	autoCloseDialogDeletePeople();
	update();
	//###>>>créer un liste temp pour la recherche afin d'autoriser la suppression
}
function autoCloseDialogDeletePeople(){
	if(!listPeoples.length){
		closeDialogDeletePeople()
	}
}


// ----------------------//
// --- Table Peoples --- //
// ----------------------//
function viewPeoples(type) {
	var i = 0;
	if (type == 'table') {
		var temp = '<tr><th>Position</th><th>Nom</th><th>Prenom</th><th>Téléphone</th><th>Ville</th><th>Code postal</th><th>Adresse</th><th></th></tr>';
	}
	if(listPeoples.length >= 1) {
		for(var people in listPeoples) { 
			if (listPeoples.hasOwnProperty(people)) {
				if(type == 'select'){
					temp += "<option value='" + listPeoples[people].getId + "' >" + listPeoples[people].getLastName + " " + listPeoples[people].getFirstName + " - " + listPeoples[people].getPhone + " - " + listPeoples[people].getCity + ", " + listPeoples[people].getPostalCode + " | " + listPeoples[people].getAddress + ".</option>";
				}
				else{
					i++;
					var btnDel = '<svg title="Supprimer" id="' + (i-1) + '" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
					if(i%2 == 1){
						temp += "<tr class='tr__pair' ><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
					}
					else{
						temp += "<tr><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
					}
				}
			}
		}
		temp += '<tr class="btn_tr_addPeople" id="svg_addPeople" title="Ajouter un contact" ><td colspan="8" ><svg class="icon icon-user-plus add"><use xlink:href="#icon-user-plus"></use></svg></td></tr>';
	}
	else if (type == 'table') {
		temp += '<tr><td colspan="8" >...</td></tr>' + 
				'<tr class="btn_tr_addPeople" id="svg_addPeople" title="Ajouter un contact" ><td colspan="8" ><svg class="icon icon-user-plus add"><use xlink:href="#icon-user-plus"></use></svg></td></tr>';
	}
	else if (type == 'select') {
		temp = '<option value="null" disabled selected >...</option>';
	}

	return temp;
}


// ---------------//
// --- Update --- //
// ---------------//
function update(){	
	document.querySelector('#table_listPeoples').innerHTML = viewPeoples('table');
	document.querySelector('#select_listPeoples').innerHTML = viewPeoples('select');
}


// ------------------------//
// ---- Display Dialog --- //
// ------------------------//
function displayDialogAddPeople() {
	clearAddPeople();
	document.querySelector('#dialog_addPeople').style.display = "block";
	closeDialogDeletePeople();
}
function displayDialogDeletePeople() {
	document.querySelector('#select_listPeoples').innerHTML = viewPeoples('select');
	document.querySelector('#dialog_deletePeople').style.display = "block";
	closeDialogAddPeople();
}


// ---------------------//
// --- Close Dialog --- //
// ---------------------//
function closeDialogAddPeople() {
    document.querySelector('#dialog_addPeople').style.display = "none";
}
function closeDialogDeletePeople() {
    document.querySelector('#dialog_deletePeople').style.display = "none";
}


// -------------//
// ---Files --- //
// -------------//
function loadFile(){
	var jsonFile = dialog.showOpenDialog({properties: ['openFile'], filters: [{ name: 'Json', extensions: ['json']}]}, function (fileNames) {
		if (fileNames === undefined) return;
		var fileName = fileNames[0];
		var file = fs.readFileSync(fileName, 'utf-8');

		var jsonFile = deserialize(file);

		for (var i = 0; i < jsonFile.length; i++) {
			var thePeople = new People(lastId++, jsonFile[i].lastName, jsonFile[i].firstName, jsonFile[i].phone, jsonFile[i].city, jsonFile[i].postalCode, jsonFile[i].address);
			listPeoples.push(thePeople);
		}
		update();
	});
}

function saveFile(){
	var file_path = dialog.showSaveDialog({properties: ['saveFile'], filters: [{ name: 'Json', extensions: ['json']}]});

	if(file_path) {
		file = [serialize(listPeoples)];
		fs.writeFile(file_path, file, function (err) {
			dialog.showMessageBox({title: "Sauvegarde", message: "Fichier sauvegardé ! 🦄", buttons: ["OK"] });
		});
	}
}

// ---------------//
// --- Search --- //
// ---------------//
function select_search(){
	document.querySelector('#txt-search').focus();
	document.querySelector('#list').scrollIntoView({
		behavior: 'smooth'
	});
	closeDialogDeletePeople();
	closeDialogAddPeople();
	document.querySelector('#txt-search').focus();
}
function search(){	
	//###>>>if change for number tip reload the search_txt and delete if not number type !!!???
	closeDialogDeletePeople();
	closeDialogAddPeople();

	var txt = document.querySelector('#txt-search');
	var type = document.querySelector('#list-search');

	txt.classList.remove('txt-search-error');
	txt.classList.add('txt-search-good');
	txt.style.border = "1px solid #6692ff";
	
	var i = 0;
	if(txt.value.trim() != ""){
		var select = type.options[type.selectedIndex].value;
		var temp = "<tr><th>Position</th><th>Nom</th><th>Prenom</th><th>Téléphone</th><th>Ville</th><th>Code postal</th><th>Adresse</th><th></th></tr>";
		switch(select) {
			case "nom" :
				for(var people in listPeoples) {
					if (listPeoples.hasOwnProperty(people)){
						if(listPeoples[people].getLastName.toLowerCase().indexOf(txt.value.toLowerCase()) != -1){
							i++;
							var btnDel = '<svg title="Supprimer" id="' + (i-1) + '" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
							if(i%2 == 1){
								temp += "<tr class='tr__pair' ><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
							}
							else{
								temp += "<tr><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
							}
						}
					}
		
				}
				break;
			case "prenom" :
				for(var people in listPeoples) {
					if (listPeoples.hasOwnProperty(people)){
						if(listPeoples[people].getFirstName.toLowerCase().indexOf(txt.value.toLowerCase()) != -1){
							i++;
							var btnDel = '<svg title="Supprimer" id="' + (i-1) + '" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
							if(i%2 == 1){
								temp += "<tr class='tr__pair' ><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
							}
							else{
								temp += "<tr><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
							}
						}
					}
		
				}
				break;
			case "phone" :
				for(var people in listPeoples) {
					if (listPeoples.hasOwnProperty(people)){
						if(listPeoples[people].getPhone.toLowerCase().indexOf(txt.value.toLowerCase()) != -1){
							i++;
							var btnDel = '<svg title="Supprimer" id="' + (i-1) + '" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
							if(i%2 == 1){
								temp += "<tr class='tr__pair' ><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
							}
							else{
								temp += "<tr><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
							}
						}
					}		
				}
				break;
			default:
				temp += "<tr><td colspan='8' >...</td></tr>";
				break;
		}
		if(!i){
			temp += "<tr><td colspan='8' >...</td></tr>";
		}
		temp += '<tr class="btn_tr_addPeople" id="svg_addPeople" title="Ajouter un contact" ><td colspan="8" ><svg class="icon icon-user-plus add"><use xlink:href="#icon-user-plus"></use></svg></td></tr>';
		document.querySelector('#table_listPeoples').innerHTML = temp;
	}
	else{
		txt.focus();	
		txt.classList.add('txt-search-error');
		txt.classList.remove('txt-search-good');
		txt.style.border = "1px solid #ff2929";
		document.querySelector('#table_listPeoples').innerHTML = viewPeoples('table');
	}
}
function reloadSearchBar(){	
	var txt = document.querySelector('#txt-search');

	txt.classList.remove('txt-search-error');
	txt.classList.add('txt-search-good');
	txt.style.border = "1px solid #6692ff";
}


// --------------//
// --- Close --- //
// --------------//
function closeApp(){
    window.close();
}

// -------------//
// --- Home --- //
// -------------//
function home(){
	document.querySelector('#list').scrollIntoView({
		behavior: 'smooth'
	});
}
function eraseSearch(){
	document.querySelector('#txt-search').value = "";
	//document.querySelector('#txt-search').focus();
	document.querySelector('#table_listPeoples').innerHTML = viewPeoples('table');
}
function enterInTheNewWorld(){
	document.querySelector('#list').scrollIntoView({
		behavior: 'smooth'
	});
}

// --- Menu --- //
document.addEventListener('DOMContentLoaded', update());
document.querySelector('#menu_loadFile').addEventListener('click', loadFile);
document.querySelector('#menu_saveFile').addEventListener('click', saveFile);
document.querySelector('#menu_addPeople').addEventListener('click', displayDialogAddPeople);
document.querySelector('#menu_deletePeople').addEventListener('click', displayDialogDeletePeople);
document.querySelector('#menu_close').addEventListener('click', closeApp);
document.querySelector('#up').addEventListener('click', home);
document.querySelector('#btn_eraseSearch').addEventListener('click', eraseSearch);
document.querySelector('#first-main').addEventListener('click', enterInTheNewWorld);

// --- Dialog - Add People --- //
document.querySelector('#btn_addPeople').addEventListener('click', addPeople);
document.querySelector('#close_dialogAddPeople').addEventListener('click', closeDialogAddPeople);
document.querySelector('#btn_clearAddPeople').addEventListener('click', clearAddPeople);

// --- Dialog - Delete People --- //
document.querySelector('#btn_deletePeople').addEventListener('click', select_deletePeople);
document.querySelector('#close_dialogDeletePeople').addEventListener('click', closeDialogDeletePeople);

// --- Search --- //
document.querySelector('#menu_searchList').addEventListener('click', select_search);
document.querySelector('#txt-search').addEventListener('keyup', search);
document.querySelector('#txt-search').addEventListener('click', search);
document.querySelector('#txt-search').addEventListener('blur', reloadSearchBar);
document.querySelector('#list-search').addEventListener('change', search);

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