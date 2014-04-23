import {ComponentDirective} from 'templating';
import {promise as treeTemplate} from './tree.html';


@ComponentDirective({
  selector: 'tree',
  template: treeTemplate,
  bind: {'treeData': 'treeData'},
  observe: {'treeData': 'dataChanged'}
})
export class TreeComponent {
  constructor() {
  //  this.data = null;
  }

  dataChanged(value) {
  //  console.log('tree got data', value);
    //this.data = value;
  }
}
