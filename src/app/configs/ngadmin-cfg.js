'use strict';

angular.module('MisterXAdmin')
.config(function(NgAdminConfigurationProvider, Config) {
  var nga = NgAdminConfigurationProvider;
  // create an admin application
  var admin = nga.application('Mister X Admin')
      .baseApiUrl(Config.ENV.SERVER_URL + '/');

  // users service
  var users = nga.entity('users')
    .identifier(nga.field('_id'));
  users.listView()
    .perPage(10)
    .fields([
      nga.field('_id'),
      nga.field('github.username').label('GitHub')
    ])
    .listActions(['show', 'edit', 'delete']);
  users.creationView()
    .fields([
      nga.field('githubId')
    ]);
  users.editionView()
    .fields([
      nga.field('active', 'boolean').validation({ required: true }).label('Active?'),
      nga.field('admin', 'boolean').validation({ required: true }).label('Admin?'),
      nga.field('github.id').editable(false).label('GitHub ID'),
      nga.field('github.username').editable(false).label('GitHub Username'),
      nga.field('github.url').editable(false).label('GitHub URL')
    ]);
  users.showView()
    .fields([
      nga.field('_id'),
      users.editionView().fields()
    ]);
  admin.addEntity(users);

  // locations service
  var locations = nga.entity('locations')
   .identifier(nga.field('_id'));
  locations.listView()
   .perPage(100)
   .fields([
    nga.field('_id'),
    nga.field('user', 'reference')
     .targetEntity(users)
     .targetField(nga.field('github.username'))
     .label('User'),
    nga.field('group', 'string'),
    nga.field('lat'),
    nga.field('lng'),
    nga.field('client.time', 'datetime')
   ])
   .listActions(['delete']);
  admin.addEntity(locations);


   // game service
   var games = nga.entity('games')
    .identifier(nga.field('_id'));
   games.listView()
    .perPage(10)
    .fields([
      nga.field('_id'),
      nga.field('name'),
      nga.field('start', 'datetime'),
      nga.field('end', 'datetime')
    ])
    .listActions(['show', 'edit', 'delete']);
   games.creationView()
    .fields([
      nga.field('name'),
      nga.field('start', 'datetime'),
      nga.field('end', 'datetime')
    ]);
   games.editionView()
    .fields([
      nga.field('name'),
      nga.field('start', 'datetime'),
      nga.field('end', 'datetime')
    ]);
   games.showView()
    .fields([
      nga.field('_id'),
      games.editionView().fields()
    ]);
   admin.addEntity(games);

  var locationCollection = nga.collection(locations)
    .name('recent_locations')
    .title('Recent locations')
    .perPage(10)
    .fields([
      nga.field('group', 'string'),
      nga.field('lat'),
      nga.field('lng'),
      nga.field('client.time', 'datetime')
    ])
    .sortField('_id')
    .sortDir('DESC')
    .order(1);

  var userCollection = nga.collection(users)
    .name('recent_users')
    .title('Recent users')
    .perPage(10)
    .fields([
      nga.field('_id'),
      nga.field('github.username').label('GitHub'),
      nga.field('admin', 'boolean').validation({ required: true }).label('Admin')
    ])
    .sortField('_id')
    .sortDir('DESC')
    .order(2);

   var gameCollection = nga.collection(games)
    .name('games')
    .title('Games')
    .perPage(10)
    .fields([
      nga.field('_id'),
      nga.field('name').label('Name'),
      nga.field('start', 'datetime'),
      nga.field('end', 'datetime')
    ])
    .sortField('_id')
    .sortDir('DESC')
    .order(2);

  admin.dashboard(
    nga.dashboard()
      .addCollection(locationCollection)
      .addCollection(userCollection)
      .addCollection(gameCollection)
  );

  // attach the admin application to the DOM and run it
  nga.configure(admin);
});

