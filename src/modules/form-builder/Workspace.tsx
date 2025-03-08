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
import { FC } from 'react';

interface WorkspaceProps {
  widgetComponents?: IDesignerComponents;
  formId: string;
}

export const Workspace: FC<WorkspaceProps> = ({
  widgetComponents = { Field },
  formId,
}) => {
  return (
    <>
      <DesignableWorksapce id={formId}>
        <WorkspacePanel>
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
