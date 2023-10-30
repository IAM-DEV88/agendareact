import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline';
import ContentCopy from '@mui/icons-material/ContentCopy';
import QueryStats from '@mui/icons-material/QueryStats';
import Save from '@mui/icons-material/Save';
import Close from '@mui/icons-material/Close';
import AppRegistration from '@mui/icons-material/AppRegistration';
import EventNote from '@mui/icons-material/EventNote';

const AppIcon = ({iconName}) => {
    const iconComponents = {
        AddCircleOutline,
        RemoveCircleOutline,
        ContentCopy,
        EventNote,
        AppRegistration,
        QueryStats,
        Save,
        Close,
      };
    const IconComponent = iconComponents[iconName];
    return IconComponent ? <IconComponent /> : null;
}

export default AppIcon