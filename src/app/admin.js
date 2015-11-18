angular.module('MisterXAdmin', ['ng-admin', 'angular-jwt', 'satellizer'])
.constant('Config', {
  ENV: {
    'SERVER_URL': 'http://localhost:3001',
    'GITHUB_CLIENT_ID': 'd03b234ae7ea7d56bc6e'
  }
});

