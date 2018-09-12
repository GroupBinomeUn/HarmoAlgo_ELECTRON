//import * as PeopleModule from "../classes/People.js";

var lePeople = new Peoples();

lePeople.setFirstName = "François";

alert(lePeople.getFirstName);

var contacts = [];
var lePeople = new Peoples("1", "Dufaure", "Romain", "0102030405", "Paris", "75000", "5 rue des mimosa");
var lePeople2 = new Peoples("2", "Dufaure", "Damien", "0102030405", "Paris", "75000", "5 rue des mimosa");
contacts.push(lePeople, lePeople2);

for(var index in contacts) { 
    if (contacts.hasOwnProperty(index)) {
      console.log("<p>" + contacts[index].getLastName + "</p>");
    }
}