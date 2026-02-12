import {MaterialDesignIcons} from 'components/icons';
import {Text} from 'components/text';
import {Select} from 'heroui-native/select';
import {View} from 'react-native';

type Props = {
  title?: string;
  url?: string;
};

const HeaderRight = ({title, url}: Props) => {
  return (
    <Select>
      <Select.Trigger>
        <MaterialDesignIcons
          colorClassName="accent-foreground"
          name="dots-horizontal"
          size={32}
        />
      </Select.Trigger>
      <Select.Portal>
        <Select.Overlay />
        <Select.Content presentation="popover">
          {!!title && (
            <View className="p-3">
              <Text>{title}</Text>
            </View>
          )}
          {!!url && (
            <View className="p-3">
              <Text>{url}</Text>
            </View>
          )}
        </Select.Content>
      </Select.Portal>
    </Select>
  );
};

export default HeaderRight;
