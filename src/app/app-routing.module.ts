import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'splash',
    loadChildren: () => import('./start/splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login-with',
    loadChildren: () => import('./start/login-with/login-with.module').then( m => m.LoginWithPageModule)
  },
  {
    path: 'login/:id',
    loadChildren: () => import('./start/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'set-corporate-id',
    loadChildren: () => import('./start/set-corporate-id/set-corporate-id.module').then(m => m.SetCorporateIdPageModule)
  },

  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
