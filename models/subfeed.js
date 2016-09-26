'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subfeed = sequelize.define('Subfeed', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    params: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Subfeed.belongsTo(models.Feed);
      },

      findPluginsFromFeeds: function(feeds, Feed, Plugin) {
        const feedIds = feeds.map(feed => {
          return feed.id;
        });
        return Subfeed.findAll({
          where: { feedId: { in: feedIds }},
          include: [
            { model: Feed, attributes: ['pluginId'], include: [
              { model: Plugin, attributes: ['path'] }
            ]}
          ]
        });
      }
    },

    instanceMethods: {
      createNewSubfeedPlugin: function(subfeedPlugins) {
        const plugin = this.Feed.Plugin;
        const SubfeedPlugin =
          require(`../plugins/${ plugin.path }/backend.js`);
        subfeedPlugins[this.id] =
          new SubfeedPlugin(this.params);
      }
    }
  });
  return Subfeed;
};
