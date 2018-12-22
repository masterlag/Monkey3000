module.exports = (sequelize, DataTypes) => {
    var Monkeys = sequelize.define('Monkeys', {
      Mname: DataTypes.STRING,
      age: DataTypes.INTEGER,
      taille: DataTypes.FLOAT,
      poids: DataTypes.FLOAT,
      job: DataTypes.STRING,
      enclo: DataTypes.INTEGER
    });
  
    return Monkeys;
  };