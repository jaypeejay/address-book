
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

function Contact(firstName, lastName, phoneNumber, email, workAddress, homeAddress) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
  this.email = email
  this.address = {work: workAddress, home: homeAddress};
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

function showContact(contactId){
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
  $(".home-address").html(contact.address.work);
  $(".work-address").html(contact.address.home);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>")

}

function attachContactListeners(){
  $("ul#contacts").on("click","li", function(){
    showContact(this.id);
  });
  $("#buttons").on("click",".deleteButton", function(){
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  })
};

$(document).ready(function(event) {
  attachContactListeners();
  $("form#new-contact").submit(function(event){
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedphoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-email").val();
    var inputtedHomeAddress = $("input#new-home-address").val();
    var inputtedWorkAddress = $("input#new-work-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("input#new-home-address").val("");
    $("input#new-work-address").val("");
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedphoneNumber, inputtedEmail, inputtedHomeAddress, inputtedWorkAddress);
    console.log(newContact)
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
});
