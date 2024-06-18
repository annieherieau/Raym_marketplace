import { useAtomValue } from "jotai";
import { isAuthAtom } from "../app/atoms";
import { useParams } from "react-router-dom";
import ResetPassword from "../components/ResetPassword";
import ForgotPassword from "../components/ForgotPassword";
import { useEffect } from "react";

export default function Password() {
  const { action } = useParams();
  const isLoggedIn = useAtomValue(isAuthAtom);

  useEffect(() => {
    if (isLoggedIn) {
      redirectTo("/");
    }
  }, [isLoggedIn]);
  return (
    <div>
      {action == "forgot" && <ForgotPassword />}
      {action == "edit" && <ResetPassword />}
    </div>
  );
}
