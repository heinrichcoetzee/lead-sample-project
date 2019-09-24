import { Lead } from './lead.interface';

export interface timeline{
    lead:Lead;
    fullIncome:number;
    weightedIncome:number;
    startMonth:number;
    endMonth:number;
}

export class InitTimeline{
    timeline:timeline[] = [];
    months = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    constructor(leads:Lead[]){
        
        for(let lead of leads){
            const start = new Date(lead.startDate).getMonth()+1;
            const end = (start-1) + lead.duration;
            this.timeline.push({
                lead:lead,
                startMonth : new Date(lead.startDate).getMonth(),
                endMonth : end>12?12:end,
                fullIncome:(lead.feeValue / lead.duration),
                weightedIncome:((lead.feeValue / lead.duration) * lead.probability)
            });
        }
    }
}
