import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Signature from '../app/models/Signature';
import Deliveryman from '../app/models/Deliveryman';
import Delivery from '../app/models/Delivery';
import DeliveryProblem from '../app/models/DeliveryProblem';

import databaseConfig from '../config/database';

const models = [
  User,
  Recipient,
  File,
  Deliveryman,
  Delivery,
  Signature,
  DeliveryProblem,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));

    models.map(
      model => model.associate && model.associate(this.connection.models)
    );

    // models
    //   .map(model => model.init(this.connection))
    //   .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
