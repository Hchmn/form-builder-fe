import { useWorkbench } from '@designable/react';
import { Observer } from '@formily/react';
import { Workspace } from './Workspace';
import { Field } from './components';
import { Form } from './components/Form/component';
import { Input } from './components/Input/component';
import { CloseableTag } from '../../components/tabs/ClosableTag';
import { CloseOutlined } from '@ant-design/icons';

export const WorkspaceManager = () => {
  const workbench = useWorkbench();

  const workspaceTabs = () =>
    workbench.mapWorkspace((workspace) => (
      <CloseableTag
        label={workspace.title}
        color={
          workbench.currentWorkspace.id === workspace.id ? 'blue' : 'default'
        }
        closable={true}
        onClick={() => {
          workbench.switchWorkspace(workspace.id);
          workbench.setActiveWorkspace(workspace);
        }}
        onClose={() => {
          workbench.removeWorkspace(workspace.id);
        }}
        closeIcon={
          <CloseOutlined
            style={{ marginLeft: 8, cursor: 'pointer', color: '#999' }}
          />
        }
      />
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
