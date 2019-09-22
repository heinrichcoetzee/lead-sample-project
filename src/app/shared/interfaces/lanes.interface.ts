import { ILead } from './lead.interface';

export interface Lanes{
    stage:number;
    leads:ILead[];
}

export class initLanes{
    public stages:Lanes[] = [];
    constructor(lanes:number,leadlist:ILead[]){
      for(let i = 1;i<=lanes;i++){
        this.stages.push({
            stage:i,
            leads:leadlist.filter(l=>l.stage===i)
        });
      }
    }
}