 
import React from 'react';
import { View, Text, ImageStore, ActionSheetIOS } from 'react-native';
import {Router, Scene, Drawer, Actions, Stack} from 'react-native-router-flux';

import FrontPage from './FrontPage';
import MasterDataPage from './MasterDataPage';
import SidebarMenue from './SidebarMenue';
import NavigationBar from './NavigationBar';
import TrainingPlanPage from './TrainingPlanPage';


class BasePage extends React.Component {  

constructor(){
    super()
}

    render(){

    return (
    <Router>
            <Drawer 
                key="drawerMenu"
                contentComponent={SidebarMenue}
                navBar = {NavigationBar}
                
                //drawerImage={require('../assets/menu.png')} 
            >
                <Stack>
                <Scene key="frontPage" component ={FrontPage} title="Startseite" initial />
                <Scene key="masterDataPage" component ={MasterDataPage} title="Stammdaten"  />
                <Scene key="trainingPlanPage" component ={TrainingPlanPage} title="Trainingsplan erstellen"  />

                </Stack>
            </Drawer>
            
    </Router>
    );
}
}

export default BasePage;
