import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();

    return res.json(recipients);
  }

  async store(req, res) {
    const {
      id,
      street,
      number,
      complement,
      state,
      city,
      zip,
    } = await Recipient.create(req.body);

    return res.json({ id, street, number, complement, state, city, zip });
  }

  async update(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    const {
      street,
      number,
      complement,
      state,
      city,
      zip,
    } = await recipient.update(req.body);

    return res.json({ id, street, number, complement, state, city, zip });
  }

  async destroy(req, res) {
    const { id } = req.params;
    await Recipient.destroy({ where: { id } });

    return res.send();
  }
}

export default new RecipientController();
