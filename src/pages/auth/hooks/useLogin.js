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

      // Guardar token
      if (res.data?.access_token) {
        localStorage.setItem("access_token", res.data.access_token);
      }

      // Preparar datos del usuario
      const userData = res.data?.user || res.user;

      dispatch(setUser(userData));
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
