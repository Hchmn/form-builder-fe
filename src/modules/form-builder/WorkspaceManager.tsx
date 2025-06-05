import { useWorkbench } from '@designable/react';
import { Observer } from '@formily/react';
import { Workspace } from './Workspace';
import { Field } from './components';
import { Form } from './components/Form/component';
import { Input } from './components/Input/component';
import { CloseableTag } from '../../components/tabs/ClosableTag';
import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { Engine } from '@designable/core';
import { saveSchema } from './service';

export const WorkspaceManager = () => {
  const workbench = useWorkbench();

  const handleSave = (id: string, engine: Engine) => {
    saveSchema(engine);
    workbench.removeWorkspace(id);

    return true;
  };

  const handleClose = (id: string) => {
    workbench.removeWorkspace(id);
    return true;
  };

  const workspaceTabs = () =>
    workbench.mapWorkspace((workspace) => (
      <CloseableTag
        label={workspace.title}
        color={
          workbench.currentWorkspace.id === workspace.id ? 'blue' : 'default'
        }
        closable={workbench.workspaces.length > 1}
        onClick={() => {
          workbench.switchWorkspace(workspace.id);
          workbench.setActiveWorkspace(workspace);
        }}
        onClose={() => {
          Modal.confirm({
            title: 'Save Changes',
            content: 'Do you want to save changes to local?',
            onCancel: () => {
              handleClose(workspace.id);
            },
            onOk: () => {
              handleSave(workspace.id, workbench.engine);
            },
            okText: 'Save',
            cancelText: 'Close',
          });
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
