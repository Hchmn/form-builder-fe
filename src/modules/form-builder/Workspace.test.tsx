import { Engine } from '@designable/core';
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer';
import { Designer, useDesigner } from '@designable/react';
import { Observer } from '@formily/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FC } from 'react';
import { describe, expect, it } from 'vitest';
import { WorkspaceManager } from './WorkspaceManager';

describe('Workspace', () => {
  const INITIAL_WORKSPACE_ID = 'initial-form';
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

    const workspace = engine.workbench.switchWorkspace(INITIAL_WORKSPACE_ID);
    engine.workbench.setActiveWorkspace(workspace);

    engine.setCurrentTree(
      transformToTreeNode({
        form: {
          labelCol: 6,
          wrapperCol: 12,
        },
        schema: {
          type: 'object',
          properties: {},
          'x-designable-id': 'wgievu1qvhi',
        },
      }),
    );

    return <Designer engine={engine}>{children}</Designer>;
  };

  it('disables active workspace tab button', async () => {
    const WORKSPACE_ID = 'form-id';
    const result = render(
      <Editor workspaceIds={[WORKSPACE_ID]}>
        <WorkspaceManager />
      </Editor>,
    );

    expect(
      result.getByText(INITIAL_WORKSPACE_ID).closest('button'),
    ).toHaveProperty('disabled', true);
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
        <Observer>
          {() => (
            <div
              id={engine.workbench.currentWorkspace.id}
              data-testid="json-tree"
            >
              {JSON.stringify(transformToSchema(engine.getCurrentTree()))}
            </div>
          )}
        </Observer>
      );
    };

    const getTreeAndId = () => {
      const element = screen.getByTestId('json-tree');

      return {
        id: element.id,
        tree: element.textContent,
      };
    };

    const result = render(
      <Editor workspaceIds={[WORKSPACE_ID]}>
        <WorkspaceManager />
        <JSONTreeRenderer />
      </Editor>,
    );

    const initialSchema = getTreeAndId();
    await userEvent.click(result.getByText(WORKSPACE_ID));
    const switchedSchema = getTreeAndId();

    expect(initialSchema.id !== switchedSchema.id).toBe(true);
    expect(initialSchema.tree !== switchedSchema.tree).toBe(true);
  });
});
