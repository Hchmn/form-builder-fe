import { FC } from 'react';
import { Workspace } from '@designable/core';
import { Tag } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useWorkbench } from '@designable/react';

interface WorkspaceTabProps {
  workspace: Workspace;
}

export const WorkspaceTab: FC<WorkspaceTabProps> = ({ workspace }) => {
  const workbench = useWorkbench();
  return (
    <>
      <Tag
        onClick={() => {
          workbench.switchWorkspace(workspace.id);
          workbench.setActiveWorkspace(workspace);
        }}
        color={
          workbench.currentWorkspace.id === workspace.id ? 'blue' : 'default'
        }
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5px 10px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        <span>{workspace.title}</span>
        <CloseOutlined
          onClick={() => {
            // add trigger here for modal to open (Save unsave changes)
            workbench.removeWorkspace(workspace.id);
          }}
          style={{ marginLeft: 8, cursor: 'pointer', color: '#999' }}
        />
      </Tag>
    </>
  );
};
