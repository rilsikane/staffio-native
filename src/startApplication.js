import { Navigation } from 'react-native-navigation';
import Provider from './lib/MobxRnnProvider';
import Store from './stores/store';
import LoginScreen from './screens/LoginScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from './constants/Colors';
import fontelloConfig from '../assets/fonts/config.json'
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const IconTello = createIconSetFromFontello(fontelloConfig);


async function prepareIcons() {
  const icons = await Promise.all([
    Icon.getImageSource('home', 25),
    Icon.getImageSource('inbox', 25),
    IconTello.getImageSource('hhmm-34', 25),
    IconTello.getImageSource('hhmm-33', 25),
    IconTello.getImageSource('hhmm-02', 25),
  ]);
  const [home, inbox, bars, user, search] = icons;
  return { home, inbox, bars, user, search };
}
export default async function startApplication(root) {
      const icons = await prepareIcons();
      switch (root) {
      case 'login':
        Navigation.startSingleScreenApp({
              screen: { screen: 'staffio.LoginScreen' },
              appStyle: {
              orientation: 'portrait',
              navBarBlur: false,
              drawUnderNavBar: true,
              navBarTransparent: true,
              navBarHidden: true  
              }
          });
        return;
      case 'after-login':
        // Navigation.startTabBasedApp({
        //   tabs: [
        //     {
        //       //labal: 'Overview',
        //       label: 'Home',
        //       //screen: 'staffio.Overview',
        //       screen: 'staffio.HomeScreen',
        //       icon: icons.home,
        //       title: undefined,
        //       navigatorStyle: {},
        //     },
        //      {
        //       label: 'Inbox',
        //       screen: 'staffio.InqInboxScreen',
        //       icon: icons.inbox,
        //       title: undefined,
        //       navigatorStyle: {},
        //     },
        //     {
        //       label: 'Search',
        //       screen: 'staffio.FindFriendScreen',
        //       icon: icons.search,
        //       title: undefined,
        //       navigatorStyle: {},
        //     },
            
        //      {
        //       label: 'Menu',
        //       screen: 'staffio.ProfileScreen',
        //       icon: icons.bars,
        //       title: undefined,
        //       navigatorStyle: {},
        //     },
            
        //   ],
        //   animationType: 'slide-down',
        //   title: undefined,
        //   tabsStyle:{
        //     tabBarButtonColor: '#d1c1a1', // change the color of the tab icons and text (also unselected)
        //     tabBarSelectedButtonColor: '#f1d749', // change the color of the selected tab icon and text (only selected)
        //     tabBarBackgroundColor: '#ffff', // change the background color of the tab bar
        //     tabBarTranslucent: false, // change the translucent of the tab bar to false
        //     tabBarTextFontFamily: 'Kanit', //change the tab font family
        //     tabBarLabelColor: '#d1c1a1', // iOS only. change the color of tab text
        //     tabBarSelectedLabelColor: '#f1d749', // iOS only. change the color of the selected tab text
        //     forceTitlesDisplay: true // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.  
        //   },
        //   appStyle: {
        //     orientation: 'portrait',
        //     navBarBlur: false,
        //     drawUnderNavBar: true,
        //     navBarTransparent: true,
        //     navBarHidden: true,
        //     tabBarButtonColor: '#d1c1a1', // change the color of the tab icons and text (also unselected)
        //     tabBarSelectedButtonColor: '#f1d749', // change the color of the selected tab icon and text (only selected)
        //     tabBarBackgroundColor: '#ffff', // change the background color of the tab bar
        //     tabBarTranslucent: false, // change the translucent of the tab bar to false
        //     tabBarTextFontFamily: 'Kanit', //change the tab font family
        //     tabBarLabelColor: '#d1c1a1', // iOS only. change the color of tab text
        //     tabBarSelectedLabelColor: '#f1d749', // iOS only. change the color of the selected tab text
        //     forceTitlesDisplay: true // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
        //   },
        //    animationType: 'fade',
        //    lazyload:true
        // });
         Navigation.startSingleScreenApp({
            screen: { 
              screen: 'staffio.HomeScreen'
            },
            drawer: {
              // optional, add this if you want a side menu drawer in your app
              left: {
                // optional, define if you want a drawer from the left
                screen: 'staffio.MenuScreen', // unique ID registered with Navigation.registerScreen
                passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
                disableOpenGesture: false, // can the drawer be opened with a swipe instead of button (optional, Android only)
                fixedWidth: 700 // a fixed width you want your left drawer to have (optional)
              },
              style: {
                // ( iOS only )
                drawerShadow: true, // optional, add this if you want a side menu drawer shadow
                contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
                leftDrawerWidth: 70, // optional, add this if you want a define left drawer width (50=percent)
              },
              type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
              animationType: 'slide-and-scale', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
              // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
              disableOpenGesture: true // optional, can the drawer, both right and left, be opened with a swipe instead of button
            },
            appStyle: {
            orientation: 'portrait',
            navBarBlur: false,
            drawUnderNavBar: true,
            navBarTransparent: true,
            navBarHidden: true  ,
            navBarBackgroundColor: '#f58020', 
            }
        });
        return;
       case 'punch-in':
       Navigation.startSingleScreenApp({
            screen: { screen: 'staffio.CameraScreen' },
            appStyle: {
            orientation: 'portrait',
            navBarBlur: false,
            drawUnderNavBar: true,
            navBarTransparent: true,
            navBarHidden: true  
            }
        });
        return;
      case 'authen-pin':
       Navigation.startSingleScreenApp({
            screen: { screen: 'staffio.AuthenPinCodeScreen' },
            appStyle: {
            orientation: 'portrait',
            navBarBlur: false,
            drawUnderNavBar: true,
            navBarTransparent: true,
            navBarHidden: true,  
            }
        });
        return;
      default:
        console.error('Unknown app root');
    }  
  
}