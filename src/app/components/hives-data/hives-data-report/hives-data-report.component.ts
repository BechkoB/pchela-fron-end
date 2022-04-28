import { Component, Inject, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import * as moment from 'moment';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hives-data-report',
  templateUrl: './hives-data-report.component.html',
  styleUrls: ['./hives-data-report.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class HivesDataReportComponent implements OnInit {
  dataSource: any;
  columnsToDisplay = ['Записи'];
  allData: any;
  expandedElement: null;

  labels = {
    beesInfo: 'Информация за отводки',
    broodCount: 'Брой питите в кошера',
    honeyCombCount: 'Брой пити с пило',
    eggsWeight: 'Тегло на оплодените яйца',
    familyInfo: 'Бащини семейства',
    hiveWeight: 'Тегло на кошера',
    layersInfo: 'Информация за отводки',
    naturalValue: 'Естесвенно осеменени пчели',
    unnaturalValue: 'Изкуственно осеменени пчели',
    queensCount: 'Брой на яй тръбички на пчелите майки',
    queensWeight: 'Маса на пчелните майки',
    cellData: 'Информация за инкубаторни клетки',
    outsideTemp: 'Околна температура',
    outsideHumid: 'Околна влажност'
  };

  cellData = false;

  constructor(
    private _shared: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: string[]
  ) { }
  ngOnInit(): void {
    this.allData = this._shared.getData();
    this.allData.forEach((element) => {
      element.time = moment(element.time).format('YYYY-MM-DD');
    });
    this.dataSource = this.allData;
    if (this.data.includes('outsideTemp' && 'outsideHumid')) {
      console.log('Outside entered');
    }
    if (this.data.includes('cellData')) {
      this.cellData = true;
    }
    this.dataSource = this.allData;
    console.log(this.data);
    console.log(this.allData);
  }
}
