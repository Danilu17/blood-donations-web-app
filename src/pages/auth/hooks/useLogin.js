// src/pages/auth/hooks/useLogin.js
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../stores/user/slice";
import { useLoginUserMutation } from "../../../apis/auth.api";

export default function useLogin() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const res = await loginUser({ email, password }).unwrap();
      // Se asume: res = { message, data: { access_token, user } }
      const { user } = res.data;

      // Guardamos el usuario en Redux.
      // El slice ya se encarga de poner role en minúsculas.
      dispatch(setUser(user));

      // Luego del login vamos a "/"
      navigate("/", { replace: true });
    } catch (error) {
      const msg =
        error?.data?.message || "Error al iniciar sesión. Verificá tus datos.";
      alert(msg);
    }
  };

  return {
    methods,
    onSubmit,
    isSubmitting: isLoading,
  };
}
