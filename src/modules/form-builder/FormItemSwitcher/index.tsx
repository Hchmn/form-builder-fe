import { Switch } from 'antd';

export const FormItemSwitcher = (props: any) => {
  return (
    <Switch
      checked={props.value === 'FormItem'}
      onChange={(value) => {
        props.onChange(value ? 'FormItem' : undefined);
      }}
    />
  );
};
