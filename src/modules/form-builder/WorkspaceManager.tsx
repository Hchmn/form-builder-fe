import { useWorkbench } from '@designable/react';
import { Observer } from '@formily/react';
import { Button } from 'antd';
import { Workspace } from './Workspace';
import { Field } from './components';
import { Form } from './components/Form/component';
import { Input } from './components/Input/component';

export const WorkspaceManager = () => {
  const workbench = useWorkbench();

  const workspaceTabs = () =>
    workbench.mapWorkspace((workspace) => (
      <Button
        onClick={() => {
          workbench.switchWorkspace(workspace.id);
          workbench.setActiveWorkspace(workspace);
        }}
        disabled={workbench.currentWorkspace.id === workspace.id}
        key={'workspace-tab-' + workspace.id}
      >
        {workspace.title}
      </Button>
    ));

  return (
    <>
      <Observer>
        {() => (
          <Workspace
            widgetComponents={{ Field, Input, Form }}
            activeWorkspace={workbench.currentWorkspace}
            workspaceTabs={workspaceTabs}
          />
        )}
      </Observer>
    </>
  );
};
