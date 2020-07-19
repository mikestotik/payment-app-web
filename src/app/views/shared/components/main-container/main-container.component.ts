import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAction } from '../../../../core/entities/actions';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: [ './main-container.component.scss' ]
})
export class MainContainerComponent {

  @Input()
  public title: string;

  @Input()
  public actionsType: 'menu' | 'buttons' = 'buttons';

  @Input()
  public actions: Array<IAction>;

  @Input()
  public back: boolean;

  @Output()
  public backEvent = new EventEmitter();

  @Output()
  public actionEvent = new EventEmitter<IAction>();

  public onBack(): void {
    this.backEvent.emit();
  }

  public onAction(action: IAction): void {
    this.actionEvent.emit(action);
  }
}
