var proxyquire =  require('proxyquire');
var PipelineClient = require('../clients/Pipeline.js');
var TriggerClient = require('../clients/Trigger.js');

describe('api constructor', function() {
  var snap = require('../index.js');
  var opts;

  beforeEach(function() {
    process.env.NPM_SNAP_API_KEY = '';
    process.env.NPM_SNAP_API_USER = '';
    process.env.NPM_SNAP_API_OWNER = '';
    opts = validOptions();
  });

  it('should require an apiKey', function() {
    expect(function() {
      opts.apiKey = null;
      snap(opts);
    }).toThrow(new Error('apiKey is required as an option or NPM_SNAP_API_KEY env variable'));
  });

  it('should require an apiUser', function() {
    expect(function() {
      opts.apiUser = null;
      snap(opts);
    }).toThrow(new Error('apiUser is required as an option or NPM_SNAP_API_USER env variable'));
  });

  it('should require an apiOwner', function() {
    expect(function() {
      opts.apiOwner = null;
      snap(opts);
    }).toThrow(new Error('apiOwner is required as an option or NPM_SNAP_API_OWNER env variable'));
  });

  it('should expose relevant apis', function() {
    var api = snap(opts);

    expect(api.pipelines instanceof PipelineClient).toBe(true);
    expect(api.trigger instanceof TriggerClient).toBe(true);
  });

  it('should allow required fields to be environment variables', function() {
    var pipelineSpy = jasmine.createSpy('pipeline');
    var triggerSpy = jasmine.createSpy('trigger');

    process.env.NPM_SNAP_API_KEY = 'env-api-key';
    process.env.NPM_SNAP_API_USER = 'env-api-user';
    process.env.NPM_SNAP_API_OWNER = 'env-api-owner';

    var snap = proxyquire('../index.js', {
      './clients/Pipeline.js': pipelineSpy,
      './clients/Trigger.js': triggerSpy
    });

    var api = snap();

    expect(pipelineSpy).toHaveBeenCalledWith({
      API_KEY: 'env-api-key',
      API_USER: 'env-api-user',
      API_OWNER: 'env-api-owner',
      SNAP_URI: 'https://env-api-user:env-api-key@api.snap-ci.com'
    });

    expect(triggerSpy).toHaveBeenCalledWith({
      API_KEY: 'env-api-key',
      API_USER: 'env-api-user',
      API_OWNER: 'env-api-owner',
      SNAP_URI: 'https://env-api-user:env-api-key@api.snap-ci.com'
    });

  });

});

function validOptions() {
  return {
    apiKey: 'some-key',
    apiUser: 'aUserName',
    apiOwner: 'aCompany'
  };
}