import { FC, ReactNode } from 'react';
import { Tag } from 'antd';

interface ClosableTagProps {
  closeIcon?: ReactNode;
  color: string;
  icon?: ReactNode;
  label: string;
  closable: boolean;
  onClick: () => void;
  onClose: () => void;
}

export const CloseableTag: FC<ClosableTagProps> = ({
  closeIcon,
  color,
  icon,
  label,
  closable,
  onClick,
  onClose,
}) => {
  return (
    <>
      <Tag
        onClick={onClick}
        color={color}
        icon={icon}
        closeIcon={closeIcon}
        closable={closable}
        onClose={(e) => {
          e.preventDefault();
          onClose();
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5px 10px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        {label}
      </Tag>
    </>
  );
};
