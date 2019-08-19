export class RecordSource
{
    assocs: number;
    id: string;
    label: string;
    synonyms: string[];

    constructor(obj: any) {
        this.id = obj.id;
        this.label = obj.label;
        this.assocs = obj.assocs;
        let syn_array = obj.synonyms.split("|");
        let syn_standard = syn_array.map((item) => {
          let re = /(\w+), (\w+)/;
          item = item.toLowerCase();
          item = item.replace(re, '$2 $1');
          return item
        });
        if(syn_standard[0] == "") {
          syn_standard = [];
        };
        this.synonyms = Array.from(new Set(syn_standard));
    }
}
