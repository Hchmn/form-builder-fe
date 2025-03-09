import { useWorkbench } from '@designable/react';
import { Observer } from '@formily/react';
import { Workspace } from './Workspace';
import { Field } from './components';
import { Form } from './components/Form/component';
import { Input } from './components/Input/component';
import { WorkspaceTab } from '../../components/tabs/WorkspaceTab';

export const WorkspaceManager = () => {
  const workbench = useWorkbench();

  const workspaceTabs = () =>
    workbench.mapWorkspace((workspace) => (
      <WorkspaceTab workspace={workspace}/>
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
