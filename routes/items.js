var router = require('express').Router();

var Item = require('../models/items.js');

router.get('/', function(request, response){
  Item.find({}, function(err, items){
    if(err){
      console.log('Routing Error', err);
      response.sendStatus(500);
    } else {
      console.log('Success routing', items);
      response.send(items);
    }
  })
});  //end get

//client enters a new item in this post request
router.post('/createItem', function(request, response){
  console.log('Creating a new Item');
  var data = request.body;
  var createdItem = new Item ({
      name: data.name,
      qty: data.qty,
  });
 //within post request, we want to make sure and save the item to the db
  createdItem.save(function(err){
    if(err){
      console.log('Error saving your item', err);
      response.sendStatus(500);
    } else {
      console.log('Your item saved to db', data);
      response.sendStatus(200);
    }
  }); //end save function within post
}); //end post


//Below is the router.delete  -- it works but requires a refresh of the page
router.delete('/removeWithId/:id', function(request, response){
      var id = request.params.id;

Item.findById(id, function(err, item){
  if(err){
    console.log('error finding by id for deletion', err);
    response.sendStatus(500);
  }else {
    item.remove(function(err){
      if(err){
        console.log('error actually deleting', err);
        response.sendStatus(500);
      }
    })

    console.log('you have successfully deleted item:', id);
    response.sendStatus(200);
  }
})

}); // end router.delete





//Below will be the router.put for modification

router.put('/changeWithId/:id', function(request, response){
      var id = request.params.id;

Item.findById(id, function(err, item){
  if(err){
    console.log('error finding by id for updating', err);
    response.sendStatus(500);
  }else {
    item.update(function(err){
      if(err){
        console.log('error actually updating', err);
        response.sendStatus(500);
      }
    })

    console.log('you have successfully updated item:', id);
    response.sendStatus(200);
  }
})

}); //end  router.put for upating the list 




module.exports = router;
