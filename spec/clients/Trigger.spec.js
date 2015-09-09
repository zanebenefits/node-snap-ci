var REPO_NAME = 'someProject';
var BRANCH_NAME = 'myBranch';
var COUNTER = '777';
var STAGE_NAME = 'production';

var proxyquire =  require('proxyquire')

describe('Trigger Client', function() {
  var client;
  var withCredentialsSpy;

  beforeEach(function() {
    withCredentialsSpy = jasmine.createSpy('withCredentials');
    var PipelineClient = proxyquire('../../clients/Trigger.js', {'../lib/withCredentials': withCredentialsSpy});
    client = new PipelineClient(validConfig());
  });


  describe('trigger a whole new pipeline', function() {
    it('should require a repository and branch name', function() {
      expect(function() {
        client.pipeline(null, null);
      }).toThrow(new Error('Repository is required'));

      expect(function() {
        client.pipeline(REPO_NAME, null);
      }).toThrow(new Error('Branch name is required'));
    });

    it('should use the branch that is provided', function() {
      client.pipeline(REPO_NAME, BRANCH_NAME);

      expect(withCredentialsSpy).toHaveBeenCalledWith({
        method: 'POST',
        uri: 'https://mock-snap-uri/project/aCompany/someProject/branch/myBranch/trigger'
      });
    });
  });

  describe('trigger a manual stage in an existing pipeline', function() {
    it('should require a repository, branch name, counter, and stage name.', function() {
      expect(function() {
        client.stage(null, null);
      }).toThrow(new Error('Repository is required'));

      expect(function() {
        client.stage(REPO_NAME, null);
      }).toThrow(new Error('Branch name is required'));

      expect(function() {
        client.stage(REPO_NAME, BRANCH_NAME);
      }).toThrow(new Error('Pipeline counter is required'));

      expect(function() {
        client.stage(REPO_NAME, BRANCH_NAME, COUNTER);
      }).toThrow(new Error('Stage name is required'));
    });

    it('should POST to snap-ci with the correct parameters', function() {
      client.stage(REPO_NAME, BRANCH_NAME, COUNTER, STAGE_NAME);

      expect(withCredentialsSpy).toHaveBeenCalledWith({
        method: 'POST',
        uri: 'https://mock-snap-uri/project/aCompany/someProject/branch/myBranch/trigger/777/production'
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