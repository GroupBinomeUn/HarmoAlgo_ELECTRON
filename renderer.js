// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {dialog} = require('electron').remote;

//dialog.showErrorBox('Erreur !', 'L\'application a rencontré une erreur. Votre ordinateur va s\'auto-détruire dans 10 secondes.');4


// --------------------------//
// --- Dialog Add People --- //
// --------------------------//
function addPeople() {
	if (verifyAddPeople()) {
		var lastName = document.getElementById('lastName').value;
		var firstName = document.getElementById('firstName').value;
		var phone = document.getElementById('phone').value;
		var city = document.getElementById('city').value;
		var postalCode = document.getElementById('postalCode').value;
		var address = document.getElementById('address').value;
		var thePeople = new Peoples(lastId++, lastName, firstName, phone, city, postalCode, address);
		listPeoples.push(thePeople);
		
		document.querySelector('#dialog_deletePeople').style.display = "none";
		document.querySelector('#table_listPeoples').innerHTML = viewPeoples('table');
		
		clearAddPeople();
	}
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
function clearAddPeople() {
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


// -----------------------------//
// --- Dialog Delete People --- //
// -----------------------------//
function deletePeople(type) {
	var id = document.getElementById('select_listPeoples').value;
	var index = listPeoples.findIndex(obj => obj.id === id);
	if (type == 'select') {
		if (index >= 0) {
			listPeoples.splice(index, 1);
		}
	}
	else if (type == 'table') {
		
	}	
	update();
}


// ----------------------//
// --- Table Peoples --- //
// ----------------------//
function viewPeoples(type) {
	var i = 0;
	if(listPeoples.length >= 1) {
		var temp = "<tr><th>Position</th><th>Nom</th><th>Prenom</th><th>Téléphone</th><th>Ville</th><th>Code postal</th><th>Adresse</th><th></th></tr>";
		for(var people in listPeoples) { 
			if (listPeoples.hasOwnProperty(people)) {
				if(type == 'select'){
					temp += "<option value='" + i + "' >" + listPeoples[people].getLastName + " " + listPeoples[people].getFirstName + " - " + listPeoples[people].getPhone + " - " + listPeoples[people].getCity + ", " + listPeoples[people].getPostalCode + " | " + listPeoples[people].getAddress + ".</option>";
				}
				else{
					i++;
					var btnDel = '<svg title="Supprimer" id="' + listPeoples[people].getId + '" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
					if(i%2 == 1){
						temp += "<tr class='tr__pair' ><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
					}
					else{
						temp += "<tr><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
					}
				}
			}
		}
		return temp;
	}
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
}
function displayDialogDeletePeople() {
	document.querySelector('#select_listPeoples').innerHTML = viewPeoples('select');
	document.querySelector('#dialog_deletePeople').style.display = "block";
	document.querySelector('#list').scrollIntoView({
		behavior: 'smooth'
	});
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
    /* à terminer */
}
function saveFile(){
	/* à treminer */
	function toJSONString( form ) {
		var obj = {};
		var elements = form.querySelectorAll( "input, select, textarea" );
		for( var i = 0; i < elements.length; ++i ) {
			var element = elements[i];
			var name = element.name;
			var value = element.value;

			if( name ) {
				obj[ name ] = value;
			}
		}

		return JSON.stringify( obj );
	}

	document.addEventListener( "DOMContentLoaded", function() {
		var form = document.getElementById( "test" );
		var output = document.getElementById( "output" );
		form.addEventListener( "submit", function( e ) {
			e.preventDefault();
			var json = toJSONString( this );
			output.innerHTML = json;

		}, false);

	});
}


// ---------------//
// --- Search --- //
// ---------------//
function select_search(){
	document.querySelector('#txt-search').focus();
	document.querySelector('#nav').scrollIntoView({
		behavior: 'smooth'
	});
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
		var temp = "<tr><th>Position</th><th>Nom</th><th>Prenom</th><th>Téléphone</th><th>Ville</th><th>Code postal</th><th>Adresse</th><th></th></tr>";
		switch(select) {
			case "nom" :
				for(var people in listPeoples) {
					if (listPeoples.hasOwnProperty(people)){
						if(listPeoples[people].getLastName.toLowerCase().indexOf(txt.value.toLowerCase()) != -1){
							i++;
							var btnDel = '<svg title="Supprimer" id="' + listPeoples[people].getId + '" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
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
							var btnDel = '<svg title="Supprimer" id="' + listPeoples[people].getId + '" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
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
							var btnDel = '<svg title="Supprimer" id="' + listPeoples[people].getId + '" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
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
		txt.style.border = "1px solid red";
		document.querySelector('#table_listPeoples').innerHTML = viewPeoples('table');
	}
}
function reloadSearchBar(){	
	var txt = document.querySelector('#txt-search');

	txt.classList.remove('txt-search-error');
	txt.classList.add('txt-search-good');
	txt.style.border = "1px solid black";
}


// --------------//
// --- Close --- //
// --------------//
function closeApp(){
    window.close();
}

// --- Menu --- //
document.addEventListener('DOMContentLoaded', update());
document.querySelector('#menu_loadFile').addEventListener('click', loadFile);
document.querySelector('#menu_saveFile').addEventListener('click', saveFile);
document.querySelector('#menu_addPeople').addEventListener('click', displayDialogAddPeople);
document.querySelector('#menu_deletePeople').addEventListener('click', displayDialogDeletePeople);
document.querySelector('#menu_close').addEventListener('click', closeApp);

// --- SVG --- //
document.querySelector('#svg_addPeople').addEventListener('click', displayDialogAddPeople);

// --- Dialog - Add People --- //
document.querySelector('#btn_addPeople').addEventListener('click', addPeople);
document.querySelector('#close_dialogAddPeople').addEventListener('click', closeDialogAddPeople);
document.querySelector('#btn_clearAddPeople').addEventListener('click', clearAddPeople);

// --- Dialog - Delete People --- //
document.querySelector('#btn_deletePeople').addEventListener('click', deletePeople('select'));
document.querySelector('#close_dialogDeletePeople').addEventListener('click', closeDialogDeletePeople);

// --- Search --- //
document.querySelector('#menu_searchList').addEventListener('click', select_search);
document.querySelector('#txt-search').addEventListener('keyup', search);
document.querySelector('#txt-search').addEventListener('click', search);
document.querySelector('#txt-search').addEventListener('blur', reloadSearchBar);
document.querySelector('#list-search').addEventListener('change', search);