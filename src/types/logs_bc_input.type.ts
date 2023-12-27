export interface LogBCInputProps {
  id: string;
  method: 'POST' | 'PATCH';
  endpoint: string;
  requestData: any;
  tableName: string;
  createdAt: string;
  updatedAt: string;
}

export const initialBCInput: LogBCInputProps = {
  id: '',
  method: 'POST',
  endpoint: '',
  requestData: {},
  tableName: '',
  createdAt: '',
  updatedAt: '',
};
