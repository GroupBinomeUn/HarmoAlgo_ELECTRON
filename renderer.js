// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {dialog} = require('electron').remote;

//dialog.showErrorBox('Erreur !', 'L\'application a rencontré une erreur. Votre ordinateur va s\'auto-détruire dans 10 secondes.');

function addContact() {
	if (verifyAddPeople()) {
		var lastName = document.getElementById('lastName').value;
		var firstName = document.getElementById('firstName').value;
		var phone = document.getElementById('phone').value;
		var city = document.getElementById('city').value;
		var postalCode = document.getElementById('postalCode').value;
		var address = document.getElementById('address').value;
		var thePeople = new Peoples(lastId++, lastName, firstName, phone, city, postalCode, address);
		listPeoples.push(thePeople);
		document.querySelector('#dialog-add-contact').style.display = "none";
		document.querySelector('#list_Peoples').innerHTML = viewPeoples('table');
		clearAddContact();
	}
}

function clearAddContact() {
	document.getElementById('lastName').value = "";
	document.getElementById('lastName').style = "border-color:dark";
	document.getElementById('text_lastName').innerHTML = "";
	
	document.getElementById('firstName').value = "";
	document.getElementById('firstName').style = "border-color:dark";
	document.getElementById('text_firstName').innerHTML = "";
	
	document.getElementById('phone').value = "";
	document.getElementById('phone').style = "border-color:dark";
	document.getElementById('text_phone').innerHTML = "";	
	
	document.getElementById('city').value = "";
	document.getElementById('city').style = "border-color:dark";
	document.getElementById('text_city').innerHTML = "";
	
	document.getElementById('postalCode').value = "";
	document.getElementById('postalCode').style = "border-color:dark";
	document.getElementById('text_postalCode').innerHTML = "";
	
	document.getElementById('address').value = "";
	document.getElementById('address').style = "border-color:dark";
	document.getElementById('text_address').innerHTML = "";
}

function verifyAddPeople() {
	if (document.getElementById('lastName').value != "" && document.getElementById('firstName').value != "" && document.getElementById('phone').value != "" && document.getElementById('city').value != "" && document.getElementById('postalCode').value != "" && document.getElementById('address').value != "") {
		return true;
	}
	else {
		if (document.getElementById('lastName').value == "") {
			document.getElementById('lastName').style = "border-color:red";
			document.getElementById('text_lastName').innerHTML = "Veuillez rentrer un nom !";
		}
		else {
			document.getElementById('lastName').style = "border-color:dark";
			document.getElementById('text_lastName').innerHTML = "";	
		}
		
		if (document.getElementById('firstName').value == "") {
			document.getElementById('firstName').style = "border-color:red";
			document.getElementById('text_firstName').innerHTML = "Veuillez rentrer un prénom !";
		}
		else {
			document.getElementById('firstName').style = "border-color:dark";
			document.getElementById('text_firstName').innerHTML = "";	
		}
		
		if (document.getElementById('phone').value == "") {
			document.getElementById('phone').style = "border-color:red";
			document.getElementById('text_phone').innerHTML = "Veuillez rentrer un numéro de téléphone !";
		}
		else {
			document.getElementById('phone').style = "border-color:dark";
			document.getElementById('text_phone').innerHTML = "";	
		}
		
		if (document.getElementById('city').value == "") {
			document.getElementById('city').style = "border-color:red";
			document.getElementById('text_city').innerHTML = "Veuillez rentrer une ville !";
		}
		else {
			document.getElementById('city').style = "border-color:dark";
			document.getElementById('text_city').innerHTML = "";	
		}
		
		if (document.getElementById('postalCode').value == "" || document.getElementById('postalCode').length != 5) {
			document.getElementById('postalCode').style = "border-color:red";
			document.getElementById('text_postalCode').innerHTML = "Veuillez rentrer un code postal valide !";
		}
		else {
			document.getElementById('postalCode').style = "border-color:dark";
			document.getElementById('text_postalCode').innerHTML = "";	
		}
		
		if (document.getElementById('address').value == "") {
			document.getElementById('address').style = "border-color:red";
			document.getElementById('text_address').innerHTML = "Veuillez rentrer une adresse !";
		}
		else {
			document.getElementById('address').style = "border-color:dark";
			document.getElementById('text_address').innerHTML = "";
		}
	}
}

function update(){	
	document.querySelector('#list_Peoples').innerHTML = viewPeoples('table');
	document.querySelector('#list-contact-to-delete').innerHTML = viewPeoples('select');
}

function viewPeoples(type) {
	var i = 0;
	if(listPeoples.length >= 1) {
		var temp = "<tr><th>ID</th><th>Nom</th><th>Prenom</th><th>Téléphone</th><th>Ville</th><th>Code postal</th><th>Adresse</th><th></th></tr>";
		for(var index in listPeoples) { 
			if (listPeoples.hasOwnProperty(index)) {
				if(type == 'select'){
					temp += "<option value='" + listPeoples[index].getId + "' >" + listPeoples[index].getLastName + " " + listPeoples[index].getFirstName + " - " + listPeoples[index].getPhone + " - " + listPeoples[index].getCity + ", " + listPeoples[index].getPostalCode + " | " + listPeoples[index].getAddress + ".</option>";
				}
				else{
					var btnDel = '<svg title="Supprimer" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
					if(i%2 == 1){
						temp += "<tr class='tr__pair' ><td>" + listPeoples[index].getId +  "</td><td>" + listPeoples[index].getLastName + "</td><td>" + listPeoples[index].getFirstName + "</td><td>" + listPeoples[index].getPhone + "</td><td>" + listPeoples[index].getCity + "</td><td>" + listPeoples[index].getPostalCode + "</td><td>" + listPeoples[index].getAddress + "</td><td>" + btnDel + "</td></tr>";
					}
					else{
						temp += "<tr><td>" + listPeoples[index].getId +  "</td><td>" + listPeoples[index].getLastName + "</td><td>" + listPeoples[index].getFirstName + "</td><td>" + listPeoples[index].getPhone + "</td><td>" + listPeoples[index].getCity + "</td><td>" + listPeoples[index].getPostalCode + "</td><td>" + listPeoples[index].getAddress + "</td><td>" + btnDel + "</td></tr>";
					}
					i++;
				}
			}
		}
		return temp;
	}
}

function displayDialogAddContact() {
	clearAddContact();
	document.querySelector('#dialog-add-contact').style.display = "block";
	document.querySelector('#list').scrollIntoView({
		behavior: 'smooth'
	});
}

function displayDialogDelContact() {
	document.querySelector('#list-contact-to-delete').innerHTML = viewPeoples('select');
	document.querySelector('#dialog-del-contact').style.display = "block";
	document.querySelector('#list').scrollIntoView({
		behavior: 'smooth'
	});
}

function closeDialogAddContact() {
    document.querySelector('#dialog-add-contact').style.display = "none";
}

function closeDialogDelContact() {
    document.querySelector('#dialog-del-contact').style.display = "none";
}

function loadFile(){
    /* à terminer */
}

function saveFile(){
    /* à terminer */
}

function search(){
	var txt = document.querySelector('#txt-search');
	var type = document.querySelector('#list-search');

	txt.classList.remove('txt-search-error');
	txt.classList.add('txt-search-good');
	txt.style.border = "1px solid black";
	
	var i = 0;
	if(txt.value.trim() != ""){
		var select = type.options[type.selectedIndex].value;
		//dialog.showMessageBox({ message: 'Vous effectuez une recherche sur le mot ' + txt.value + ' de type ' + select, buttons: ["OK"] });
		var temp = "<tr><th>ID</th><th>Nom</th><th>Prenom</th><th>Téléphone</th><th>Ville</th><th>Code postal</th><th>Adresse</th><th></th></tr>";
		switch(select) {
			case "nom" :
				for(var index in listPeoples) {
					if (listPeoples.hasOwnProperty(index)){
						if(listPeoples[index].getLastName.toLowerCase().indexOf(txt.value.toLowerCase()) != -1){
							var btnDel = '<svg title="Supprimer" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
							if(i%2 == 1){
								temp += "<tr class='tr__pair' ><td>" + listPeoples[index].getId +  "</td><td>" + listPeoples[index].getLastName + "</td><td>" + listPeoples[index].getFirstName + "</td><td>" + listPeoples[index].getPhone + "</td><td>" + listPeoples[index].getCity + "</td><td>" + listPeoples[index].getPostalCode + "</td><td>" + listPeoples[index].getAddress + "</td><td>" + btnDel + "</td></tr>";
							}
							else{
								temp += "<tr><td>" + listPeoples[index].getId +  "</td><td>" + listPeoples[index].getLastName + "</td><td>" + listPeoples[index].getFirstName + "</td><td>" + listPeoples[index].getPhone + "</td><td>" + listPeoples[index].getCity + "</td><td>" + listPeoples[index].getPostalCode + "</td><td>" + listPeoples[index].getAddress + "</td><td>" + btnDel + "</td></tr>";
							}
							i++;
						}
					}
		
				}
				break;
			case "prenom" :
				for(var index in listPeoples) {
					if (listPeoples.hasOwnProperty(index)){
						if(listPeoples[index].getFirstName.toLowerCase().indexOf(txt.value.toLowerCase()) != -1){
							var btnDel = '<svg title="Supprimer" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
							if(i%2 == 1){
								temp += "<tr class='tr__pair' ><td>" + listPeoples[index].getId +  "</td><td>" + listPeoples[index].getLastName + "</td><td>" + listPeoples[index].getFirstName + "</td><td>" + listPeoples[index].getPhone + "</td><td>" + listPeoples[index].getCity + "</td><td>" + listPeoples[index].getPostalCode + "</td><td>" + listPeoples[index].getAddress + "</td><td>" + btnDel + "</td></tr>";
							}
							else{
								temp += "<tr><td>" + listPeoples[index].getId +  "</td><td>" + listPeoples[index].getLastName + "</td><td>" + listPeoples[index].getFirstName + "</td><td>" + listPeoples[index].getPhone + "</td><td>" + listPeoples[index].getCity + "</td><td>" + listPeoples[index].getPostalCode + "</td><td>" + listPeoples[index].getAddress + "</td><td>" + btnDel + "</td></tr>";
							}
							i++;
						}
					}
		
				}
				break;
			case "phone" :
				for(var index in listPeoples) {
					if (listPeoples.hasOwnProperty(index)){
						if(listPeoples[index].getPhone.toLowerCase().indexOf(txt.value.toLowerCase()) != -1){
							var btnDel = '<svg title="Supprimer" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
							if(i%2 == 1){
								temp += "<tr class='tr__pair' ><td>" + listPeoples[index].getId +  "</td><td>" + listPeoples[index].getLastName + "</td><td>" + listPeoples[index].getFirstName + "</td><td>" + listPeoples[index].getPhone + "</td><td>" + listPeoples[index].getCity + "</td><td>" + listPeoples[index].getPostalCode + "</td><td>" + listPeoples[index].getAddress + "</td><td>" + btnDel + "</td></tr>";
							}
							else{
								temp += "<tr><td>" + listPeoples[index].getId +  "</td><td>" + listPeoples[index].getLastName + "</td><td>" + listPeoples[index].getFirstName + "</td><td>" + listPeoples[index].getPhone + "</td><td>" + listPeoples[index].getCity + "</td><td>" + listPeoples[index].getPostalCode + "</td><td>" + listPeoples[index].getAddress + "</td><td>" + btnDel + "</td></tr>";
							}
							i++;
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
		document.querySelector('#list_Peoples').innerHTML = temp;
	}
	else{
		txt.focus();	
		txt.classList.add('txt-search-error');
		txt.classList.remove('txt-search-good');
		txt.style.border = "1px solid red";
		document.querySelector('#list_Peoples').innerHTML = viewPeoples('table');
	}
}

function select_search(){
	document.querySelector('#txt-search').focus();
	document.querySelector('#nav').scrollIntoView({
		behavior: 'smooth'
	});
}

function closeApp(){
    window.close();
}

document.addEventListener('DOMContentLoaded', update());
document.querySelector('#close_app').addEventListener('click', closeApp);
document.querySelector('#load_file').addEventListener('click', loadFile);
document.querySelector('#save_file').addEventListener('click', saveFile);

//Add People
document.querySelector('#btn_addPeople').addEventListener('click', addContact);
document.querySelector('#svg_addContact').addEventListener('click', displayDialogAddContact);
document.querySelector('#close-add-dialog').addEventListener('click', closeDialogAddContact);
document.querySelector('#menu_addPeople').addEventListener('click', displayDialogAddContact);
document.querySelector('#btn_clearAddPeople').addEventListener('click', clearAddContact);

//Delete People
document.querySelector('#btn_deletePeople').addEventListener('click', displayDialogDelContact);
document.querySelector('#close-del-dialog').addEventListener('click', closeDialogDelContact);

//Search
document.querySelector('#txt-search').addEventListener('keyup', search);
document.querySelector('#list-search').addEventListener('change', search);
document.querySelector('#search_list').addEventListener('click', select_search);