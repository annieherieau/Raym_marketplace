import { useAtomValue } from "jotai";
import { isAuthAtom } from "../app/atoms";
import { useParams } from "react-router-dom";
import ResetPassword from "../components/ResetPassword";
import ForgotPassword from "../components/ForgotPassword";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Password() {
  const { action } = useParams();
  const isLoggedIn = useAtomValue(isAuthAtom);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);
  return (
    <div>
      {action == "forgot" && <ForgotPassword />}
      {action == "edit" && <ResetPassword />}
    </div>
  );
}
