import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logIn } from "../actions/auth";

const useTestAccountLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoadingWithTest, setIsLoadingWithTest] = useState(false);

  const handleTestAccountLogin = async () => {
    setIsLoadingWithTest(true);
    await dispatch(
      logIn(
        {
          email: process.env.REACT_APP_TEST_EMAIL,
          password: process.env.REACT_APP_TEST_PASSWORD,
        },
        history
      )
    );
    setIsLoadingWithTest(false);
  };
  return [isLoadingWithTest, handleTestAccountLogin];
};

export { useTestAccountLogin };
