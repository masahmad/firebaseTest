


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBZfEjFV0VrOR_jlwzPVHz1uVlV0dktzV0",
    authDomain: "playtest-37b2f.firebaseapp.com",
    databaseURL: "https://playtest-37b2f.firebaseio.com",
    projectId: "playtest-37b2f",
    storageBucket: "playtest-37b2f.appspot.com",
    messagingSenderId: "951904455768"
  };
  firebase.initializeApp(config);

  var db = firebase.firestore();



//add data
// db.collection("users").add({
//   first: "Ada",
//   last: "Lovelace",
//   born: 1815
// })
// .then(function(docRef) {
//   console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//   console.error("Error adding document: ", error);
// });




// Add a second document with a generated ID.
// db.collection("users").add({
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// })




// retrieve
function getUsers() {
db.collection("users").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
  });
});

}





//To get started, write some data about cities so we can look at different ways to read it back:
function AddCities() {
var citiesRef = db.collection("cities");

citiesRef.doc("SF").set({
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000 });
citiesRef.doc("LA").set({
    name: "Los Angeles", state: "CA", country: "USA",
    capital: false, population: 3900000 });
citiesRef.doc("DC").set({
    name: "Washington, D.C.", state: null, country: "USA",
    capital: true, population: 680000 });
citiesRef.doc("TOK").set({
    name: "Tokyo", state: null, country: "Japan",
    capital: true, population: 9000000 });
citiesRef.doc("BJ").set({
    name: "Beijing", state: null, country: "China",
    capital: true, population: 21500000 });

}







//The following example shows how to retrieve the contents of a single document using get()
function getCity() {
var docRef = db.collection("cities").doc("SF");

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

}





// with where clause
function GetCityWhere() {

  db.collection("cities").where("capital", "==", true)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        })
       
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });



}


// realtime updates reflected here
function Realtime() {

  db.collection("cities").doc("SF")
  .onSnapshot(function(doc) {
      console.log("Current data: ", doc.data());
  });

}




// It is often useful to see the actual changes to query results
//  between query snapshots, instead of simply using the entire query snapshot.
//   For example, you may want to maintain a cache as individual documents are added, 
//   removed, and modified.
function Realtime2() {
  db.collection("cities").where("state", "==", "CA")
    .onSnapshot(function(snapshot) {
        snapshot.docChanges.forEach(function(change) {
            if (change.type === "added") {
                console.log("New city: ", change.doc.data());
            }
            if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());
            }
        });
    });

}


//Listen to multiple documents in a collection
//As with documents, you can use onSnapshot() instead of get() to listen
// to the results of a query. This creates a query snapshot. 
//For example, to listen to the documents with state CA
function Realtime3() {
db.collection("cities").where("state", "==", "CA")
    .onSnapshot(function(querySnapshot) {
        var cities = [];
        querySnapshot.forEach(function(doc) {
            cities.push(doc.data());
        });
        console.log("Current cities in CA: ");
        console.log(JSON.stringify(cities));
    });
  }




//getCity();
//GetCityWhere();
//Realtime();
//Realtime2();
Realtime3();


