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

		for (var i = 0; i < jsonFile.length; i++) {
			var thePeople = new People(lastId++, jsonFile[i].lastName, jsonFile[i].firstName, jsonFile[i].phone, jsonFile[i].city, jsonFile[i].postalCode, jsonFile[i].address);
			listPeoples.push(thePeople);
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
			dialog.showMessageBox({title: "Sauvegarde", message: "Fichier sauvegardé ! 🦄", buttons: ["OK"] });
		});
	}
}