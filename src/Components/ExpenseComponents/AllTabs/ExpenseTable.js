import React, { useState, useEffect, useContext, forwardRef } from "react";
import MaterialTable from "material-table";
import { GlobalContext } from "../../Context/GlobalState";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export const ExpenseTable = ({ categoryId }) => {
  const {
    expenses,
    getExpenses,
    loading,
    deleteExpense,
    updateExpense,
    addExpense,
  } = useContext(GlobalContext);

  const addExpenseToRow = (newData) => {
    const newExpense = {
      id: Math.floor(Math.random() * 100000),
      description: newData.description,
      expenseAmount: newData.expenseAmount,
      expenseCategory: categoryId,
    };
    addExpense(newExpense);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const [columns, setColumns] = useState([
    { title: "Description", field: "description" },
    {
      title: "Amount",
      field: "expenseAmount",
    },
  ]);

  const [data, setData] = useState([]);

  return (
    <>
      {!loading && (
        <MaterialTable
          localization={{
            header: {
              actions: "",
            },
          }}
          className="is-narrow"
          options={{
            search: true,
            showTitle: false,
            actionsColumnIndex: -1,
          }}
          icons={tableIcons}
          columns={columns}
          data={expenses.filter((expense) => expense.category.id == categoryId)}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);
                  addExpenseToRow(newData, categoryId);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  updateExpense(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  deleteExpense(oldData.id);
                  resolve();
                }, 1000);
              }),
          }}
        />
      )}
      {loading && (
        <progress className="progress is-small is-primary" max="100">
          15%
        </progress>
      )}
    </>
  );
};

export default ExpenseTable;
