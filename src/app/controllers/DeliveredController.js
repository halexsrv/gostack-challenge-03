import { parseISO, isToday, isAfter } from 'date-fns';
import Delivery from '../models/Delivery';

class DeliveredController {
  async store(req, res) {
    const { delivery_id, date } = req.body;

    const delivery = await Delivery.findByPk(delivery_id);

    const dateDelivered = parseISO(date);

    /**
     * Check date is today
     */
    if (!isToday(dateDelivered)) {
      return res.status(400).json({ error: 'Date delivered is not today' });
    }

    /**
     * Check if hour is after now
     */
    if (!isAfter(new Date(), dateDelivered)) {
      return res.status(400).json({ error: 'Hour delivered is after now' });
    }

    const {
      id,
      product,
      canceled_at,
      start_date,
      end_date,
      recipient_id,
    } = await delivery.update({ end_date: dateDelivered });

    return res.json({
      id,
      product,
      canceled_at,
      start_date,
      end_date,
      recipient_id,
      delivery_id,
    });
  }
}

export default new DeliveredController();
