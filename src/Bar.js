import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { withStyles } from '@material-ui/core/styles';
import Logo from './assets/shelter-stats.png';
import BarChartIcon from '@material-ui/icons/BarChart';
// import CalculatorIcon from './assets/technological.svg'
import CalculatorIcon from './assets/education.svg'
import TocIcon from '@material-ui/icons/Toc';


const drawerWidth = 150;

const styles = theme => ({

    appBarDrawerOpen: {
        zIndex: '10',
        height: '58px',
        backgroundColor: theme.palette.background.paper,
        width: 'calc(100% - 48px)',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarDrawerClose: {
        zIndex: '10',
        height: '58px',
        backgroundColor: theme.palette.background.paper,
        width: 'calc(100%)',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    toolbar: {
        minHeight: '58px',
    },
    grow: {
        flexGrow: 1,
    },
    avatar: {
        backgroundColor: theme.palette.divider,
    },
    mapButton: {
        backgroundColor: '#246C99',
        marginRight: '20px',
    }
})

class Bar extends React.PureComponent {
    state = {
        drawerOpen: false
    }



    render() {
        const { drawerOpen } = this.state;
        const { classes } = this.props;

        return (
            <AppBar position='fixed' className={drawerOpen ? classes.appBarDrawerOpen : classes.appBarDrawerClose}>
                <Toolbar className={classes.toolbar}>
                    {/* <div className={classes.grow}/> */}
                    <IconButton aria-label="open drawer" onClick={() => this.setState({ drawerOpen: true })}
                        edge="start" style={drawerOpen ? { display: 'none' } : {}}>
                        <MenuIcon />
                    </IconButton>
                    <Typography noWrap style={{color: 'white'}}>Shelter Stats</Typography>
                </Toolbar>
                <Drawer anchor="left" open={drawerOpen}>
                    <div>
                        <IconButton onClick={() => this.setState({ drawerOpen: false })}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div>
                        <IconButton onClick={() => console.log('clicked')}>
                            <TocIcon />
                        </IconButton>
                    </div>
                    <div>
                        <IconButton onClick={() => console.log('clicked')}>
                            <img src={CalculatorIcon} style={{ width: '24px' }} />
                        </IconButton>
                    </div>
                    <div>
                        <IconButton onClick={() => console.log('clicked')}>
                            <BarChartIcon />
                        </IconButton>
                    </div>
                </Drawer>
            </AppBar>
        );
    }


}

export default (withStyles(styles)(Bar));