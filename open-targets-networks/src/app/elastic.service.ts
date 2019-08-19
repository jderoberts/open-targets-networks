import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch-browser';
import { Observable, from } from 'rxjs';
import { RecordResult } from './record-result.model';

@Injectable({
  providedIn: 'root'
})
export class ElasticService {

  private client: Client;
  defaultWeights = [5,1,0.5,5];

  constructor() { 
    this.client = new Client({
      host: 'localhost:9200',
      //log: 'trace'
    });
  }

  public testConnection(): any {
    const png = this.client.ping({ requestTimeout: 1000 });
    return from(png);
  }

  public buildQuery(input:string): any {
    const query = {
      index: 'efo',
      body: {
        query: {
          match: {
             synonyms: input
          }
        }
      }
    };
    return query;
  }

  public buildWeightedQuery(input: string, params: number[]=this.defaultWeights): any {
    const query = {
      index: 'efo',
      size: 100,
      body: {
        query:{
          function_score: {
            query: {
              bool: {
                should: [
                  {
                    term: {id: input}
                  },
                  {
                    match: {
                      label: {
                        query: input,
                        boost: params[0]
                      }
                    }
                  },
                  {
                    match: {
                      "label.edgengram": {
                        query: input,
                        boost: params[1]
                      }
                    }
                  },
                  {
                    match: {
                      synonyms: {
                        query: input,
                        boost: params[2]
                      }
                    }
                  }
                ]
              }
            },
            field_value_factor: {
              field: "assocs",
              modifier: "sqrt",
              factor: params[3]
            },
            boost_mode: "sum"
          }
        }
      }
    };
    return query;
  }

  public getSimpleResults(input:string): any {
    const qry = this.buildQuery(input);
    const response = this.client.search(qry);
    return from(response);
  }

  public getResults(input: string, params: number[]=this.defaultWeights): any {
    const qry = this.buildWeightedQuery(input, params);
    const response = this.client.search(qry);
    return from(response);
  }
}
