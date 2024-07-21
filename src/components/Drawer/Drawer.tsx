import { CssBaseline } from '@mui/material';
import Drawer from '@mui/material/Drawer';

export default function MenuDrawer() {
    return (
        <Drawer variant="permanent" anchor="left">
            {DrawerList}
        </Drawer>
    );
}