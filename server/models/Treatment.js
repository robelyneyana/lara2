module.exports = (sequelize, DataTypes) => {
  const Treatment = sequelize.define("Treatment", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  //associations
  Treatment.associate = (models) => {
    Treatment.belongsTo(models.Appointment);
  };

  return Treatment;
};
