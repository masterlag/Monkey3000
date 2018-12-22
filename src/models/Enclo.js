module.exports = (sequelize, DataTypes) => {
    var Enclos = sequelize.define('Enclos', {
      TailleMax: DataTypes.INTEGER,
      EncloName: DataTypes.STRING
    });
  
    return Enclos;
  };