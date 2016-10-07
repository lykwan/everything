const async = require('async');
const config = require('../plugins/config.json');
console.log(config);

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
    },
    logo: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Plugin.hasMany(models.Feed, { foreignKey: 'pluginId' });
        Plugin.belongsToMany(models.User, { through: 'Feed' });
      },

      addNewPlugins: function(files) {
        async.each(files, function(file) {
          if (file !== "config.json") {
            Plugin.find({
              where: {
                path: file
              }
            }).then(plugin => {
              if (!plugin) {
                let name = config[file] && config[file].name ?
                            config[file].name :
                            file;
                let logo = config[file] && config[file].logo ?
                            config[file].logo :
                            null;
                            console.log(logo);
                Plugin.create({
                  name: name,
                  logo: logo,
                  path: file
                });
              }
            });
          }
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
