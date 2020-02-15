import {
  parseISO,
  isToday,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isAfter,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';

class ReceivedController {
  async store(req, res) {
    const { delivery_id, start_date: date } = req.body;

    const delivery = await Delivery.findByPk(delivery_id);

    /**
     * Validate 5 max order for delirevyman of day
     */
    const searchDate = new Date();
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: delivery.deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
        // end_date: null,
      },
    });
    if (deliveries.length >= 5) {
      return res
        .status(400)
        .json({ error: 'Maximum 5 orders for a deliveryman' });
    }
    const dateReceived = parseISO(date);

    /**
     * Check date is today
     */
    if (!isToday(dateReceived)) {
      return res.status(400).json({ error: 'Date received is not today' });
    }

    /**
     * Check hour is valid
     */
    const initHour = setSeconds(setMinutes(setHours(new Date(), 8), 0), 0);
    const endHour = setSeconds(setMinutes(setHours(new Date(), 18), 0), 0);

    if (!(isBefore(dateReceived, endHour) && isAfter(dateReceived, initHour))) {
      return res.status(400).json({ error: 'Hour received is not valid' });
    }

    const {
      id,
      product,
      canceled_at,
      start_date,
      end_date,
      recipient_id,
    } = await delivery.update({ start_date: dateReceived });

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

export default new ReceivedController();
