import { FC } from 'react';
import { Modal } from 'antd';

type ConfirmationModalProps = {
  value: boolean;
  title: string;
  okText: string;
  cancelText: string;
  onOk: () => void;
  onCancel: () => void;
  show?: () => void;
};

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  value,
  title,
  okText,
  cancelText,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      title={title}
      open={value}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
    >
      <p>Bla bla ...</p>
    </Modal>
  );
};

export default ConfirmationModal;
