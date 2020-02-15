import Delivery from '../models/Delivery';

class DeliveryCancelController {
  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

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

    await delivery.update({
      canceled_at: new Date(),
    });

    return res.status(200).json();
  }
}

export default new DeliveryCancelController();
