'use strict';

angular.module('MisterXAdmin')
.config(['NgAdminConfigurationProvider', 'Config', function(NgAdminConfigurationProvider, Config) {
  var nga = NgAdminConfigurationProvider;
  // create an admin application
  var admin = nga.application('Mister X Admin')
      .baseApiUrl('http://localhost:3001/');

  // locations service
  var locations = nga.entity('locations')
    .identifier(nga.field('_id'));
  locations.listView()
    .perPage(10)
    .fields([
      nga.field('_id'),
      nga.field('group', 'string'),
      nga.field('lat'),
      nga.field('lng'),
    ])
    .listActions(['show', 'edit', 'delete']);
   admin.addEntity(locations);

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
      nga.field('github.id').label('GitHub ID'),
      nga.field('github.username').label('GitHub Username'),
      nga.field('github.$ref').label('GitHub URL')
    ]);
  users.showView()
    .fields([
      nga.field('_id'),
      users.editionView().fields()
    ]);
  admin.addEntity(users);

  // attach the admin application to the DOM and run it
  nga.configure(admin);
}]);

