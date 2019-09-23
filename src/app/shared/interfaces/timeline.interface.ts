import { ILead } from './lead.interface';

export interface timeline{
    month:string;
    leads:ILead[];
    fullIncome:number;
    weightedIncome:number;
}

export const calcFullIncome = (leads:ILead[]) =>{
   return leads.reduce((total, lead) => total + (lead.feeValue / lead.duration),0);
}
export const calcWeightedIncome = (leads:ILead[]) =>{
    return leads.reduce((total,lead)=>{
        return ((lead.feeValue / lead.duration) * lead.probability) + total;
    },0)
 }
export class InitTimeline{
    timeline:timeline[] = [];
    months = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    constructor(leads:ILead[]){
        let monthCount = 0;
        for(let month of this.months){
            const filteredLeads = leads?leads.filter(l=>new Date(l.startDate).getMonth() === monthCount):[];
            this.timeline.push({
                month:month,
                leads:filteredLeads,
                fullIncome:calcFullIncome(filteredLeads),
                weightedIncome:calcWeightedIncome(filteredLeads)
            });
            monthCount++;
        }
    }
}
