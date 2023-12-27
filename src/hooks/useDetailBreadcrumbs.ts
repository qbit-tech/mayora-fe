import { createGlobalState } from 'react-hooks-global-state';

type BreadcrumbItem = {
  field: string;
  value: string;
  label: string;
};
type State = {
  breadcrumbDetails: BreadcrumbItem[];
};

const initialState: State = {
  breadcrumbDetails: [],
};
const { useGlobalState } = createGlobalState(initialState);

export default function useDetailBreadcrumbs() {
  const [breadcrumbDetails, setBreadcrumbDetails] =
    useGlobalState('breadcrumbDetails');

  return { breadcrumbDetails, setBreadcrumbDetails };
}