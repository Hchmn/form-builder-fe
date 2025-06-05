import { useCallback, useState } from 'react';

const useModal = () => {
  const [data, setData] = useState<any | null>();
  const [show, setShow] = useState<boolean>(false);

  const handleShowModal = useCallback((data: any | null) => {
    setShow(true);
    setData(data);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShow(false);
    setData(null);
  }, []);

  return { show, onClose: handleCloseModal, onShow: handleShowModal, data };
};

export default useModal;
