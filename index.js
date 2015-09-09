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

  if(!config.API_KEY) throw new Error('apiKey is required!');
  if(!config.API_USER) throw new Error( 'apiUser is required!');
  if(!config.API_OWNER) throw new Error( 'apiOwner is required!');

  config.SNAP_URI = ['https://', config.API_USER, ':', config.API_KEY, '@', 'api.snap-ci.com'].join('');

  return {
    pipelines: new PipelineClient(config),
    trigger: new TriggerClient(config)
  };
};
