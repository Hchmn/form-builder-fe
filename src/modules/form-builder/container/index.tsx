import { DroppableWidget, IDroppableWidgetProps } from '@designable/react';
import { observer } from '@formily/react';
import './styles.less';
import { ComponentType, FC, ReactNode } from 'react';

interface ContainerProps extends IDroppableWidgetProps {
  children?: ReactNode;
}

export const Container: FC<ContainerProps> = observer((props) => {
  return <DroppableWidget {...props}>{props.children}</DroppableWidget>;
});

export const withContainer = <P extends object>(Target: ComponentType<P>) => {
  const WrappedComponent: FC<P> = (props) => {
    return (
      <DroppableWidget {...(props as IDroppableWidgetProps)}>
        <Target {...props} />
      </DroppableWidget>
    );
  };
  return WrappedComponent;
};
