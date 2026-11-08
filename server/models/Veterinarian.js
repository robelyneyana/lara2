module.exports = (sequelize, DataTypes) => {
  const Veterinarian = sequelize.define("Veterinarian", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  //associations
  Veterinarian.associate = (models) => {
    Veterinarian.hasMany(models.Appointment);
  };

  return Veterinarian;
};
