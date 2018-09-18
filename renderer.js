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
	document.querySelector('.dialog').style.display = "none";
	
	document.querySelector('#list_Peoples').innerHTML = viewPeoples('table');
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
					temp += "<option value='" + listPeoples[index].getId + "' >" + listPeoples[index].getLastName + " " + listPeoples[index].getFirstName + " " + listPeoples[index].getPhone + " " + listPeoples[index].getCity + " " + listPeoples[index].getPostalCode + " " + listPeoples[index].getAddress + "</option>";
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
    dialog.showErrorBox('Erreur !', 'L\'application a rencontré une erreur. Votre ordinateur va s\'auto-détruire dans 10 secondes.');
}

function saveFile(){
    /* à terminer */
    dialog.showErrorBox('Erreur !', 'L\'application a rencontré une erreur. Votre ordinateur va s\'auto-détruire dans 10 secondes.');
}

function search(){
	var txt = document.querySelector('#txt-search');
	var type = document.querySelector('#list-search');

	txt.classList.remove('txt-search-error');
	txt.classList.add('txt-search-good');

	if(txt.value.trim() != ""){
		dialog.showMessageBox({ message: 'Vous effectuez une recherche sur le mot ' + txt.value + ' de type ' + type.options[type.selectedIndex].text, buttons: ["OK"] });
	}
	else{
		txt.focus();	
		txt.classList.add('txt-search-error');
		txt.classList.remove('txt-search-good');
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
document.querySelector('#submit').addEventListener('click', setContact);
document.querySelector('#close_app').addEventListener('click', closeApp);
document.querySelector('#load_file').addEventListener('click', loadFile);
document.querySelector('#save_file').addEventListener('click', saveFile);

//add contact
document.querySelector('#addContact').addEventListener('click', displayDialogAddContact);
document.querySelector('#close-add-dialog').addEventListener('click', closeDialogAddContact);
document.querySelector('#menu_addContact').addEventListener('click', displayDialogAddContact);

//del contact
document.querySelector('#del_contact').addEventListener('click', displayDialogDelContact);
document.querySelector('#close-del-dialog').addEventListener('click', closeDialogDelContact);

//recherche
document.querySelector('#sub-search').addEventListener('click', search);
document.querySelector('#serach_list').addEventListener('click', select_search);