import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MOCK_USERS } from "../../../mocks/users.mocks";
import { setUser } from "../../../stores/user/slice";

function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      // Buscar usuario mock
      const user = MOCK_USERS.find((u) => u.email === email);

      if (!user) {
        alert("Usuario no encontrado");
        return;
      }

      if (user.password !== password) {
        alert("Contraseña incorrecta");
        return;
      }

      // Guardar en Redux
      dispatch(setUser(user));

      // Redirigir al dashboard
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error durante el login");
    }
  };

  return {
    methods,
    onSubmit,
    isSubmitting: methods.formState.isSubmitting,
  };
}

export default useLogin;
