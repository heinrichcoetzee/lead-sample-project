import { Lead } from './lead.interface';

export interface Lanes{
    stage:number;
    leads:Lead[];
}

export class initLanes{
    public stages:Lanes[] = [];
    constructor(lanes:number,leadlist:Lead[]){
      for(let i = 1;i<=lanes;i++){
        this.stages.push({
            stage:i,
            leads:leadlist.filter(l=>l.stage===i)
        });
      }
    }
}