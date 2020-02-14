import Mail from '../../lib/Mail';

class NotificationMail {
  get key() {
    return 'NotificationMail';
  }

  async handle({ data }) {
    const { delivery } = data;
    // console.log(data);

    // console.log('A fila executou!');

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Nova encomenda disponível',
      template: 'notification',
      context: {
        deliveryman: delivery.deliveryman.name,
        recipient: `${delivery.recipient.street}, ${delivery.recipient.number}, ${delivery.recipient.complement}, ${delivery.recipient.city} - ${delivery.recipient.state}, ${delivery.recipient.zip}`,
        name: delivery.product,
      },
    });
  }
}

export default new NotificationMail();
