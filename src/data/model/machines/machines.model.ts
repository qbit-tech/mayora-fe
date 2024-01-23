export interface Machine {
  id: string;
  name: string;
}

export interface DetailUser {
  id: string;
  userId: string;
  machineId:string;
  updatedBy: string;
  createdBy: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface DetailUserWithMachine extends DetailUser {
  machine: Machine;
}
