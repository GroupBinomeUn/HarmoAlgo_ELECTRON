// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {dialog} = require('electron').remote;

//dialog.showErrorBox('Erreur !', 'L\'application a rencontré une erreur. Votre ordinateur va s\'auto-détruire dans 10 secondes.');

function setContact() {
	var lastName = document.getElementById('lastName').value;
	var firstName = document.getElementById('firstName').value;
	var phone = document.getElementById('phone').value;
	var city = document.getElementById('city').value;
	var postalCode = document.getElementById('postalCode').value;
	var address = document.getElementById('address').value;
	var thePeople = new Peoples(lastId++, lastName, firstName, phone, city, postalCode, address);
	listPeoples.push(thePeople);
	document.querySelector('#dialog').style.display = "none";
	viewPeoples();
}

function viewPeoples() {
	if(listPeoples.length >= 1) {
		var temp = "<tr><th>ID</th><th>Nom</th><th>Prenom</th><th>Téléphone</th><th>Ville</th><th>Code postal</th><th>Adresse</th><th></th></tr>";
		for(var index in listPeoples) { 
			if (listPeoples.hasOwnProperty(index)) {
				var btnDel = '<svg title="Supprimer" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
				temp += "<tr><td>" + listPeoples[index].getId +  "</td><td>" + listPeoples[index].getLastName + "</td><td>" + listPeoples[index].getFirstName + "</td><td>" + listPeoples[index].getPhone + "</td><td>" + listPeoples[index].getCity + "</td><td>" + listPeoples[index].getPostalCode + "</td><td>" + listPeoples[index].getAddress + "</td><td>" + btnDel + "</td></tr>";
			}
		}
		document.querySelector('#list_Peoples').innerHTML = temp;
	}
}

function addContact() {
	document.querySelector('#dialog').style.display = "block";
	document.querySelector('#list_Peoples').scrollTop;
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

document.addEventListener('DOMContentLoaded', viewPeoples);
document.querySelector('#addContact').addEventListener('click', addContact);
document.querySelector('#menu_addContact').addEventListener('click', addContact);
document.querySelector('#submit').addEventListener('click', setContact);
document.querySelector('#close').addEventListener('click', closeDialog);
document.querySelector('#close_app').addEventListener('click', closeApp);
document.querySelector('#load_file').addEventListener('click', loadFile);
document.querySelector('#save_file').addEventListener('click', saveFile);