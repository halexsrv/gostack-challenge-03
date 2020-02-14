import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class DeliveriesController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.id,
      },
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

    return res.json(deliveries);
  }
}

export default new DeliveriesController();
