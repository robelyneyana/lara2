module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("Appointment", {
    appointmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  //associations
  Appointment.associate = (models) => {
    Appointment.hasMany(models.Veterinarian);
    Appointment.belongsTo(models.Customer);
    Appointment.belongsTo(models.Pet);
    Appointment.hasMany(models.Treatment);
  };

  return Appointment;
};
