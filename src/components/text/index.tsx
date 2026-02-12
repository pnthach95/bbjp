import {Text as RNText} from 'react-native';
import {twMerge} from 'tailwind-merge';

export const Text = ({
  className,
  ...props
}: React.ComponentProps<typeof RNText>) => (
  <RNText
    className={twMerge('text-black dark:text-white', className)}
    {...props}
  />
);
