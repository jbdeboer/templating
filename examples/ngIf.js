import {TemplateDirective} from 'templating/annotations';
import {Injector} from 'di/injector';
import {Inject} from 'di/annotations';
import {View, ViewPort} from 'templating/view';
import {ViewFactory} from 'templating/view_factory';

@TemplateDirective({
  selector: '[ng-if]',
  exports: ['ngIf']
})
export class NgIf {
  @Inject(ViewFactory, ViewPort, View, Injector)
  constructor(viewFactory, viewPort, parentView, injector) {
    this.viewPort = viewPort;
    this.viewFactory = viewFactory;
    this.injector = injector;
    this.parentView = parentView;
    this._ngIf = null;
    this.view = null;
    Object.defineProperty(this, 'ngIf', {
      get: function() {
        return this.ngIfGetter();
      },
      set: function(value) {
        this.ngIfSetter(value);
      }
    });
  }
  /* TODO: not working with traceur right now
  set ngIf(value) {}
  */
  ngIfGetter() {
    return this._ngIf;
  }
  ngIfSetter(value) {
    if (typeof value === 'string') {
      // parse initial attribute
      value = value === 'true';
    }
    if (value === this._ngIf) {
      return;
    }
    this._ngIf = value;
    if (!value && this.view) {
      this.viewPort.remove(this.view);
      this.view = null;
    }
    if (value) {
      this.view = this.viewFactory.createChildView(this.injector, this.parentView.executionContext);
      this.viewPort.append(this.view);
    }
  }
}
