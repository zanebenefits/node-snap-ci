// snap-ci client
var PipelineClient = require('./clients/Pipeline.js');
var TriggerClient = require('./clients/Trigger.js');

var config = {
  API_KEY: null,
  API_USER: null,
  API_OWNER: null,
  SNAP_URI: null
};

module.exports = function(opts) {
  opts = opts || {};

  config.API_KEY = opts.apiKey || process.env.NPM_SNAP_API_KEY;
  config.API_USER = opts.apiUser || process.env.NPM_SNAP_API_USER;
  config.API_OWNER = opts.apiOwner || process.env.NPM_SNAP_API_OWNER;

  if(!config.API_KEY) throw new Error('apiKey is required as an option or NPM_SNAP_API_KEY env variable');
  if(!config.API_USER) throw new Error('apiUser is required as an option or NPM_SNAP_API_USER env variable');
  if(!config.API_OWNER) throw new Error('apiOwner is required as an option or NPM_SNAP_API_OWNER env variable');

  config.SNAP_URI = ['https://', config.API_USER, ':', config.API_KEY, '@', 'api.snap-ci.com'].join('');

  return {
    pipelines: new PipelineClient(config),
    trigger: new TriggerClient(config)
  };
};
