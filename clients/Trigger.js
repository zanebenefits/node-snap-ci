// snap docs split this into its own section but it may make more sense to put this functionality in pipeline.js
// https://docs.snap-ci.com/api/manual-trigger/

var withCredentials = require('../lib/withCredentials');

module.exports = function(config) {

  if(!config) throw new Error('config object is required!');

  // trigger a new pipeline
  // POST /project/:owner/:repository/branch/:branch_name/trigger
  this.pipeline = function(repository, branchName) {
    if(!repository) {
      throw new Error('Repository is required');
    }
    if(!branchName) {
      throw new Error('Branch name is required');
    }

    return withCredentials({
      method: 'POST',
      uri: basePipelineUri(config, repository, branchName)
    });
  };

  // trigger a stage within an exisiting pipeline
  // POST /project/:owner/:repository/branch/:branch_name/trigger/:pipeline_counter/:stage_name
  this.stage = function(repository, branchName, counter, stageName) {
    if(!repository) {
      throw new Error('Repository is required');
    }
    if(!branchName) {
      throw new Error('Branch name is required');
    }
    if(!counter) {
      throw new Error('Pipeline counter is required');
    }
    if(!stageName) {
      throw new Error('Stage name is required');
    }   

    return withCredentials({
      method: 'POST',
      uri: basePipelineUri(config, repository, branchName) + '/' + counter + '/' + stageName
    });   
  }
  
};

function basePipelineUri(config, repository, branchName) {
  return [config.SNAP_URI, 'project', config.API_OWNER, repository, 'branch', branchName, 'trigger'].join('/');
}