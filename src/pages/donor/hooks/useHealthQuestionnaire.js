// src/pages/donor/hooks/useHealthQuestionnaire.js
// Hook que gestiona el cuestionario de salud utilizando un backend
// simulado. Permite cargar el último cuestionario del usuario y
// enviar uno nuevo sin conectarse a un servidor real.

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import {
  createHealthQuestionnaire,
  getLastHealthQuestionnaire,
} from "../../../mocks/mockBackend";

export function useHealthQuestionnaire() {
  const user = useSelector((state) => state.user) || {};
  const form = useForm({
    defaultValues: {
      weight: "",
      diseases: [],
      medications: [],
      lastDonation: "",
      bloodGroup: "",
      rhFactor: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [lastQuestionnaire, setLastQuestionnaire] = useState(null);

  // Al montar el componente cargamos el último cuestionario del usuario
  // si existe. Esto permite mostrar el estado de elegibilidad previo.
  useEffect(() => {
    if (user?.id) {
      const last = getLastHealthQuestionnaire(user.id);
      setLastQuestionnaire(last);
    }
  }, [user?.id]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Guardamos el cuestionario asociándolo al usuario. La función
      // createHealthQuestionnaire se encarga de persistir en memoria.
      createHealthQuestionnaire(user?.id || "anonymous", {
        weight: data.weight,
        diseases: data.diseases,
        medications: data.medications,
        last_donation: data.lastDonation || null,
        blood_group: data.bloodGroup,
      });
      alert(
        "Cuestionario guardado (mock). En un backend real se evaluaría la aptitud.",
      );
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Error al guardar el cuestionario. Inténtalo nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    form,
    onSubmit,
    isLoading,
    lastQuestionnaire,
  };
}

export default useHealthQuestionnaire;
