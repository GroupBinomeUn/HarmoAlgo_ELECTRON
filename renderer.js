// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {dialog} = require('electron').remote;
var serialize = require('serialize-javascript');

//dialog.showErrorBox('Erreur !', 'L\'application a rencontré une erreur. Votre ordinateur va s\'auto-détruire dans 10 secondes.');4


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
		var thePeople = new Peoples(lastId++, lastName, firstName, phone, city, postalCode, address);
		listPeoples.push(thePeople);
		
		document.querySelector('#dialog_deletePeople').style.display = "none";
		document.querySelector('#table_listPeoples').innerHTML = viewPeoples('table');
		
		clearAddPeople();
	}
}
function verifyAddPeople() {
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
	var idSelect = document.getElementById('select_listPeoples').value;
	
	if (idSelect != null) {
		var index = listPeoples.findIndex(obj => obj.id == idSelect);
		
		if (index >= 0) {
			listPeoples.splice(index, 1);
			listPeoples.slice(index + 1);
		}
	}	
	update();
}
function table_deletePeople(idTable) {
	if (idTable != null) {
		var index = listPeoples.findIndex(obj => obj.id == idTable);
		if (index >= 0) {
			listPeoples.splice(index, 1);
			listPeoples.slice(index + 1);
		}
	}
	update();
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
					var btnDel = '<svg title="Supprimer" onclick="table_deletePeople(' + listPeoples[people].getId + ');" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
					if(i%2 == 1){
						temp += "<tr class='tr__pair' ><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
					}
					else{
						temp += "<tr><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
					}
				}
			}
		}
	}
	else if (type == 'table') {
		temp += '<tr><td colspan="8" >...</td></tr>';
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
	document.querySelector('#list').scrollIntoView({
		behavior: 'smooth'
	});
	closeDialogDeletePeople();
}
function displayDialogDeletePeople() {
	document.querySelector('#select_listPeoples').innerHTML = viewPeoples('select');
	document.querySelector('#dialog_deletePeople').style.display = "block";
	document.querySelector('#list').scrollIntoView({
		behavior: 'smooth'
	});
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
	//deserialize(str, [context])
}
function saveFile(){
	var saveJSON = null;
	for(var people in listPeoples) { 
		if (listPeoples.hasOwnProperty(people)) {			
			var lePeople = new Peoples(listPeoples[people].getId, listPeoples[people].getLastName, listPeoples[people].getFirstName, listPeoples[people].getPhone, listPeoples[people].getCity, listPeoples[people].getPostalCode, listPeoples[people].getAddress);
			saveJSON += serialize(lePeople);
		}
	}
}

// ---------------//
// --- Search --- //
// ---------------//
function select_search(){
	document.querySelector('#txt-search').focus();
	document.querySelector('#nav').scrollIntoView({
		behavior: 'smooth'
	});
	closeDialogDeletePeople();
	closeDialogAddPeople();
	document.querySelector('#txt-search').focus();
}
function search(){	
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
							var btnDel = '<svg title="Supprimer" onclick="table_deletePeople(' + listPeoples[people].getId + ');" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
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
							var btnDel = '<svg title="Supprimer" onclick="table_deletePeople(' + listPeoples[people].getId + ');" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
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
							var btnDel = '<svg title="Supprimer" onclick="table_deletePeople(' + listPeoples[people].getId + ');" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
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
		}
		if(!i){
			temp += "<tr><td colspan='8' >...</td></tr>";
		}
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
	document.querySelector('#nav').scrollIntoView({
		behavior: 'smooth'
	});
}

// --- Menu --- //
document.addEventListener('DOMContentLoaded', update());
document.querySelector('#menu_loadFile').addEventListener('click', loadFile);
document.querySelector('#menu_saveFile').addEventListener('click', saveFile);
document.querySelector('#menu_addPeople').addEventListener('click', displayDialogAddPeople);
document.querySelector('#svg_addPeople').addEventListener('click', displayDialogAddPeople);
document.querySelector('#menu_deletePeople').addEventListener('click', displayDialogDeletePeople);
document.querySelector('#menu_close').addEventListener('click', closeApp);
document.querySelector('#up').addEventListener('click', home);

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
