import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, first, Subject, take, takeUntil } from 'rxjs';
import { BeeGardenService } from 'src/app/services/beegarden.service';
import { BeeHivesService } from 'src/app/services/hives.service';
import { IBeeHive } from 'src/app/interfaces/interfaces';
import { IBeeGarden } from 'src/app/interfaces/interfaces';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  BeeHiveData,
  BeeHiveDataData,
  BeeHiveDataFormGroup
} from '../../models/BeeHiveData.model';
import * as moment from 'moment';
import { Moment } from 'moment';
import * as _ from 'lodash';
import { HivesDataReportComponent } from './hives-data-report/hives-data-report.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-hives-data',
  templateUrl: './hives-data.component.html',
  styleUrls: ['./hives-data.component.scss']
})
export class HivesDataComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<any>;
  form: FormGroup;
  cellForm: FormGroup;
  beeHiveData: BeeHiveData;

  beeHiveId: string;
  beeGardenId: string;
  beeHive: IBeeHive;
  beeGarden: IBeeGarden;
  showLoading = false;
  showSensors = true;
  columns = 5;
  selectedCell: any;

  cells = [
    { temp: 0, humidity: 0, viewValue: 'И.Клетка-1' },
    { temp: 0, humidity: 0, viewValue: 'И.Клетка-2' },
    { temp: 0, humidity: 0, viewValue: 'И.Клетка-3' },
    { temp: 0, humidity: 0, viewValue: 'И.Клетка-4' },
    { temp: 0, humidity: 0, viewValue: 'И.Клетка-5' },
    { temp: 0, humidity: 0, viewValue: 'И.Клетка-6' },
    { temp: 0, humidity: 0, viewValue: 'И.Клетка-7' },
    { temp: 0, humidity: 0, viewValue: 'И.Клетка-8' }
  ];

  //Grid 8 inputs
  matSliderConfig = {
    autoTicks: false,
    disabled: false,
    invert: false,
    max: 200,
    min: 0,
    showTicks: false,
    step: 1,
    thumbLabel: false,
    vertical: false,
    tickInterval: 1
  };

  naturalValue = 0;
  allBeeHivaData = new BehaviorSubject<any>([]);
  neededData = [];

  private _date = moment();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _beeHiveService: BeeHivesService,
    private _beeGardenService: BeeGardenService,
    private _dialog: MatDialog,
    private _shared: SharedService
  ) { }

  ngOnInit(): void {
    this.showLoading = true;
    this._destroy$ = new Subject<any>();
    this._initForm();
    this._initBeeHiveData();
    this._initBeeGardenData();
  }

  private _initBeeHiveData() {
    this.beeHiveId = this._route.snapshot.params['id'];
    this._beeHiveService
      .getBeeHiveById(this.beeHiveId)
      .pipe(take(1))
      .subscribe((res: IBeeHive) => (this.beeHive = res));
    this._beeHiveService
      .getHivesData(this.beeHiveId, {
        isAll: false,
        date: this._date
          .set({ hour: 0, minutes: 0, seconds: 0, milliseconds: 0 })
          .format()
      })
      .pipe(take(1))
      .subscribe((beeHiveData: BeeHiveData) => this.setData(beeHiveData));
    this._beeHiveService
      .getHivesData(this.beeHiveId, {
        isAll: true,
        date: this._date
          .set({ hour: 0, minutes: 0, seconds: 0, milliseconds: 0 })
          .format()
      })
      .pipe(take(1))
      .subscribe((data: any) => this._shared.setData(data));
  }

  private _initBeeGardenData() {
    this.beeGardenId = this._route.snapshot.url[1].path;
    this._beeGardenService
      .getBeeGardenById(this.beeGardenId as string)
      .pipe(take(1))
      .subscribe((res: IBeeGarden) => (this.beeGarden = res));
  }

  private _initForm() {
    this.beeHiveData = this.beeHiveData || new BeeHiveData();
    this.selectedCell = undefined;
    this.form = new FormGroup({
      cellData: new FormArray(
        (this.beeHiveData.data?.cellData || this.cells).map(
          (cell) =>
            new FormGroup({
              temp: new FormControl(cell.temp),
              humidity: new FormControl(cell.humidity),
              viewValue: new FormControl(cell.viewValue)
            })
        )
      ),
      eggsWeight: new FormControl(this.beeHiveData.data?.eggsWeight || 0),
      queensCount: new FormControl(this.beeHiveData.data?.queensWeight || 0),
      queensWeight: new FormControl(this.beeHiveData.data?.queensWeight || 0),
      layersInfo: new FormControl(this.beeHiveData.data?.layersInfo),
      honeyCombCount: new FormControl(
        this.beeHiveData.data?.honeyCombCount || 0
      ),
      broodCount: new FormControl(this.beeHiveData.data?.broodCount || 0),
      beesInfo: new FormControl(this.beeHiveData.data?.beesInfo),
      familyInfo: new FormControl(this.beeHiveData.data?.familyInfo),
      hiveWeight: new FormControl(this.beeHiveData.data?.hiveWeight || 0),
      naturalValue: new FormControl(this.beeHiveData.data?.naturalValue || 0),
      unnaturalValue: new FormControl(
        this.beeHiveData.data?.unnaturalValue || 0
      ),
      time: new FormControl(this.beeHiveData.time || this._date)
    } as BeeHiveDataFormGroup);
    this.cellForm = new FormGroup({
      temp: new FormControl(0),
      humidity: new FormControl(0)
    });
    this._subscribeToFormChanges();
  }

  private _subscribeToFormChanges() {
    this.cellForm.valueChanges.pipe(takeUntil(this._destroy$)).subscribe({
      next: (value) => {
        const group = this.cellDataField.at(this.selectedCell);
        group.get('temp')?.patchValue(value.temp);
        group.get('humidity')?.patchValue(value.humidity);
      }
    });
  }

  showData(properties: Array<string>) {
    console.log(this._shared.getData());
    this._dialog.open(HivesDataReportComponent, {
      width: '600px',
      data: properties
    });
  }

  incrementOrDecrementCellDataValue(
    field: 'temp' | 'humidity',
    increment: boolean
  ) {
    const control = this.cellForm.get(field);
    const value = control?.value;
    control?.patchValue(increment ? value + 1 : value - 1);
  }

  incrementOrDecrementHiveWeight(increment: boolean): void {
    const hiveWeightControl = this.form.get('hiveWeight');
    const value = hiveWeightControl?.value;
    hiveWeightControl?.patchValue(increment ? value + 1 : value - 1);
  }

  get cellDataField(): FormArray {
    return this.form.get('cellData') as FormArray;
  }

  gridTwoData(selectedCell: number) {
    if (selectedCell === undefined) {
      return;
    }

    const group = this.cellDataField.at(selectedCell);
    this.cellForm.patchValue(group.value);
  }

  setData(beeHiveData: BeeHiveData) {
    this.beeHiveData = new BeeHiveData(beeHiveData);
    this._initForm();
  }

  onSubmit() {
    this.showLoading = true;

    const data = this.form.value;
    const body = {
      id: this.beeHiveData._id,
      data: _.omit(data, 'time'),
      time: moment(data.time).format()
    };

    this._beeHiveService
      .sendData(this.beeHiveId, body)
      .pipe(first())
      .subscribe({
        next: () => {
          this.showSensors = false;
        }
      });
  }

  onDateChange(event: MatDatepickerInputEvent<Moment>) {
    this._date = event.value as Moment;
    const currentDate = this._date?.format();
    this._beeHiveService
      .getHivesData(this.beeHiveId, { date: currentDate })
      .pipe(take(1))
      .subscribe((response: any) => {
        this.setData(response);
      });
  }

  goBack() {
    return this._router.navigateByUrl(`/beegardens/${this.beeGardenId}`);
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.matSliderConfig.showTicks) {
      return this.matSliderConfig.autoTicks
        ? 'auto'
        : this.matSliderConfig.tickInterval;
    }
    return 0;
  }

  patchFormValue(field: keyof BeeHiveDataData, value: string | number | null) {
    this.form.get(field)?.patchValue(value);
  }

  ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
