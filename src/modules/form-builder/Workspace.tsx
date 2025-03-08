import {
  Workspace as DesignableWorksapce,
  WorkspacePanel,
  ToolbarPanel,
  DesignerToolsWidget,
  ViewToolsWidget,
  ViewportPanel,
  ViewPanel,
  ComponentTreeWidget,
  IDesignerComponents,
} from '@designable/react';

import { Field } from './components';
import SchemaEditorWidget from './widgets/SchemaEditorWidget';
import PreviewWidget from './widgets/PreviewWidget';
import { FC, ReactElement } from 'react';
import { Workspace as WorkspaceModel } from '@designable/core';
import { transformToSchema } from '@designable/formily-transformer';
import { Observer } from '@formily/react';

interface WorkspaceProps {
  widgetComponents?: IDesignerComponents;
  activeWorkspace: WorkspaceModel;
  workspaceTabs: () => ReactElement[];
}

export const Workspace: FC<WorkspaceProps> = ({
  widgetComponents = { Field },
  activeWorkspace,
  workspaceTabs,
}) => {
  console.log(
    JSON.stringify(transformToSchema(activeWorkspace.operation.tree), null, 2),
  );
  return (
    <>
      <DesignableWorksapce id={activeWorkspace.id}>
        <WorkspacePanel>
          <ToolbarPanel>
            <div>
              <Observer>{workspaceTabs}</Observer>
            </div>
          </ToolbarPanel>
          <ToolbarPanel>
            <DesignerToolsWidget use={['HISTORY']} />
            <ViewToolsWidget use={['DESIGNABLE', 'PREVIEW', 'JSONTREE']} />
          </ToolbarPanel>
          <ViewportPanel>
            <ViewPanel type="DESIGNABLE">
              {() => <ComponentTreeWidget components={widgetComponents} />}
            </ViewPanel>
            <ViewPanel type="JSONTREE" scrollable={false}>
              {(tree, onChange) => (
                <SchemaEditorWidget tree={tree} onChange={onChange} />
              )}
            </ViewPanel>
            <ViewPanel type="PREVIEW">
              {(tree) => <PreviewWidget tree={tree} />}
            </ViewPanel>
          </ViewportPanel>
        </WorkspacePanel>
      </DesignableWorksapce>
    </>
  );
};
