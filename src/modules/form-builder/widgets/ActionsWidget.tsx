import { useWorkbench } from '@designable/react';
import { Button } from 'antd';

export const ActionsWidget = () => {
  const workbench = useWorkbench();

  const addWorkspace = () => {
    let number = 0;
    // TODO: Remove experimental
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    workbench.eachWorkspace((_workspace, _index) => {
      number += 1;
    });

    const formTitle = `form-${number}`;

    workbench.addWorkspace({ id: formTitle, title: formTitle });
  };

  return (
    <>
      <Button onClick={addWorkspace}>Add workspace</Button>
    </>
  );
};
