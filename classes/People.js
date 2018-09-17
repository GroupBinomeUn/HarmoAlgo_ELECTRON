class Peoples {
    //constructeur
    constructor(id, lastName, firstName, phone, city, postalCode, address) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.phone = phone;
        this.city = city;
        this.postalCode = postalCode;
        this.address = address;
    }

    //méthodes
    get getId(){
        return this.id;
    }

    get getLastName(){
        return this.lastName;
    }
    set setLastName(lastName){
        this.lastName = lastName;
    }

    get getFirstName(){
        return this.firstName;
    }
    set setFirstName(firstName){
        this.firstName = firstName;
    }

    get getPhone(){
        return this.phone;
    }
    set setPhone(phone){
        this.phone = phone;
    }

    get getCity(){
        return this.city;
    }
    set setCity(city){
        this.city = city;
    }

    get getPostalCode(){
        return this.postalCode;
    }
    set setPostalCode(postalCode){
        this.postalCode = postalCode;
    }

    get getAddress(){
        return this.address;
    }
    set setAddress(address){
        this.address = address;
    }
}

function addPeople(){
        
}