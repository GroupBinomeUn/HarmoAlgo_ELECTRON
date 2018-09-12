function addPeople() {
	var lastName = document.getElementById('lastName').value;
	var firstName = document.getElementById('firstName').value;
	var phone = document.getElementById('phone').value;
	var city = document.getElementById('city').value;
	var postalCode = document.getElementById('postalCode').value;
	var address = document.getElementById('address').value;
	var thePeople = new Peoples("", lastName, firstName, phone, city, postalCode, address);
	alert(thePeople.getLastName + " " + thePeople.getFirstName + " " + thePeople.getPhone + " " + thePeople.getCity + " " + thePeople.getPostalCode + " " + thePeople.getAddress);
}