import Delivery from '../models/Delivery';

import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import CancelationMail from '../jobs/CancelationMail';
import Queue from '../../lib/Queue';

class DeliveryCancelController {
  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
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

    /**
     * Validate if delivery is canceled
     */
    if (!delivery) {
      return res.status(400).json({ error: 'The delivery not exists' });
    }

    /**
     * Validate if delivery is canceled
     */
    if (delivery.canceled_at) {
      return res.status(400).json({ error: 'The order is already canceled' });
    }

    const updated = await delivery.update({
      canceled_at: new Date(),
    });

    await Queue.add(CancelationMail.key, {
      delivery: updated,
    });

    return res.status(200).json();
  }
}

export default new DeliveryCancelController();
