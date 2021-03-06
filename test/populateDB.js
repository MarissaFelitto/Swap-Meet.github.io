'use strict';

process.env.MONGO_URL = 'mongodb://localhost/game_swap_test';

var User = require('../models/user.js');
var Game = require('../models/game.js');
var Trade = require('../models/trade.js');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../server');

var url = 'http://localhost:3000/';
//var url = 'https://cryptic-savannah-2534.herokuapp.com/';
//var expect = chai.expect;

//clear existing users and games
User.collection.remove(function(err) {if (err) throw err;});
Game.collection.remove(function(err) {if (err) throw err;});
Trade.collection.remove(function(err) {if (err) throw err;});

var games = [];
var users = [];
var jwtA;
var jwtB;
var jwtC;
var gameIds = [];

games[0] = {title:'The Curse of Monkey Island', platform:'PC',
image_urls: ['http://ecx.images-amazon.com/images/I/51JHJN1YW3L._SY300_.jpg'],
condition: 'good', short_description: 'insult sword fighting FTW!'};
games[1] = {title:'God of War', platform:'PS3',
image_urls: ['http://res.cloudinary.com/swapmeet/image/upload/v1418941698/God_of_War_Ascension_eseajx.jpg'],
condition: 'good', short_description: 'Kill stuff good'};
games[2] = {title:'FIFA 15', platform:'PS3',
image_urls: ['http://res.cloudinary.com/swapmeet/image/upload/v1418941855/FIFA_15_Cover_Art_grdzh9.jpg'],
condition: 'good', short_description: 'Messi is the master'};
games[3] = {title:'Grim Fandango', platform:'PC',
image_urls: ['http://res.cloudinary.com/swapmeet/image/upload/v1418941704/Grim-Fandango1_owy0kx.jpg'],
condition: 'excellent', short_description:
  'My scythe--I like to keep it next to where my heart used to be'};
games[4] = {title:'Settlers of Catan', platform:'Board',
image_urls: ['http://res.cloudinary.com/swapmeet/image/upload/' +
'a_auto_right/v1418941268/20141218_154511506_iOS_ttwolz.jpg'],
condition: 'good', short_description:
  'A brick for your sheep?'};
games[5] = {title:'Settlers of Catan: Knights and Cities', platform:'Board',
image_urls: ['http://images.fanpop.com/images/image_uploads/Differents-' +
  'Boards-settlers-of-catan-521934_1157_768.jpg'],
condition: 'used', short_description:
  'A Settlers of Catan expansion pack.'};
games[6] = {title:'Team Fortress 2', platform:'PC',
image_urls: ['http://gamerepublic.ru/UserFiles/CD_Cover2(62).jpg'],
condition: 'used', short_description:
  'I am getting rid of this so my boyfriend will spend time with me.'};
games[7] = {title:'Call of Duty: Ghosts', platform:'XBOX360',
image_urls: ['http://res.cloudinary.com/swapmeet/image/upload/v1418941839/8125h60acML__SL1200__s029mu.jpg'],
condition: 'used', short_description:
  'Ghost-Ride That Whip!'};
games[8] = {title:'De Blob', platform:'Wii',
image_urls: ['http://res.cloudinary.com/swapmeet/image/upload/v1416608782/lwdaetajtauu3fi681kt.jpg'],
condition: 'used', short_description:
  'Paint the town red. Its blobs of fun!!!'};
games[9] = {title:'Dance Dance Revolution', platform:'PS2',
image_urls: ['http://res.cloudinary.com/swapmeet/image/upload/' +
'v1418941847/Dance_Dance_Revolution_North_American_PlayStation_cover_art_xggrsu.png'],
condition: 'used', short_description:
  'Boots and Pants and Boots and Pants!'};
games[10] = {title:'Star Wars III: Clone Wars', platform:'XBOX360',
image_urls: ['http://res.cloudinary.com/swapmeet/image/upload/v1418941719/legoxbox_yuao1y.jpg'],
condition: 'used', short_description:
  'Everything is Awesome... In Space!'};
games[11] = {title:'Pengoloo', platform:'Board',
image_urls: ['http://res.cloudinary.com/swapmeet/image/upload/' +
'a_auto_right/v1418941283/20141218_154643982_iOS_njgi8d.jpg'],
condition: 'used', short_description:
  'A Penguin Eggs-pedition!'};
games[12] = {title:'Spot It Jr.', platform:'Card',
image_urls: ['http://res.cloudinary.com/swapmeet/image/upload/' +
'a_auto_right/v1418941265/20141218_154443221_iOS_ixdrpo.jpg'],
condition: 'used', short_description:
  'Find a match, junior!'};
games[13] = {title:'Rayman: Raving Rabbids', platform:'Wii',
image_urls: ['http://res.cloudinary.com/swapmeet/image/upload/' +
'v1416603114/gf79xh6yw4m726jw50sa.jpg'],
condition: 'used', short_description:
  'These rabbits are cray-cray!'};
games[14] = {title:'Wii Fit', platform:'Wii',
image_urls: ['http://res.cloudinary.com/swapmeet/image/upload/' +
'v1416601976/rcopdo45tbyfgkqajzae.jpg'],
condition: 'used', short_description:
  'Get off the couch and get on the wii board.'};
games[15] = {title:'Resident Evil: The Umbrella Chronicles', platform:'Wii',
image_urls: ['http://res.cloudinary.com/swapmeet/image/upload/' +
'v1416596033/ebu7tfmqkiah3zvelff3.jpg'],
condition: 'used', short_description:
  'Evil resides underneath an umbrella'};

// users[0] = {email:'test@example.com', password:'SecretPW101',
//   username: 'IHeartGames', zip: '99999'};
// users[1] = {email:'user@example.com', password:'Password123',
//   username: 'PCs4Eva', zip: '99999'};
// users[2] = {email:'test@example.com', password:'SecretPW101',
//   username: 'MonkeysAreCute', zip: '99999'};

users[0] = '?email=bunnies@example.com&password=Password123&screenname=' +
  'IHeartGames&zip=99999';
users[1] = '?email=user@example.com&password=Password123&screenname=' +
  'PCs4Eva&zip=99999';
users[2] = '?email=fluffy@example.com&password=Password123&screenname=' +
  'MonkeysAreCute&zip=99999';
//users[1] = {email:'user@example.com', password:'Password123',
  //username: 'PCs4Eva', zip: '99999'};
//users[2] = {email:'test@example.com', password:'SecretPW101',
  //username: 'MonkeysAreCute', zip: '99999'};

describe('should populate the database', function() {
  it('should make a user and get a jwt', function(done) {
    chai.request(url)
    .post('api/user' + users[0])
    .end(function(err, res) {
      console.log(res.body);
      jwtA = res.body.jwt;
      done();
    });
  });

  it('should make a user and get a jwt', function(done) {
    chai.request(url)
    .post('api/user' + users[1])
    .end(function(err, res) {
      console.log(res.body);
      jwtB = res.body.jwt;
      done();
    });
  });

  it('should make a user and get a jwt', function(done) {
    chai.request(url)
    .post('api/user' + users[2])
    .end(function(err, res) {
      console.log(res.body);
      jwtC = res.body.jwt;
      done();
    });
  });

  it('should add a profile pic', function(done) {
    chai.request(url)
    .put('api/user/myprofile')
    .set('jwt', jwtA)
    .send({'avatar_url': 'http://res.cloudinary.com/swapmeet/image/upload/a_auto_right/' +
      'v1418941323/20141218_221818405_iOS_r4ollg.jpg'})
    .end(function(err, res) {
      console.log(res.body);
      done();
    });
  });

  it('should add a profile pic', function(done) {
    chai.request(url)
    .put('api/user/myprofile')
    .set('jwt', jwtB)
    .send({'avatar_url': 'http://res.cloudinary.com/swapmeet/image/upload/a_auto_right/' +
      'v1418941297/20141218_221735199_iOS_otjt3z.jpg'})
    .end(function(err, res) {
      console.log(res.body);
      done();
    });
  });

  it('should add a profile pic', function(done) {
    chai.request(url)
    .put('api/user/myprofile')
    .set('jwt', jwtC)
    .send({'avatar_url': 'http://res.cloudinary.com/swapmeet/image/upload/a_auto_right/' +
      'v1418941330/20141218_221829687_iOS_nzzyim.jpg'})
    .end(function(err, res) {
      console.log(res.body);
      done();
    });
  });

  it('should add game', function(done) {
    chai.request(url)
    .post('api/games/inventory')
    .set('jwt', jwtA)
    .send(games[0])
    .end(function(err, res) {
      gameIds[0] = res.body.items._id;
      console.log(res.body);
      done();
    });
  });

  it('should add game', function(done) {
    chai.request(url)
    .post('api/games/inventory')
    .set('jwt', jwtA)
    .send(games[1])
    .end(function(err, res) {
      gameIds[1] = res.body.items._id;
      console.log(res.body);
      done();
    });
  });
  it('should add game', function(done) {
    chai.request(url)
    .post('api/games/inventory')
    .set('jwt', jwtA)
    .send(games[2])
    .end(function(err, res) {
      gameIds[2] = res.body.items._id;
      console.log(res.body);
      done();
    });
  });
  it('should add game', function(done) {
    chai.request(url)
    .post('api/games/inventory')
    .set('jwt', jwtB)
    .send(games[3])
    .end(function(err, res) {
      gameIds[3] = res.body.items._id;
      console.log(res.body);
      done();
    });
  });
  it('should add game', function(done) {
    chai.request(url)
    .post('api/games/inventory')
    .set('jwt', jwtB)
    .send(games[4])
    .end(function(err, res) {
      gameIds[4] = res.body.items._id;
      console.log(res.body);
      done();
    });
  });
  it('should add game', function(done) {
    chai.request(url)
    .post('api/games/inventory')
    .set('jwt', jwtB)
    .send(games[5])
    .end(function(err, res) {
      gameIds[5] = res.body.items._id;
      console.log(res.body);
      done();
    });
  });
  it('should add game', function(done) {
    chai.request(url)
    .post('api/games/inventory')
    .set('jwt', jwtC)
    .send(games[6])
    .end(function(err, res) {
      gameIds[6] = res.body.items._id;
      console.log(res.body);
      done();
    });
  });
  it('should add game', function(done) {
    chai.request(url)
    .post('api/games/inventory')
    .set('jwt', jwtC)
    .send(games[7])
    .end(function(err, res) {
      gameIds[7] = res.body.items._id;
      console.log(res.body);
      done();
    });
  });
  it('should add game', function(done) {
    chai.request(url)
    .post('api/games/inventory')
    .set('jwt', jwtC)
    .send(games[8])
    .end(function(err, res) {
      gameIds[8] = res.body.items._id;
      console.log(res.body);
      done();
    });
  });
  it('should add game', function(done) {
    chai.request(url)
    .post('api/games/inventory')
    .set('jwt', jwtC)
    .send(games[9])
    .end(function(err, res) {
      gameIds[9] = res.body.items._id;
      console.log(res.body);
      done();
    });
  });
  it('should add game', function(done) {
    chai.request(url)
    .post('api/games/inventory')
    .set('jwt', jwtC)
    .send(games[10])
    .end(function(err, res) {
      gameIds[10] = res.body.items._id;
      console.log(res.body);
      done();
    });
  });
  it('should add game', function(done) {
    chai.request(url)
    .post('api/games/inventory')
    .set('jwt', jwtC)
    .send(games[11])
    .end(function(err, res) {
      gameIds[11] = res.body.items._id;
      console.log(res.body);
      done();
    });
  });
  it('should add game', function(done) {
    chai.request(url)
    .post('api/games/inventory')
    .set('jwt', jwtC)
    .send(games[12])
    .end(function(err, res) {
      gameIds[12] = res.body.items._id;
      console.log(res.body);
      done();
    });
  });
  it('should add game', function(done) {
    chai.request(url)
    .post('api/games/inventory')
    .set('jwt', jwtC)
    .send(games[13])
    .end(function(err, res) {
      gameIds[13] = res.body.items._id;
      console.log(res.body);
      done();
    });
  });
  it('should add game', function(done) {
    chai.request(url)
    .post('api/games/inventory')
    .set('jwt', jwtC)
    .send(games[14])
    .end(function(err, res) {
      gameIds[14] = res.body.items._id;
      console.log(res.body);
      done();
    });
  });
  it('should add game', function(done) {
    chai.request(url)
    .post('api/games/inventory')
    .set('jwt', jwtC)
    .send(games[15])
    .end(function(err, res) {
      gameIds[15] = res.body.items._id;
      console.log(res.body);
      done();
    });
  });
  it('should add a favorite', function(done) {
    chai.request(url)
    .post('api/games/favorites')
    .set('jwt', jwtA)
    .send({_id: gameIds[6]})
    .end(function(err, res) {
      //gameIds[6] = res.body._id;
      console.log(res.body);
      done();
    });
  });
  it('should add a favorite', function(done) {
    chai.request(url)
    .post('api/game/favorites')
    .set('jwt', jwtA)
    .send({_id: gameIds[4]})
    .end(function(err, res) {
      //gameIds[6] = res.body._id;
      console.log(res.body);
      done();
    });
  });
  it('should add an outgoing request', function(done) {
    chai.request(url)
    .post('api/games/outgoingrequests')
    .set('jwt', jwtA)
    .send({id: gameIds[4], gameIdArray:[gameIds[0], gameIds[1]]})
    .end(function(err, res) {
      //gameIds[6] = res.body._id;
      console.log(res.body);
      done();
    });
  });

  it('should add an outgoing request', function(done) {
    chai.request(url)
    .post('api/games/outgoingrequests')
    .set('jwt', jwtC)
    .send({id: gameIds[0], gameIdArray:[gameIds[5], gameIds[6]]})
    .end(function(err, res) {
      //gameIds[6] = res.body._id;
      console.log(res.body);
      console.log('the ids are', gameIds);
      done();
    });
  });

});

// _.forEach(games, function(item) {
//   game = new Game(games[item]);
//   game.save(function(err) { return err; });
// });

// _.forEach(users, function(item) {
//   user = new User(users[item]);
//   user.save(function(err) { return err; });
// });

//return {users: users, games: games};
