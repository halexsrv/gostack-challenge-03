import Delivery from '../models/Delivery';

class DeliveryController {
  async index(req, res) {
    const delivery = await Delivery.findAll();

    return res.json(delivery);
  }

  async store(req, res) {
    const delivery = await Delivery.create(req.body);

    return res.json(delivery);
  }

  async update(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    const result = await delivery.update(req.body);

    return res.json(result);
  }

  async destroy(req, res) {
    const { id } = req.params;
    await Delivery.destroy({ where: { id } });

    return res.send();
  }
}

export default new DeliveryController();
