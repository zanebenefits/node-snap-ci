// https://docs.snap-ci.com/api/pipelines/

var DEFAULT_BRANCH = 'master';
var withCredentials = require('../lib/withCredentials');

module.exports = function(config) {
  if(!config) throw new Error('config object is required!');

  // GET /project/:owner/:repository/branch/:branch_name/pipelines
  // TODO support pagination - currently you will only ever get up to 25 results
  // TODO unwrap snap response?
  this.all = function(repository, branchName) {
    if(!repository) {
      throw new Error('Repository is required');
    }
    branchName = branchName || DEFAULT_BRANCH;

    return withCredentials({
      method: 'GET',
      uri: basePipelineUri(config, repository, branchName)
    });
  };

  // GET /project/:owner/:repository/branch/:branch_name/pipelines/:pipeline_counter
  this.byCounter = function(repository, branchName, counter) {
    if(!repository) {
      throw new Error('Repository is required');
    }
    if(!branchName) {
      throw new Error('Branch name is required');
    }
    if(!counter) {
      throw new Error('Pipeline counter is required');
    }

    return withCredentials({
      method: 'GET',
      uri: basePipelineUri(config, repository, branchName) + '/' + counter
    });
  };

  // GET /project/:owner/:repository/pull/:pull_request_counter/pipelines/{latest,newest}
  this.latest = function(repository, branchName) {
    if(!repository) {
      throw new Error('Repository is required');
    }
    branchName = branchName || DEFAULT_BRANCH;

    return withCredentials({
      method: 'GET',
      uri: basePipelineUri(config, repository, branchName) + '/latest'
    });
  };

  // GET /project/:owner/:repository/branch/:branch_name/pipelines/{oldest,earliest}
  this.oldest = function(repository, branchName) {
    if(!repository) {
      throw new Error('Repository is required');
    }
    branchName = branchName || DEFAULT_BRANCH;

    return withCredentials({
      method: 'GET',
      uri: basePipelineUri(config, repository, branchName) + '/oldest'
    });
  };
};

function basePipelineUri(config, repository, branchName) {
  return [config.SNAP_URI, 'project', config.API_OWNER, repository, 'branch', branchName, 'pipelines'].join('/')
}