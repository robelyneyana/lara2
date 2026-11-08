module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define("Pet", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  //associations
  Pet.associate = (models) => {
    Pet.belongsTo(models.Customer);
    Pet.hasMany(models.Appointment);
  };

  return Pet;
};
