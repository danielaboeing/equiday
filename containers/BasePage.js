 
import React from 'react';
import { View, Text, ImageStore, ActionSheetIOS } from 'react-native';
import {Router, Scene, Drawer, Actions, Stack, DrawerLayout} from 'react-native-router-flux';

import FrontPage from './FrontPage';
import MasterDataPage from './MasterDataPage';
import SidebarMenue from './SidebarMenue';
import NavigationBar from './NavigationBar';
import TrainingPlanPage from './TrainingPlanPage';
import AllExercisesPage from './AllExercisesPage';
import TrainingPlanOverviewPage from './TrainingPlanOverviewPage';
import SingleExercisePage from './SingleExercisePage';



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
            >
                <Stack>
                    <Scene key="frontPage" component ={FrontPage} title="Startseite"  />
                    <Scene key="masterDataPage" component ={MasterDataPage} title="Stammdaten"  />
                    <Scene key="trainingPlanPage" component ={TrainingPlanPage} title="Trainingsplan erstellen" initial  />
                    <Scene key="allExercisesPage" component ={AllExercisesPage} title="Trainings"  />
                    <Scene key="trainingPlanOverviewPage" component ={TrainingPlanOverviewPage} title="Trainingspläne"  />
                    <Scene key="singleExercisePage" component ={SingleExercisePage} title="Übungsübersicht"  />
                </Stack>
            </Drawer>
            
    </Router>
    );
}
}

export default BasePage;
