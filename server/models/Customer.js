module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNo: {
      type: DataTypes.STRING(11),
    },
  });
  //associations
  Customer.associate = (models) => {
    Customer.hasMany(models.Pet);
    Customer.hasMany(models.Appointment);
  };

  return Customer;
};
