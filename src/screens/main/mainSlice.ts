import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EdgeData, NodeData } from 'reaflow';
import { InputNodeMapType } from 'types/InputNodeMapType';
import DataMapper from 'utils/DataMapper';
import GraphUtils from 'utils/GraphUtils';
import i18next from 'i18next';
import { AppDispatch, RootState } from '../../app/store';

interface DataState {
  nodes: NodeData[];
  edges: EdgeData[];
}

type ErrorState = string | null;

interface MainState {
  data: DataState;
  error: ErrorState;
}

const initialState: MainState = {
  data: {
    nodes: [],
    edges: [],
  },
  error: null,
};

export const slice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<DataState>) => {
      state.data = action.payload;
    },
    setError: (state, action: PayloadAction<ErrorState>) => {
      state.error = action.payload;
    },
  },
});

export const { setData, setError } = slice.actions;

export const doSubmit = (input: string) => (dispatch: AppDispatch) => {
  let nodes: NodeData[] = [];
  let edges: EdgeData[] = [];

  dispatch(setError(null));
  dispatch(
    setData({
      nodes,
      edges,
    }),
  );

  if (!input) {
    dispatch(setError(i18next.t('main.errors.invalidInput')));
    return;
  }

  let parsedInput = {};
  try {
    parsedInput = JSON.parse(input) as InputNodeMapType;
  } catch (e) {
    dispatch(setError(i18next.t('main.errors.notParseableInput')));
    return;
  }

  if (!Object.keys(parsedInput).length) {
    dispatch(setError(i18next.t('main.errors.emptyInput')));
    return;
  }

  // Detect cycles
  if (GraphUtils.isCyclic(parsedInput)) {
    dispatch(setError(i18next.t('main.errors.hasCycle')));
  }

  nodes = DataMapper.mapToNodeDataList(parsedInput);
  edges = DataMapper.mapToEdgeDataList(parsedInput);

  dispatch(
    setData({
      nodes,
      edges,
    }),
  );
};

export const selectData = (state: RootState): DataState => state.main.data;
export const selectError = (state: RootState): ErrorState => state.main.error;

export default slice.reducer;
