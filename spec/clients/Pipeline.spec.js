var REPO_NAME = 'someProject';
var BRANCH_NAME = 'myBranch';
var COUNTER = '777';
var proxyquire =  require('proxyquire');

describe('Pipline Client', function() {
  var client;
  var withCredentialsSpy;

  beforeEach(function() {
    withCredentialsSpy = jasmine.createSpy('withCredentials');
    var PipelineClient = proxyquire('../../clients/Pipeline.js', {'../lib/withCredentials': withCredentialsSpy});
    client = new PipelineClient(validConfig());
  });


  describe('get all pipelines', function() {
    it('should require a repository', function() {
      expect(function() {
        client.all();
      }).toThrow(new Error('Repository is required'));
    });

    it('should use "master" as the default branch when one isnt provided', function() {
      client.all(REPO_NAME);

      expect(withCredentialsSpy).toHaveBeenCalledWith({
        method: 'GET',
        uri: 'https://mock-snap-uri/project/aCompany/someProject/branch/master/pipelines'
      });
    });

    it('should use the branch that is provided', function() {
      client.all(REPO_NAME, BRANCH_NAME);

      expect(withCredentialsSpy).toHaveBeenCalledWith({
        method: 'GET',
        uri: 'https://mock-snap-uri/project/aCompany/someProject/branch/myBranch/pipelines'
      });
    });
  });

  describe('get by pipeline counter', function() {
    it('should validate parameters', function() {
      expect(function() {
        client.byCounter(null, null, null);
      }).toThrow(new Error('Repository is required'));

      expect(function() {
        client.byCounter(REPO_NAME, null, null);
      }).toThrow(new Error('Branch name is required'));

      expect(function() {
        client.byCounter(REPO_NAME, BRANCH_NAME, null);
      }).toThrow(new Error('Pipeline counter is required'));
    });

    it('should use the provided paramters to make the request', function() {
      client.byCounter(REPO_NAME, BRANCH_NAME, COUNTER);

      expect(withCredentialsSpy).toHaveBeenCalledWith({
        method: 'GET',
        uri: 'https://mock-snap-uri/project/aCompany/someProject/branch/myBranch/pipelines/777'
      });
    });
  });

  describe('get the latest pipeline', function() {
    it('should require a repository', function() {
      expect(function() {
        client.latest();
      }).toThrow(new Error('Repository is required'));
    });

    it('should use "master" as the default branch when one isnt provided', function() {
      client.latest(REPO_NAME);

      expect(withCredentialsSpy).toHaveBeenCalledWith({
        method: 'GET',
        uri: 'https://mock-snap-uri/project/aCompany/someProject/branch/master/pipelines/latest'
      });
    });

    it('should use the branch that is provided', function() {
      client.latest(REPO_NAME, BRANCH_NAME);

      expect(withCredentialsSpy).toHaveBeenCalledWith({
        method: 'GET',
        uri: 'https://mock-snap-uri/project/aCompany/someProject/branch/myBranch/pipelines/latest'
      });
    });
  });

  describe('get the oldest pipeline', function() {
    it('should require a repository', function() {
      expect(function() {
        client.oldest();
      }).toThrow(new Error('Repository is required'));
    });

    it('should use "master" as the default branch when one isnt provided', function() {
      client.oldest(REPO_NAME);

      expect(withCredentialsSpy).toHaveBeenCalledWith({
        method: 'GET',
        uri: 'https://mock-snap-uri/project/aCompany/someProject/branch/master/pipelines/oldest'
      });
    });

    it('should use the branch that is provided', function() {
      client.oldest(REPO_NAME, BRANCH_NAME);

      expect(withCredentialsSpy).toHaveBeenCalledWith({
        method: 'GET',
        uri: 'https://mock-snap-uri/project/aCompany/someProject/branch/myBranch/pipelines/oldest'
      });
    });
  });
});

function validConfig() {
  return {
    API_OWNER: 'aCompany',
    SNAP_URI: 'https://mock-snap-uri'
  };
}