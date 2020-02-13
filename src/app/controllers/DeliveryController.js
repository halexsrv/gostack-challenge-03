import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import NotificationMail from '../jobs/NotificationMail';
import Queue from '../../lib/Queue';

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

    await delivery.update(req.body);

    const updated = await Delivery.findByPk(id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip',
          ],
        },
      ],
    });

    if (updated.deliveryman.name) {
      await Queue.add(NotificationMail.key, {
        delivery: updated,
      });
    }

    return res.json(updated);
  }

  async destroy(req, res) {
    const { id } = req.params;
    await Delivery.destroy({ where: { id } });

    return res.send();
  }
}

export default new DeliveryController();
