const {dialog} = require('electron').remote;
var serialize = require('serialize-to-js').serialize;
var deserialize = require('serialize-to-js').deserialize;
var fs = require('fs');
// --------------//
// --- Files --- //
// --------------//

// --- Load File --- //
function loadFile(){
	var jsonFile = dialog.showOpenDialog({properties: ['openFile'], filters: [{ name: 'Json', extensions: ['json']}]}, function (fileNames) {
		if (fileNames === undefined) return;
		var fileName = fileNames[0];
		var file = fs.readFileSync(fileName, 'utf-8');

		var jsonFile = deserialize(file);

		var yesForEveryone = false;
		var noForEveryone = false;
		var cancel = false;
		for (var i = 0; i < jsonFile.length; i++) {
			var peopleIsExist = false;
			if(!yesForEveryone || !noForEveryone){
				for(var people in listPeoples) {
					if(jsonFile[i].firstName == listPeoples[people].getFirstName && jsonFile[i].lastName == listPeoples[people].getLastName){
						peopleIsExist = true;
					}
				}
			}
			if(!cancel && peopleIsExist && !yesForEveryone && !noForEveryone){
				var response = dialog.showMessageBox({
					type: 'warning',
					buttons: ['Oui', 'Oui pout tout', 'Non', 'Non pour tout', 'Annuler'],
					title: 'Êtes-vous sûr ?',
					message: (jsonFile[i].firstName + ' ' + jsonFile[i].lastName + ' est déja dans le carnet, voulez-vous importer tout de même cette personne ?')
				});
				switch(response) {
					case 0:
						var thePeople = new People(lastId++, jsonFile[i].lastName, jsonFile[i].firstName, jsonFile[i].phone, jsonFile[i].city, jsonFile[i].postalCode, jsonFile[i].address);
						listPeoples.push(thePeople);
						fileChangeOrNew = true;
					break;
					case 1:
						yesForEveryone = true;
					break;
					case 3:
						noForEveryone = true;
					break;
					case 4:
						cancel = true;
					break;
				}
			}
			
			if(!noForEveryone && yesForEveryone){
				var thePeople = new People(jsonFile[i].id, jsonFile[i].lastName, jsonFile[i].firstName, jsonFile[i].phone, jsonFile[i].city, jsonFile[i].postalCode, jsonFile[i].address);
				listPeoples.push(thePeople);
				fileChangeOrNew = true;
			}

			if(!peopleIsExist){
				var thePeople = new People(lastId++, jsonFile[i].lastName, jsonFile[i].firstName, jsonFile[i].phone, jsonFile[i].city, jsonFile[i].postalCode, jsonFile[i].address);
				listPeoples.push(thePeople);
				fileChangeOrNew = true;
			}
		}
		update();
	});
}

// --- Save File --- //
function saveFile(){
	var file_path = dialog.showSaveDialog({properties: ['saveFile'], filters: [{ name: 'Json', extensions: ['json']}]});

	if(file_path) {
		file = [serialize(listPeoples)];
		fs.writeFile(file_path, file, function (err) {
			//dialog.showMessageBox({title: "Sauvegarde", message: "Fichier sauvegardé ! 🦄", buttons: ["OK"] });
		});
		fileChangeOrNew = false;
	}
}