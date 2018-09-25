// ----------------------//
// --- View Peoples --- //
// ----------------------//

// --- Load Peoples --- //
function viewPeoples(type) {
	var i = 0;
	if (type == 'table') {
		var temp = '<tr><th>Position</th><th>Nom</th><th>Prenom</th><th>Téléphone</th><th>Ville</th><th>Code postal</th><th>Adresse</th><th></th></tr>';
	}
	if(listPeoples.length >= 1) {
		for(var people in listPeoples) { 
			if (listPeoples.hasOwnProperty(people)) {
				if(type == 'select') {
					temp += "<option value='" + listPeoples[people].getId + "' >" + listPeoples[people].getLastName + " " + listPeoples[people].getFirstName + " - " + listPeoples[people].getPhone + " - " + listPeoples[people].getCity + ", " + listPeoples[people].getPostalCode + " | " + listPeoples[people].getAddress + ".</option>";
				}
				else {
					var btnDel = '<svg title="Supprimer" id="' + i + '" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
					i++;
					if(i%2 == 1){
						temp += "<tr class='tr__pair' ><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
					}
					else {
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


// --- Update Table / Selector --- //
function update(){	
	document.querySelector('#table_listPeoples').innerHTML = viewPeoples('table');
	document.querySelector('#select_listPeoples').innerHTML = viewPeoples('select');
}

// --- Search Peoples--- //
function select_search(){
	document.querySelector('#txt_search').focus();
	document.querySelector('#list').scrollIntoView({
		behavior: 'smooth'
	});
	closeDialogDeletePeople();
	closeDialogAddPeople();
}
function search(deleteOpt){	
	if(deleteOpt === null){
		deleteOpt = false;
	}

	closeDialogAddPeople();

	var txt = document.querySelector('#txt_search');
	var type = document.querySelector('#list_search');

	txt.classList.remove('txt-search-error');
	txt.classList.add('txt-search-good');
	txt.style.border = "1px solid #6692ff";
	
	var i = 0;
	if(txt.value.trim() != ""){
		var select = type.options[type.selectedIndex].value;
		var temp = "<tr><th>Position</th><th>Nom</th><th>Prenom</th><th>Téléphone</th><th>Ville</th><th>Code postal</th><th>Adresse</th><th></th></tr>";
		var id = 0;
		switch(select) {
			case "nom" :
				txt.focus();
				for(var people in listPeoples) {
					if (listPeoples.hasOwnProperty(people)) {
						if(listPeoples[people].getLastName.toLowerCase().indexOf(txt.value.toLowerCase()) != -1){
							var btnDel = '<svg title="Supprimer" id="' + id + '" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
							i++;
							if(i%2 == 1) {
								temp += "<tr class='tr__pair' ><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
							}
							else {
								temp += "<tr><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
							}
						}
						id++;
					}
				}
				break;
			case "prenom" :
				txt.focus();
				for(var people in listPeoples) {
					if (listPeoples.hasOwnProperty(people)) {
						if(listPeoples[people].getFirstName.toLowerCase().indexOf(txt.value.toLowerCase()) != -1) {
							var btnDel = '<svg title="Supprimer" id="' + id + '" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
							i++;
							if(i%2 == 1) {
								temp += "<tr class='tr__pair' ><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
							}
							else {
								temp += "<tr><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
							}
						}
						id++;
					}
				}
				break;
			case "phone" :
				if(parseInt(txt.value, 10)){
					for(var people in listPeoples) {
						if (listPeoples.hasOwnProperty(people)) {
							if(listPeoples[people].getPhone.toLowerCase().indexOf(txt.value.toLowerCase()) != -1) {
								var btnDel = '<svg title="Supprimer" id="' + id + '" class="icon icon-bin bin"><use xlink:href="#icon-bin"></use></svg>';
								i++;
								if(i%2 == 1) {
									temp += "<tr class='tr__pair' ><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
								}
								else {
									temp += "<tr><td>" + i +  "</td><td>" + listPeoples[people].getLastName + "</td><td>" + listPeoples[people].getFirstName + "</td><td>" + listPeoples[people].getPhone + "</td><td>" + listPeoples[people].getCity + "</td><td>" + listPeoples[people].getPostalCode + "</td><td>" + listPeoples[people].getAddress + "</td><td>" + btnDel + "</td></tr>";
								}
							}
							id++;
						}		
					}
				}
				else{
					txt.value = null;
				}
				txt.focus();
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
		if(!deleteOpt){
			closeDialogDeletePeople();
			txt.focus();
			txt.classList.add('txt-search-error');
			txt.classList.remove('txt-search-good');
			txt.style.border = "1px solid #ff2929";
		}	
		document.querySelector('#table_listPeoples').innerHTML = viewPeoples('table');
	}
}

// --- Remove Search Input --- //
function reloadSearchBar(){	
	var txt = document.querySelector('#txt_search');

	txt.classList.remove('txt-search-error');
	txt.classList.add('txt-search-good');
	txt.style.border = "1px solid #6692ff";
}

// --- Remove Search Input --- //
function eraseSearch(){
	document.querySelector('#txt_search').value = "";
	//document.querySelector('#txt_search').focus();
	document.querySelector('#table_listPeoples').innerHTML = viewPeoples('table');
}