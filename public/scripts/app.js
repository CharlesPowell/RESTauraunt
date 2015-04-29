var app = app || {};

app.renderOrder = function(){

      temp = "/api/parties/" + $("#party-list").val()
      $.ajax({
        method: 'get',
        url: temp,
        success: function(data){
          $('#order-list').empty();
          for(var i = 0; i < data.orders.length; i++){

            food_id = data.orders[i].food_id
            obj = _.find(app.foodList.models, function(obj) { return obj.id == food_id });
            orderFoodView = new app.OrderFoodView({
              model: obj,
              el: $('#order-list')
            })
            orderFoodView.render();
            console.log(obj.id)
          }
        }
      })

}



$(document).ready(function(){


  app.partyList = new app.PartyCollection();
  app.foodList = new app.FoodCollection();


  app.foodListView = new app.ListView({
    modelView: app.MenuFoodView,
    collection: app.foodList,
    el: $('#food-list')
  });

  app.partyPullDown = new app.PullDownView({
    modelView: app.PartyView,
    collection: app.partyList,
    el: $('#party-list')
  });

  app.partyList.fetch();
  app.foodList.fetch();

  $("#party-list").change(function(){
    app.renderOrder();
  })



  $("#place-order").click(function(){

    party_id = parseInt($('#party-list').val());
    food_id = app.foodSelection.attributes.id;
    appData = {order: {party_id: party_id, food_id: food_id}};
    console.log(appData);
    $.ajax({
      url: "/api/orders",
      method: 'post',
      data: appData,
      success: function(){
        console.log("Success!");
        app.renderOrder();
      }
    })

  });

})
