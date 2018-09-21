// -----------------------------//
// --- Dialog Delete People --- //
// -----------------------------//

// --- Open Dialog --- //
function displayDialogDeletePeople() {
	document.querySelector('#select_listPeoples').innerHTML = viewPeoples('select');
	document.querySelector('#dialog_deletePeople').style.display = "block";
	closeDialogAddPeople();
}

// --- Close Dialog --- //
function closeDialogDeletePeople() {
    document.querySelector('#dialog_deletePeople').style.display = "none";
}

//--- Auto-Close Dialog --- //
function autoCloseDialogDeletePeople(){
	if(!listPeoples.length){
		closeDialogDeletePeople();
	}
}

// --- Delete People selected in Selector --- //
function select_deletePeople() {
	var idSelect = document.querySelector('#select_listPeoples').value;
	
	if (idSelect != null) {
		var index = listPeoples.findIndex(obj => obj.id == idSelect);
		
		if (index >= 0) {
			listPeoples.splice(index, 1);
			listPeoples.slice(index + 1);
		}
    }
	update();
	search();
}

// --- Delete People selected in Table --- //
function table_deletePeople() {
    var index = this.id;
	if (index >= 0) {
		listPeoples.splice(index, 1);
    }
	update();
	search();
}

