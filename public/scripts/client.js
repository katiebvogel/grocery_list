angular.module('groceryApp', []);

angular.module('groceryApp').controller('ThingController', function($http){

  var vm = this;

  $http.get('/items').then(function(response){
    console.log('success getting from client.js', response);
    vm.items = response.data;
  }, function(response){
    console.log('failure getting in client.js');
  }); //end http.get items

  vm.saveAction = function (){
    console.log('you clicked save');

    var sendData = {};

    sendData.name= vm.name;
    sendData.qty = vm.qty;

    $http.post('/items/createItem', sendData).then(function(response){
      console.log(response);
    }, function(response){
      console.log('failure posting');
    })
    //end enter/post/save function on the click


$http.get('/items').then(function(response){
      console.log('success re-getting', response);
      vm.item = response.data;
    }, function(response){
      console.log('failure re-getting');
    })
  }
//Below is the http.delete   works but requires the page to refresh.
vm.removeAction = function(itemId){
  console.log('you chose to remove');
  $http.delete('/items/removeWithId/' + itemId ).then(function(response){
    vm.item = response.data;
  }, function(response){
    console.log('failure deleting');
  })
}  //end remove button click function






//Below is the http.put to modify the list item entry
//I have not tested it..  earlier the http.put was stopping the server because "headers have already been set"



// vm.changeAction = function(itemId){
//   console.log('you chose to modify');
// var newData = {};
//   var newDataName = elem.find("item.name");
//   newDataName.bind("click", function(){
//     console.log('clicked');
//   })
//
//     var newDataQty = elem.find("item.qty")
//       newDataQty.bind("click", function(){
//         console.log('clicked');
//       })
//
//   $http.put('/items/changeWithId/', newData).then(function(response){
//     vm.item = response.data;
//   }, function(response){
//     console.log('failure modifying');
//   })
//
// }



});  //end controller
