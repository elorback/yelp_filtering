// models/YelpData.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const YelpModel = sequelize.define('YelpModel', {
  business_id: {
    type: DataTypes.STRING,
    allowNull: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postal_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  stars: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  review_count: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_open: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  categories: {
    type: DataTypes.STRING(512),
    allowNull: true,
    
    
  },
}, {
  tableName: 'yelp_data',
  timestamps: false,
});



module.exports = YelpModel;
