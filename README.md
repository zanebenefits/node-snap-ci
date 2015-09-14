snap-ci api
===========

Very basic, unofficial npm module to interact with the [Snap-CI](https://snap-ci.com) API.

##Usage##

###Authentication###
You can pass credentials into the api constructor:
```
var snap = require('node-snap-ci')({
  apiKey: 'my-api-key',
  apiUser: 'my-api-user',
  apiOwner: 'api-owner'
});
```

Or use environment variables:
```
export NPM_SNAP_API_KEY = 'my-api-key'
export NPM_SNAP_API_USER = 'my-api-user'
export NPM_SNAP_API_OWNER = 'api-owner'

----

var snap = require('node-snap-ci')();
```

###Pipelines###
Branch Name is optional on all methods except but `byCounter`. When the branch is not provided it defaults to `master`.

####Get all pipelines for a project####

```
snap.pipelines.all('my-github-project', 'my-branch').then(function(data) {
  // do stuff with data
});
```

####Get specific pipeline by counter####

```
snap.pipelines.byCounter('my-github-project', 'my-branch', 23).then(function(data) {
  // do stuff with pipeline #23
});
```

####Get latest pipeline####

```
snap.pipelines.latest('my-github-project', 'my-branch').then(function(data) {
  // do stuff with the latest pipeline
});
```

####Get oldest pipeline####

```
snap.pipelines.oldest('my-github-project', 'my-branch').then(function(data) {
  // do stuff with the oldest pipeline
});
```

###Trigger###

####Trigger a whole new pipeline####

```
snap.trigger.pipeline('my-github-project', 'my-branch');
```

####Trigger a manual stage in an existing pipeline####

```
snap.trigger.stage('my-github-project', 'my-branch', 23, 'deploy-production');
```


##Contributing##
Install jasmine and watch globally? `npm install -g jasmine watch`

Run tests: `npm run test`

Development Mode: `npm run test:watch`

##TODO##
So many things...
* Pagination
* Pull request pipelines
* Artifact Client