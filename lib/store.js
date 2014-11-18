var _ = require('underscore');

module.exports = {
  store: function (spec) {
    var obj = _.extend({}, spec);
    _.each(_.keys(obj), function(key) {
      obj[key] = _.bind(obj[key], obj);
    });
    return obj;
  } 
};
