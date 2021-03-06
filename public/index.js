'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(truckers);
console.log(deliveries);
console.log(actors);

// Exercise 1

// function that helps figuring out which trucker corresponds to the delivery and returns the correct truckerid

function getTruckerId(_index)
{
  var j ;
  for (j = 0; j < truckers.length; j++) { 
    if (_index == truckers[j].id)
    {
      var id = j;
    }
  }
return id
}

function exercise1()
{
var i ;
  for (i = 0; i < deliveries.length; i++) { 

    // first, we get the index of the trucker

    var index = deliveries[i].truckerId;
    var id = getTruckerId(index);

    // second, we calculate the shipping price and update the delivery

    var price = deliveries[i].distance*truckers[id].pricePerKm+deliveries[i].volume*truckers[id].pricePerVolume;
    deliveries[i].price = price;
  }
}


console.log(deliveries);

// Exercise 2

// function that calculates the percentage according to the volume of an object
function getPercentage(object)
{
  var percent = 0 ;
  if(object.volume>25)
  {
    percent=0.5;
  }
  else
  {
    if(object.volume>10)
    {
      percent = 0.3;
    }
    else
    {
      if(object.volume>5)
      {
        percent = 0.1;
      }
    }
  }
  return percent;
   
}

function exercise2()
{
  var i ;
  for (i = 0; i < deliveries.length; i++) { 

    // first we calculate the amount deducted

    var per = getPercentage(deliveries[i]);
    var deduction = deliveries[i].price * per;

    //second we update de price

    deliveries[i].price=deliveries[i].price - deduction;
  }
}

console.log(deliveries);

//Exercise 3

// function that gets the value of the treasury according to the distance
function getTreasury(object)
{
  var distance = object.distance;
  var treasury = Math.trunc(distance/500);
  return treasury;
}

function exercise3()
{
  var i ;
  for (i = 0; i < deliveries.length; i++) { 

    // first we calculate the commission, the insurance, the treasury

    var commission = deliveries[i].price * 0.3;
    var insurance = commission/2;
    var treasury = getTreasury(deliveries[i]);

    // second we deduct what we have calculated from the commission to figure out what convargo keeps

    var convargo = commission - treasury - insurance;

    // lastly, we update the what we know in the deliveries

    deliveries[i].commission.insurance = insurance;
    deliveries[i].commission.treasury = treasury;
    deliveries[i].commission.convargo = convargo;

  }
}

  //Exercise 4

  function exercise4()
  {
    var i;
    for (i = 0; i < deliveries.length; i++) 
    { 
      if(deliveries[i].options.deductibleReduction == true)
      {
        var extra = deliveries[i].volume;
        deliveries[i].price = deliveries[i].price + extra;
      }
    }
  }

  //Exercise 5 

  function exercise5()
  {
    var i;
    for(i = 0; i < actors.length; i++)
    {
      //shipper

      actors[i].payment[0] = deliveries[i].price;

      //trucker

      actors[i].payment[1] = deliveries[i].price - deliveries[i].price*0.3;

      //insurance
      
      actors[i].payment[2] = deliveries[i].commission.insurance;
      
      //treasury
      
      actors[i].payment[3] = deliveries[i].commission.treasury;
      
      //convargo
      
      actors[i].payment[4] = deliveries[i].commission.convargo;
    }
  }

