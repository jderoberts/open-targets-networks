import { Component, OnInit, Input } from '@angular/core';
import { RecordResult } from '../record-result.model';

@Component({
  selector: 'app-result-record',
  templateUrl: './result-record.component.html',
  styleUrls: ['./result-record.component.scss']
})
export class ResultRecordComponent implements OnInit {

  @Input() record: RecordResult;

  constructor() { }

  ngOnInit() {
  }

}
