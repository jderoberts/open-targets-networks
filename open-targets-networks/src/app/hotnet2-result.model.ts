export class Hotnet2Result {
    auto_delta : string;
    subnetworks : Object;
    stats : Object;

    constructor(public jsonData: any) {
        this.auto_delta = jsonData.params.auto_delta;
        this.subnetworks = jsonData.subnetworks[this.auto_delta];
        this.stats = jsonData['stats'][this.auto_delta];
    }
}
