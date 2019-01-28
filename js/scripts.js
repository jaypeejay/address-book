
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}
AddressBook.prototype.findContact = function(id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if(this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return this.contacts[i];
      }
    }
  };
  return false;
}

//Business logic for contacts---------

function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
}
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

//UI logic----

var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay){
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact){
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

$(document).ready(function(event) {
  $("form#new-contact").submit(function(event){
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedphoneNumber = $("input#new-phone-number").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedphoneNumber);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
});