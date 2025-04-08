import { useState } from "react";
import { useDoubleTap } from "use-double-tap";

// Mui
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Components
import PokemonSelect from "../Selects/PokemonSelect";
import PercentageForm from "../Forms/PercentageForm";

// Hooks
import { useMakeRequest } from "../../hooks/useAxios";

// Rsuite
import { Table, IconButton } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

const styles = `
.table-cell-editing .rs-table-cell-content {
  padding: 4px;
}
.table-cell-editing .rs-input {
  width: 100%;
}
.rs-table,
.rs-table-cell,
.rs-table-header-cell,
.rs-table-row-header {
  background: transparent !important;
}
.rs-table .rs-table-cell-content {
  background: transparent !important;
}

`;

function toValueString(value, dataType) {
  return dataType === "date" ? value?.toLocaleDateString() : value;
}

function removeIds(obj) {
  if (Array.isArray(obj)) {
    return obj.map(removeIds);
  } else if (obj && typeof obj === "object") {
    const newObj = {};
    for (const key in obj) {
      if (key !== "_id") {
        newObj[key] = removeIds(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}

export default function EncTableDialog({
  open,
  setOpen,
  counterId,
  game,
  encounterTable,
  completed,
}) {
  const makeRequest = useMakeRequest();
  const [data, setData] = useState(encounterTable);
  const [editingId, setEditingId] = useState(null);
  const [editingKey, setEditingKey] = useState(null);

  const type = completed ? "shiny" : "counters";

  const handleChange = (id, key, value) => {
    const nextData = Object.assign([], data);
    nextData.find((item) => item._id === id)[key] = value;

    setData(nextData);
  };

  const onEdit = (id, dataKey) => {
    setEditingId(id);
    setEditingKey(dataKey);
  };

  const onEditFinished = async () => {
    setEditingId(null);
    setEditingKey(null);

    try {
      await makeRequest(
        "patch",
        `/${type}/${counterId}?action=encounterTableEdit`,
        removeIds(data),
        null,
        true
      );
    } catch {
      return;
    }
  };

  const handleRemove = async (id) => {
    setData(data.filter((item) => item._id !== id));

    try {
      await makeRequest(
        "patch",
        `/${type}/${counterId}?action=encounterTableEdit`,
        removeIds(data.filter((item) => item._id !== id)),
        null,
        true
      );
    } catch {
      return;
    }
  };

  const handleClose = () => {
    setOpen(false);
    onEditFinished();
  };

  const fieldMap = {
    pokemon: PokemonSelect,
    percentage: PercentageForm,
  };

  const EditableCell = ({ rowData, dataType, dataKey, onChange, ...props }) => {
    const editing = rowData._id === editingId && dataKey === editingKey;
    const Field = fieldMap[dataType];
    const value = rowData[dataKey];
    const text = toValueString(value, dataType);

    const handleEdit = () => {
      onEdit?.(rowData._id, dataKey);
    };

    const bind = useDoubleTap((event) => {
      handleEdit();
    });

    return (
      <Cell
        {...props}
        tabIndex={0}
        className={editing ? "table-cell-editing" : "table-cell"}
        onDoubleClick={(e) => {
          e.preventDefault();
          handleEdit();
        }}
        {...bind}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleEdit();
          }
        }}
      >
        {editing ? (
          <Field
            width="100%"
            game={game}
            defaultValue={value}
            onBlur={onEditFinished}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onEditFinished();
              }
            }}
            handleChange={(value) => {
              onChange?.(rowData._id, dataKey, value);
            }}
          />
        ) : (
          text
        )}
      </Cell>
    );
  };

  const ActionCell = ({ rowData, dataKey, onEdit, onRemove, ...props }) => {
    return (
      <Cell {...props} style={{ padding: "6px", display: "flex", gap: "4px" }}>
        <IconButton
          size="xs"
          appearance="subtle"
          icon={<DeleteIcon />}
          onClick={() => {
            onRemove(rowData._id);
          }}
        />
      </Cell>
    );
  };

  return (
    <>
      <style>{styles}</style>

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": { width: "300px" },
        }}
      >
        <DialogTitle fontWeight={"bold"} variant="h4">
          Encounter Table
        </DialogTitle>
        <DialogContent>
          <Table
            data={[...data].sort((a, b) => b.percentage - a.percentage)}
            height={40 + data.length * 40}
            rowHeight={40}
          >
            <Column flexGrow={1}>
              <HeaderCell>Name</HeaderCell>
              <EditableCell
                dataKey="name"
                dataType="pokemon"
                onChange={handleChange}
              />
            </Column>

            <Column width={70}>
              <HeaderCell>%</HeaderCell>
              <EditableCell
                dataKey="percentage"
                dataType="percentage"
                onChange={handleChange}
              />
            </Column>

            <Column width={40}>
              <HeaderCell></HeaderCell>
              <ActionCell dataKey="_id" onRemove={handleRemove} />
            </Column>
          </Table>
          <DialogActions>
            <Button
              variant="contained"
              color="neutral"
              style={{ color: "white" }}
              onClick={() => {
                setData([
                  ...data,
                  {
                    _id: data.length + 1,
                    name: "Bulbasaur",
                    percentage: 100,
                  },
                ]);
              }}
            >
              Add Pokémon
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
