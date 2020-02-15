import { parseISO, isToday, isAfter, isDate } from 'date-fns';

import Delivery from '../models/Delivery';

class DeliveredController {
  async store(req, res) {
    const { delivery_id, end_date: date } = req.body;

    const delivery = await Delivery.findByPk(delivery_id);

    const dateDelivered = parseISO(date);

    /**
     * Check if order is received
     */
    if (!isDate(delivery.start_date)) {
      return res.status(400).json({ error: 'Delivery is not received' });
    }

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

    /**
     * Check date delivered is before than received
     */
    const { start_date: dateReceived } = await Delivery.findByPk(delivery_id);
    if (!isAfter(dateDelivered, dateReceived)) {
      return res
        .status(400)
        .json({ error: 'Hour delivered is before than hour received' });
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
