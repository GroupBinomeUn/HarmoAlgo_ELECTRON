// --------------------------//
// --- Dialog Add People --- //
// --------------------------//

// --- Open Dialog --- //
function displayDialogAddPeople() {
	clearAddPeople();
	document.querySelector('#dialog_addPeople').style.display = "block";
	closeDialogDeletePeople();
}

// --- Close Dialog --- //
function closeDialogAddPeople() {
    document.querySelector('#dialog_addPeople').style.display = "none";
}

// --- Add People --- //
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

// --- Verify Inputs --- //
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

// --- Clear Inputs --- //
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
