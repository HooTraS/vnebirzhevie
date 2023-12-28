// OTCBidDetails.jsx
import React, { useState } from 'react';
import styles from './OTCBidDetails.module.scss'; // Подключите стили

export const OTCBidDetails = ({ bidData, onRespond }) => {
  const [responseMessage, setResponseMessage] = useState('');

  const handleRespond = () => {
    // Добавьте код для отправки отклика на сервер или его обработки
    onRespond(responseMessage);
  };

  return (
    <div className={styles.container}>
      <h2>Детали заявки</h2>

      <div className={styles.bidDetails}>
        <p><strong>Действие:</strong> {bidData.type}</p>
        <p><strong>Наименование товара:</strong> {bidData.name_product}</p>
        <p><strong>Объем товара в тоннах:</strong> {bidData.volume}</p>
        <p><strong>Стоимость за 1 тонну с НДС:</strong> {bidData.price_for_1}</p>
        {/* хз что за базис его на бэке нету */}
        <p><strong>Базис поставки:</strong> {bidData.deliveryBasis}</p>
        <p><strong>Место поставки:</strong> {bidData.place_of_delivery}</p>
        <p><strong>Тип контрагента:</strong> {bidData.choice_counteragent}</p>
        {bidData.counterpartyOption === 'Один контрагент' && (
          <p><strong>БИН/ИИН контрагента:</strong> {bidData.bin}</p>
        )}
        <p><strong>Дополнительные сведения:</strong> {bidData.additional_information}</p>
        {/* Добавьте остальные детали заявки */}
      </div>

      <div className={styles.responseSection}>
        <h3>Откликнуться на заявку</h3>
        <textarea value={responseMessage} onChange={(e) => setResponseMessage(e.target.value)} />
        <button onClick={handleRespond}>Отправить отклик</button>
      </div>
    </div>
  );
};

export default OTCBidDetails;