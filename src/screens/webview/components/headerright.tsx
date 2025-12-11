import {IconButton, Menu, Text} from 'components/paper';
import {useState} from 'react';
import {View} from 'react-native';

type Props = {
  title?: string;
  url?: string;
};

const HeaderRight = ({title, url}: Props) => {
  const [visible, setVisible] = useState(false);

  const onShow = () => setVisible(true);
  const onHide = () => setVisible(false);

  return (
    <Menu
      anchor={<IconButton icon="dots-horizontal" onPress={onShow} />}
      visible={visible}
      onDismiss={onHide}>
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
    </Menu>
  );
};

export default HeaderRight;
