// src/pages/organizer/hooks/useCreateCampaign.js
// Hook que gestiona el formulario de creación de campañas utilizando
// datos de un backend simulado. Proporciona la lista de centros,
// controla el estado de carga y envía los datos al almacen en
// memoria cuando el usuario crea una campaña.

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import { getCenters, createCampaign } from "../../../mocks/mockBackend";

export function useCreateCampaign() {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      centerId: "",
      date: "",
      startTime: "",
      endTime: "",
      minAge: "",
      maxAge: "",
      minWeight: "",
      requiredBloodTypes: [],
      slotsTotal: "",
    },
  });

  const [centers, setCenters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const allCenters = getCenters();
    setCenters(allCenters);
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        name: data.name,
        description: data.description || "",
        center_id: data.centerId || null,
        campaign_date: data.date || null,
        start_time: data.startTime || null,
        end_time: data.endTime || null,
        min_age: data.minAge ? Number(data.minAge) : undefined,
        max_age: data.maxAge ? Number(data.maxAge) : undefined,
        min_weight: data.minWeight ? Number(data.minWeight) : undefined,
        required_blood_types: data.requiredBloodTypes || [],
        max_donors: data.slotsTotal ? Number(data.slotsTotal) : undefined,
      };
      createCampaign(payload);
      alert("Campaña creada correctamente (mock)");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Error al crear la campaña. Inténtalo nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    centers,
    isLoading,
  };
}

export default useCreateCampaign;
