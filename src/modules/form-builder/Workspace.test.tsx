import { Engine } from '@designable/core';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Designer, useDesigner } from '@designable/react';
import { FC } from 'react';
import { WorkspaceManager } from './WorkspaceManager';
import { transformToSchema } from '@designable/formily-transformer';

describe('Workspace', () => {
  const INITIAL_WORKSPACE_ID = 'initial';
  const Editor: FC<{ workspaceIds: string[] }> = ({
    children,
    workspaceIds,
  }) => {
    // To prevent any observer drivers on events
    const engine = new Engine({});
    engine.workbench.addWorkspace({
      id: INITIAL_WORKSPACE_ID,
      title: INITIAL_WORKSPACE_ID,
    });
    for (const workspaceId of workspaceIds)
      engine.workbench.addWorkspace({ id: workspaceId, title: workspaceId });

    return <Designer engine={engine}>{children}</Designer>;
  };

  it('disables active workspace tab button', async () => {
    const WORKSPACE_ID = 'form-id';
    const result = render(
      <Editor workspaceIds={[WORKSPACE_ID]}>
        <WorkspaceManager />
      </Editor>,
    );

    await userEvent.click(result.getByText(WORKSPACE_ID));
    expect(result.getByText(WORKSPACE_ID).closest('button')).toHaveProperty(
      'disabled',
      true,
    );
  });

  it('switches active workspace tree', async () => {
    const WORKSPACE_ID = 'form-id';

    const JSONTreeRenderer = () => {
      const engine = useDesigner();

      return (
        <div id="json-tree">
          {JSON.stringify(transformToSchema(engine.getCurrentTree()))}
        </div>
      );
    };

    const result = render(
      <Editor workspaceIds={[WORKSPACE_ID]}>
        <WorkspaceManager />
        <JSONTreeRenderer />
      </Editor>,
    );

    const initialTree =
      result.container.querySelector('#json-tree')?.textContent;

    await userEvent.click(result.getByText(WORKSPACE_ID));

    const newWorkspaceTree =
      result.container.querySelector('#json-tree')?.textContent;

    expect(initialTree !== newWorkspaceTree).toBe(false);
  });
});
