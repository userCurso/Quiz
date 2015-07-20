module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Quiz',
    { pregunta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: 'Ingrese la pregunta'}}
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: 'Ingrese la respuesta'}}
      },
      tema: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: 'Elegir una opción'}}
      }
    }
  );



}
