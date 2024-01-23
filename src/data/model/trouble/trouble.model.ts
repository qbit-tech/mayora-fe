import { CategoryList } from "../category";

export interface Trouble {
  id: string;
  machineId: string;
  categoryId: string;
  status: string;
  remark: string;
  startTime: Date;
  endTime: Date;
  updatedBy: string;
  createdBy: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface ITroubleListItem extends Trouble{
  categoryParent: CategoryList;
}
