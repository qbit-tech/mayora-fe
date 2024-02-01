import { ITroubleListItem, Trouble } from "../trouble";

export interface Machine {
  id: string;
  name: string;
}

export interface DetailUser {
  id: string;
  userId: string;
  machineId:number;
  updatedBy: string;
  createdBy: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface DetailUserWithMachine extends DetailUser {
  machine: Machine;
}

export interface Startup{
  id: number;
  machineId:number;
  startTime: Date;
  endTime: Date;
  updatedBy: string;
  createdBy: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface StatusMachine{
  id: number;
  machineId:number;
  status: 'on' | 'off';
  updatedBy: string;
  createdBy: string;
  updatedAt: Date;
  createdAt: Date;
}


export interface ProductionStatus {
  id: number;
  name: string;
  trouble: ITroubleListItem[];
  startup: Startup[];
  statusMachine: StatusMachine[]
}
