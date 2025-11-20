// src/hooks/useCampaignRegistrations.js
// Hook para gestionar inscripciones en campañas utilizando el backend
// simulado. Permite listar inscripciones de una campaña y
// confirmarlas/cancelarlas sin conexión a un servidor real.

import { useState, useCallback, useEffect, useMemo } from "react";
import {
  getCampaignEnrollments,
  confirmEnrollment,
  cancelEnrollment,
} from "../mocks/mockBackend";

/**
 * Devuelve la lista de inscripciones a una campaña junto con
 * funciones para confirmar o cancelar cada una. Si no se pasa un
 * campaignId, devuelve todas las inscripciones.
 *
 * @param {string|null} campaignId ID de la campaña (o null)
 */
export function useCampaignRegistrations(campaignId) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Carga las inscripciones desde el backend simulado.
  const fetchEnrollments = useCallback(() => {
    setIsLoading(true);
    try {
      const raw = getCampaignEnrollments(campaignId);
      setItems(raw);
      setIsError(false);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [campaignId]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  // Formatea las inscripciones para la tabla de UI.
  const registrations = useMemo(() => {
    return items.map((enrollment) => ({
      id: enrollment.id,
      donorName:
        enrollment?.donor?.first_name && enrollment?.donor?.last_name
          ? `${enrollment.donor.first_name} ${enrollment.donor.last_name}`
          : enrollment?.donor?.full_name || "Sin nombre",
      donorEmail: enrollment?.donor?.email ?? "Sin correo",
      bloodType:
        enrollment?.donor?.blood_type && enrollment?.donor?.rh_factor
          ? `${enrollment.donor.blood_type}${enrollment.donor.rh_factor}`
          : (enrollment?.blood_type ?? "-"),
      eligibilityStatus:
        enrollment?.eligibility_status ??
        enrollment?.donor?.eligibility_status ??
        "DESCONOCIDO",
      registrationDate: enrollment?.created_at
        ? new Date(enrollment.created_at).toLocaleString()
        : "-",
      status: enrollment?.status ?? "PENDING",
    }));
  }, [items]);

  // Confirma una inscripción y actualiza la lista.
  const handleConfirm = useCallback(
    (id) => {
      confirmEnrollment(id);
      fetchEnrollments();
    },
    [fetchEnrollments],
  );

  // Cancela una inscripción y actualiza la lista.
  const handleCancel = useCallback(
    (id) => {
      cancelEnrollment(id);
      fetchEnrollments();
    },
    [fetchEnrollments],
  );

  return {
    registrations,
    isLoading,
    isError,
    handleConfirm,
    handleCancel,
  };
}

export default useCampaignRegistrations;
