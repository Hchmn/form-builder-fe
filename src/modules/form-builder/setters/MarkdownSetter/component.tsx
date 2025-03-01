import React from 'react';
import { usePrefix, useTheme } from '@designable/react';
import { observer, ReactFC } from '@formily/react';
import { observable } from '@formily/reactive';
import { Button, Input, Modal } from 'antd';
import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './styles.less';
import cls from 'classnames';

interface TitleProps {
  title: string;
}

interface MarkDownSetterProps extends ReactFC<unknown> {
  className: string;
  value: string;
  onChange: (row: string) => void;
}

const Header = ({ title }: TitleProps) => {
  const prefix = usePrefix('data-source-setter');
  return (
    <div className={`${prefix + '-layout-item-header'}`}>
      <div className={`${prefix + '-layout-item-title'}`}>{title}</div>
    </div>
  );
};

const MarkdownSetter = observer((props: MarkDownSetterProps) => {
  const { className, value = '', onChange } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const theme = useTheme();
  const prefix = usePrefix('markdown-setter');
  const rawValue = useMemo(
    () =>
      observable({
        raw: value,
      }),
    [value],
  );

  return (
    <React.Fragment>
      <Button block onClick={openModal}>
        Edit
      </Button>
      <Modal
        title="Edit Label"
        width="65%"
        bodyStyle={{ padding: 10 }}
        transitionName=""
        maskTransitionName=""
        open={modalVisible}
        onCancel={closeModal}
        onOk={() => {
          onChange(rawValue.raw);
          closeModal();
        }}
      >
        <div
          className={`${cls(prefix, className)} ${prefix + '-' + theme} ${
            prefix + '-layout'
          }`}
        >
          <div className={`${prefix + '-layout-item left'}`}>
            <Header title="Edit here" />
            <div className={`${prefix + '-layout-item-content'}`}>
              <Input.TextArea
                value={rawValue.raw}
                onChange={(e) => {
                  rawValue.raw = e.target.value;
                }}
                placeholder="Edit here"
                bordered={false}
                style={{ height: '100%' }}
                autoSize
              />
            </div>
          </div>
          <div className={`${prefix + '-layout-item right'}`}>
            <Header title="Preview" />
            <div className={`${prefix + '-layout-item-content'}`}>
              <ReactMarkdown children={rawValue.raw} />
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
});

export default MarkdownSetter;
