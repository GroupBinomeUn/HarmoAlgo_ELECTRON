//import * as PeopleModule from "../classes/People.js";

var lePeople = new Peoples();

lePeople.setFirstName = "François";

alert(lePeople.getFirstName);

var contacts = [];
var lePeople = new Peoples("1", "George", "Pompidou", "0102030405", "Paris", "75000", "5 rue des Mimosa");
var lePeople2 = new Peoples("2", "Dumas", "François", "0102030405", "Paris", "75000", "12 avenue Paul Maudit");
contacts.push(lePeople, lePeople2);