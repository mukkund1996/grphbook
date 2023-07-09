import {useMemo} from "react";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../store/jupyterui/ActionCreators";

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
