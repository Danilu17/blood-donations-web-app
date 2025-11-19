// src/pages/auth/hooks/useLogin.js
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../stores/user/slice";
import { login } from "../../../services/authService";

function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmit = async ({ email, password }) => {
    try {
      const user = await login(email, password);
      dispatch(setUser(user)); // Guarda en Redux
      navigate("/"); // Redirige al dashboard
    } catch (error) {
      const msg = error.response?.data?.message || "Error durante el login";
      alert(msg);
    }
  };

  return {
    methods,
    onSubmit,
    isSubmitting: methods.formState.isSubmitting,
  };
}

export default useLogin;
