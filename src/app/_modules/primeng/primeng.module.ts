import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { EditorModule } from 'primeng/editor';
import { MenuModule } from 'primeng/menu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [],
  imports: [
    FileUploadModule,
    ContextMenuModule,
     CardModule,
    ScrollPanelModule,
    TooltipModule,
    DividerModule,
    ButtonModule,
    DialogModule,
    AvatarModule,
    ToastModule,
    EditorModule,
    TooltipModule,
    DropdownModule,
    MenuModule,
  ],
    
  exports: [
    FileUploadModule,
    ContextMenuModule,
    MenuModule,
    DropdownModule,
    CardModule,
    ScrollPanelModule,
    TooltipModule,
    DividerModule,
    ButtonModule,
    DialogModule,
    AvatarModule,
    ToastModule,
    EditorModule,
    TooltipModule,
  ]
})
export class PrimengModule { }
