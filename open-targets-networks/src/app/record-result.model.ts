import { RecordSource } from './record-source.model';

export class RecordResult
{
    _id: string;
    _index: string;
    _score: number;
    _source: RecordSource;
    _type: string;

    constructor(obj: any) {
        this._id = obj._id;
        this._index = obj._index;
        this._score = obj._score;
        this._source = new RecordSource(obj._source);
        this._type = obj._type;
    }
}
