/**
 * Created by ihab on 11/12/16.
 */
import {RouterModule} from "@angular/router"
import {AdminComponent} from "../components/admin/admin.component";
import {PanelComponent} from "../components/panel/panel.component";
export const routing = RouterModule.
                                   forRoot([

                                             {
                                               path:"admin",
                                               component:AdminComponent

                                             },
                                             {
                                               path:'',
                                               redirectTo:'/panel',
                                               pathMatch: 'full'

                                             },
                                             {
                                               path:'panel',
                                               children:[
                                                 {
                                                   path:'',
                                                   component:PanelComponent
                                                 },
                                                 {
                                                   path:'admin',
                                                   component:AdminComponent
                                                 }

                                               ]
                                             }

                                           ]);
