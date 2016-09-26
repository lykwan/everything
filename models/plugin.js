const async = require('async');

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Plugin = sequelize.define('Plugin', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Plugin.hasMany(models.Feed, { foreignKey: 'pluginId' });
        Plugin.belongsToMany(models.User, { through: 'Feed' });
      },

      addNewPlugins: function(files) {
        async.each(files, function(file) {
          Plugin.find({
            where: {
              path: file
            }
          }).then(plugin => {
            if (!plugin) {
              Plugin.create({
                name: file,
                path: file
              });
            }
          });
        });
      },

      cleanUpOldPlugins: function(files) {
        Plugin.findAll()
          .then(plugins => {
            async.each(plugins, function(plugin) {
              if (!files.includes(plugin.path)) {
                plugin.destroy();
              }
            });
          });
      },

      findFromSubfeeds: function(subfeeds) {
        let pluginObj = {};
        async.each(subfeeds, function(subfeed) {
          const plugin = subfeed.getPlugin();
          pluginObj[plugin.id] = plugin;
        });
      }
    }
  });
  return Plugin;
};
