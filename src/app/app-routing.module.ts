import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { MessagesListComponent } from './Components/messages-list/messages-list.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { authGuard } from './guard/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './guard/prevent-unsaved-changes.guard';




const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'',
    runGuardsAndResolvers:'always',
    canActivate:[authGuard],
    children:[
      { path: 'members', component: MemberListComponent},
      { path: 'members/:username', component: MemberDetailComponent },
      { path: 'member/edit', component: MemberEditComponent, canDeactivate:[preventUnsavedChangesGuard] },
      { path: 'lists', component: MessagesListComponent },
      { path: 'messages', component: MessagesComponent },
      {path: 'not-found', component: NotFoundComponent},
      {path: 'server-error', component: ServerErrorComponent},
    ]
  },

  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
