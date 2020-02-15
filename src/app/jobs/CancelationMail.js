import Mail from '../../lib/Mail';

class CancelationMail {
  get key() {
    return 'CancelationMail';
  }

  async handle({ data }) {
    const { delivery } = data;
    // console.log(data);

    // console.log('A fila executou!');

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Encomenda cancelada',
      template: 'cancelation',
      context: {
        deliveryman: delivery.deliveryman.name,
        recipient: `${delivery.recipient.street}, ${delivery.recipient.number}, ${delivery.recipient.complement}, ${delivery.recipient.city} - ${delivery.recipient.state}, ${delivery.recipient.zip}`,
        name: delivery.product,
        delivery_id: delivery.id,
      },
    });
  }
}

export default new CancelationMail();
