import { useWorkbench } from '@designable/react';
import { Button } from 'antd';
import { GenerateRandomId } from '../../../constants';

export const ActionsWidget = () => {
  const workbench = useWorkbench();

  const addWorkspace = () => {
    let number = 1;
    // TODO: Remove experimental
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    workbench.eachWorkspace((_workspace, _index) => {
      number += 1;
    });

    const formTitle = `Form-${number}`;

    workbench.addWorkspace({ id: GenerateRandomId(25), title: formTitle });
  };

  return (
    <>
      <Button onClick={addWorkspace}>Add workspace</Button>
    </>
  );
};
