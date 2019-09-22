
export interface ILead{
    name:string;
    feeValue:number;
    startDate:string | Date;
    duration:number;
    probability:number;
    notes:string;
    stage:number;
    createdAt?: string;
    updatedAt?: string;
    objectId?: string;
}

export class InitLead {
    name:string;
    feeValue:number;
    startDate:string | Date;
    duration:number;
    probability:number;
    notes:string;
    stage:number;
    constructor(){
        this.name = "";
        this.feeValue = 0;
        this.startDate = new Date();
        this.duration = 0;
        this.probability = 0;
        this.notes = "";
        this.stage = 1;
    }
}