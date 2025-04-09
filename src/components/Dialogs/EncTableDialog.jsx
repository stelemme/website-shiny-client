import { useState } from "react";
import { useDoubleTap } from "use-double-tap";

// Mui
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import DeleteIcon from "@mui/icons-material/Delete";

// Components
import PokemonSelect from "../Selects/PokemonSelect";
import PercentageForm from "../Forms/PercentageForm";

// Hooks
import { useMakeRequest } from "../../hooks/useAxios";

// Rsuite
import { Table, IconButton } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

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
  name,
  game,
  editCondition,
  totalEncounters,
  encounterTable,
  completed,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const makeRequest = useMakeRequest();
  const [data, setData] = useState(encounterTable);
  const [editingId, setEditingId] = useState(null);
  const [editingKey, setEditingKey] = useState(null);

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

  .karya-table-row, .karya-table-row .rs-table-cell {
    background: ${colors.grey[500]} !important;
}
`;

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

    if (JSON.stringify(encounterTable) !== JSON.stringify(data)) {
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
        className={
          editing && editCondition ? "table-cell-editing" : "table-cell"
        }
        onDoubleClick={(e) => {
          handleEdit();
        }}
        {...bind}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleEdit();
          }
        }}
      >
        {editing && editCondition ? (
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
          <>
            {text}
            {dataType === "percentage" ? "%" : ""}
          </>
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
            height={40 + data.length * 44}
            rowHeight={44}
            rowClassName={(rowData) =>
              rowData?.name === name ? "karya-table-row" : ""
            }
          >
            <Column flexGrow={1}>
              <HeaderCell>Name</HeaderCell>
              <EditableCell
                dataKey="name"
                dataType="pokemon"
                onChange={handleChange}
              />
            </Column>

            <Column width={52}>
              <HeaderCell>Pct.</HeaderCell>
              <EditableCell
                dataKey="percentage"
                dataType="percentage"
                onChange={handleChange}
              />
            </Column>
            <Column width={55}>
              <HeaderCell>Enc.</HeaderCell>
              <Cell>
                {(rowData) =>
                  Math.round((rowData.percentage * totalEncounters) / 100)
                }
              </Cell>
            </Column>

            {editCondition && (
              <Column width={30}>
                <HeaderCell></HeaderCell>
                <ActionCell dataKey="_id" onRemove={handleRemove} />
              </Column>
            )}
          </Table>
          {editCondition && (
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
                      name: name,
                      percentage: 0,
                    },
                  ]);
                }}
              >
                Add Pokémon
              </Button>
            </DialogActions>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
