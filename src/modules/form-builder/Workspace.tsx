import {
  ComponentTreeWidget,
  Workspace as DesignableWorksapce,
  DesignerToolsWidget,
  IDesignerComponents,
  ToolbarPanel,
  ViewPanel,
  ViewToolsWidget,
  ViewportPanel,
  WorkspacePanel,
} from '@designable/react';

import { Workspace as WorkspaceModel } from '@designable/core';
import { Observer } from '@formily/react';
import { FC, ReactElement } from 'react';
import { Field } from './components';
import PreviewWidget from './widgets/PreviewWidget';
import SchemaEditorWidget from './widgets/SchemaEditorWidget';

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
  return (
    <>
      <DesignableWorksapce id={activeWorkspace.id} key={activeWorkspace.id}>
        <WorkspacePanel>
          <ToolbarPanel>
            <div id="form-tabs">
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
