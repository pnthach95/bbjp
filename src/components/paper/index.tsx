import {
  ActivityIndicator as OActivityIndicator,
  AnimatedFAB as OAnimatedFAB,
  Appbar as OAppbar,
  Avatar as OAvatar,
  Badge as OBadge,
  Banner as OBanner,
  Button as OButton,
  Card as OCard,
  Checkbox as OCheckbox,
  Chip as OChip,
  DataTable as ODataTable,
  Dialog as ODialog,
  Divider as ODivider,
  Drawer as ODrawer,
  FAB as OFAB,
  HelperText as OHelperText,
  Icon as OIcon,
  IconButton as OIconButton,
  List as OList,
  Menu as OMenu,
  Modal as OModal,
  ProgressBar as OProgressBar,
  RadioButton as ORadioButton,
  Searchbar as OSearchbar,
  SegmentedButtons as OSegmentedButtons,
  Snackbar as OSnackbar,
  Surface as OSurface,
  Switch as OSwitch,
  Text as OText,
  TextInput as OTextInput,
  ToggleButton as OToggleButton,
  Tooltip as OTooltip,
  TouchableRipple as OTouchableRipple,
} from 'react-native-paper';
import {withUniwind} from 'uniwind';

export const ActivityIndicator = withUniwind(OActivityIndicator);
export const AnimatedFAB = withUniwind(OAnimatedFAB);
export const Appbar = withUniwind(OAppbar);
export const AppbarAction = withUniwind(OAppbar.Action);
export const AppbarBackAction = withUniwind(OAppbar.BackAction);
export const AppbarContent = withUniwind(OAppbar.Content);
export const AppbarHeader = withUniwind(OAppbar.Header);
export const AvatarIcon = withUniwind(OAvatar.Icon);
export const AvatarImage = withUniwind(OAvatar.Image);
export const AvatarText = withUniwind(OAvatar.Text);
export const Badge = withUniwind(OBadge);
export const Banner = withUniwind(OBanner);
export const Button = withUniwind(OButton);
export const Card = withUniwind(OCard);
export const CardActions = withUniwind(OCard.Actions);
export const CardContent = withUniwind(OCard.Content);
export const CardCover = withUniwind(OCard.Cover);
export const CardTitle = withUniwind(OCard.Title);
export const Checkbox = withUniwind(OCheckbox);
export const CheckboxAndroid = withUniwind(OCheckbox.Android);
export const CheckboxIOS = withUniwind(OCheckbox.IOS);
export const CheckboxItem = withUniwind(OCheckbox.Item);
export const Chip = withUniwind(OChip);
export const DataTable = withUniwind(ODataTable);
export const DataTableCell = withUniwind(ODataTable.Cell);
export const DataTableHeader = withUniwind(ODataTable.Header);
export const DataTablePagination = withUniwind(ODataTable.Pagination);
export const DataTableRow = withUniwind(ODataTable.Row);
export const DataTableTitle = withUniwind(ODataTable.Title);
export const Dialog = withUniwind(ODialog);
export const DialogActions = withUniwind(ODialog.Actions);
export const DialogContent = withUniwind(ODialog.Content);
export const DialogIcon = withUniwind(ODialog.Icon);
export const DialogScrollArea = withUniwind(ODialog.ScrollArea);
export const DialogTitle = withUniwind(ODialog.Title);
export const Divider = withUniwind(ODivider);
export const DrawerCollapsedItem = withUniwind(ODrawer.CollapsedItem);
export const DrawerItem = withUniwind(ODrawer.Item);
export const DrawerSection = withUniwind(ODrawer.Section);
export const FAB = withUniwind(OFAB);
export const FABGroup = withUniwind(OFAB.Group);
export const HelperText = withUniwind(OHelperText);
export const Icon = withUniwind(OIcon);
export const IconButton = withUniwind(OIconButton);
export const ListAccordion = withUniwind(OList.Accordion);
export const ListAccordionGroup = withUniwind(OList.AccordionGroup);
export const ListIcon = withUniwind(OList.Icon);
export const ListImage = withUniwind(OList.Image);
export const ListItem = withUniwind(OList.Item);
export const ListSection = withUniwind(OList.Section);
export const ListSubheader = withUniwind(OList.Subheader);
/**
 * Có bug không hiện nếu bấm quá nhanh
 *
 * https://github.com/callstack/react-native-paper/issues/4754
 */
export const Menu = withUniwind(OMenu);
export const MenuItem = withUniwind(OMenu.Item);
export const Modal = withUniwind(OModal);
export const ProgressBar = withUniwind(OProgressBar);
export const RadioButton = withUniwind(ORadioButton);
export const RadioButtonAndroid = withUniwind(ORadioButton.Android);
export const RadioButtonGroup = withUniwind(ORadioButton.Group);
export const RadioButtonIOS = withUniwind(ORadioButton.IOS);
export const RadioButtonItem = withUniwind(ORadioButton.Item);
export const Searchbar = withUniwind(OSearchbar);
export const SegmentedButtons = withUniwind(OSegmentedButtons);
export const Snackbar = withUniwind(OSnackbar);
export const Surface = withUniwind(OSurface);
export const Switch = withUniwind(OSwitch);
export const Text = withUniwind(OText);
export const TextInput = withUniwind(OTextInput);
// Export nguyên bản do lỗi không hiển thị
export const TextInputAffix = OTextInput.Affix;
// Export nguyên bản do lỗi không hiển thị
export const TextInputIcon = OTextInput.Icon;
export const ToggleButton = withUniwind(OToggleButton);
export const ToggleButtonGroup = withUniwind(OToggleButton.Group);
export const ToggleButtonRow = withUniwind(OToggleButton.Row);
export const Tooltip = withUniwind(OTooltip);
/**
 * Phải thêm `borderless` để có hiệu ứng
 */
export const TouchableRipple = withUniwind(OTouchableRipple);
