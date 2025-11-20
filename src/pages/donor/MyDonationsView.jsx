// src/pages/donor/MyDonationsView.jsx
import { useState } from "react";
import { Button } from "@mui/material";

import useMyDonationsListView from "./hooks/useMyDonationsListView.jsx";
import useSearchAccordion from "../../components/tables/hooks/useSearchAccordion.js";
import GenericTable from "../../components/tables/GenericTable.jsx";
import { Navigate } from "react-router-dom";

// 🔍 Campos de filtro para el historial de donaciones
const searchFields = [
  {
    name: "campaign",
    label: "Campaña",
    defaultValue: "",
  },
  {
    name: "center",
    label: "Centro de donación",
    defaultValue: "",
  },
  {
    name: "dateFrom",
    label: "Fecha desde",
    defaultValue: "",
    inputType: "date",
  },
  {
    name: "dateTo",
    label: "Fecha hasta",
    defaultValue: "",
    inputType: "date",
  },
  {
    name: "status",
    label: "Estado",
    defaultValue: "",
    inputType: "select",
    options: [
      { label: "Todas", value: "" },
      { label: "Completada", value: "COMPLETED" },
      { label: "Pendiente", value: "PENDING" },
      { label: "Cancelada", value: "CANCELLED" },
    ],
  },
];

export default function MyDonationsView() {
  const [page, setPage] = useState(0); // MUI es 0-based
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { searchValue, handleSearch, handleClear } = useSearchAccordion();

  const { donations, totalCount, isLoading, isError, error } =
    useMyDonationsListView(searchValue, page + 1, rowsPerPage);

  const handleOpenCertificate = (row) => {
    if (!row.certificate_url) return;
    window.open(row.certificate_url, "_blank", "noopener,noreferrer");
  };

  const columns = [
    { id: "date", label: "FECHA", type: "date" },
    { id: "campaign_name", label: "CAMPAÑA" },
    { id: "center_name", label: "CENTRO" },
    { id: "donation_type", label: "TIPO DE DONACIÓN" },
    { id: "volume_ml", label: "CANTIDAD (ml)", align: "right" },
    { id: "status", label: "ESTADO" },
    {
      id: "certificate",
      label: "CERTIFICADO",
      align: "center",
      render: (row) => (
        <Button
          variant="outlined"
          size="small"
          onClick={(e) => {
            e.stopPropagation(); // por si después hacés onRowClick
            handleOpenCertificate(row);
          }}
          disabled={!row.certificate_url}
        >
          Ver PDF
        </Button>
      ),
    },
  ];

  const handleCreateDonation = () => {
    // 👉 Ruta a la página de campañas disponibles
    Navigate("/campaigns/available");
  };

  return (
    <GenericTable
      title="Historial de Donaciones"
      subtitle="Consulta tus donaciones realizadas, filtra por fecha o centro y descarga tus certificados."
      columns={columns}
      data={donations}
      isLoading={isLoading}
      isError={isError}
      error={error}
      searchFields={searchFields}
      onSearch={handleSearch}
      onClear={handleClear}
      pagination={{
        count: totalCount, // si tu backend aún no manda total, podés dejar -1
        page,
        rowsPerPage,
      }}
      onPageChange={(e, newPage) => setPage(newPage)}
      onRowsPerPageChange={(e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
      }}
      // si en el futuro querés ver detalle de la donación:
      // onRowClick={(row) => navigate(`/donor/donations/${row.id}`)}
    />
  );
}
