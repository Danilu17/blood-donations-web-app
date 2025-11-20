// src/hooks/useDonationsManagement.js
// Hook para gestionar donaciones en el prototipo. Se apoya en el
// backend simulado (ver src/mocks/mockBackend.js) para obtener y
// actualizar datos sin realizar peticiones HTTP.

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  getDonations,
  completeDonation,
  cancelDonation,
  generateCertificate,
} from "../mocks/mockBackend";

/**
 * Devuelve las donaciones asociadas a una campaña (o todas si no se
 * especifica ID) junto con funciones para actualizar su estado. En
 * lugar de interactuar con un API remoto, este hook manipula datos
 * almacenados en memoria para permitir un funcionamiento autónomo.
 *
 * @param {string|null} campaignId ID de la campaña o null para todas
 */
export function useDonationsManagement(campaignId) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Función para cargar donaciones desde el backend simulado.
  const fetchDonations = useCallback(() => {
    setIsLoading(true);
    try {
      const raw = getDonations(campaignId);
      setItems(raw);
      setIsError(false);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [campaignId]);

  // Cargar donaciones al montar el componente o cuando cambie el ID de la campaña.
  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  // Transformar los datos brutos en el formato que consume la UI.
  const donations = useMemo(() => {
    return items.map((donation) => {
      return {
        id: donation.id,
        donorName: donation.donorName || `Donante ${donation.donorId}`,
        donorEmail: donation.donorEmail || `${donation.donorId}@example.com`,
        bloodType: donation.bloodType || "O+",
        eligibilityStatus: donation.eligibility_status || "DESCONOCIDO",
        registrationDate: donation.scheduled_date
          ? `${donation.scheduled_date} ${donation.scheduled_time || ""}`
          : donation.created_at
            ? new Date(donation.created_at).toLocaleString()
            : "-",
        donationStatus: donation.status || "PENDING",
      };
    });
  }, [items]);

  // Actualiza el estado de una donación. Si newStatus es "COMPLETADA"
  // se marca como completada y se genera un certificado; si es
  // "RECHAZADA" se cancela la donación.
  const updateStatus = useCallback(
    (id, newStatus) => {
      if (newStatus === "COMPLETADA") {
        completeDonation(id);
        generateCertificate(id);
      } else if (newStatus === "RECHAZADA") {
        cancelDonation(id);
      }
      fetchDonations();
    },
    [fetchDonations],
  );

  return {
    donations,
    isLoading,
    isError,
    updateStatus,
  };
}

export default useDonationsManagement;
