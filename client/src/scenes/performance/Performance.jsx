import { Box, useTheme } from "@mui/material";
import { useGetPerformanceQuery } from "../../state/api";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

const Performance = () => {
  const userId = useSelector(state => state.global.userId);
  const { data, isLoading } = useGetPerformanceQuery(userId);
  const theme = useTheme();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: params => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: params => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m='1.5rem 2.5rem'>
      <Header
        title='PERFORMANCE'
        subtitle='Track your affiliate sales performance here'
      />
      <Box
        mt='40px'
        height='75vh'
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            borderBottom: "none",
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={row => row._id}
          rows={(data && data.sales) || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Performance;
