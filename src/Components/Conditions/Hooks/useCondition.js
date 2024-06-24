import { useState } from "react";

function useCondition(props = [], initial) {
  const [conditions, setConditions] = useState(props);

  const handleAddOutlet = () => {
    setConditions((prev) => [...prev, initial]);
  };

  const handleSetInitial = (props) => {
    setConditions(props);
  };

  const handleUpdate = ({ id, payload }) => {
    setConditions((prev) => {
      const newConditions = [...prev];

      for (const index in newConditions) {
        const condition = newConditions[index];
        if (condition.id === id) {
          for (const k in payload) {
            condition[k] = payload[k];
          }
        }
      }

      return newConditions;
    });
  };

  const handleDelete = ({ id }) => {
    setConditions((prev) => prev.filter((condition) => condition.id !== id));
  };

  const handleChange = ({ type, ...props }) => {
    switch (type) {
      case "add":
        handleAddOutlet();
        break;
      case "update":
        handleUpdate(props);
        break;
      case "delete":
        handleDelete(props);
        break;
      default:
        break;
    }
  };

  return { handleChange, handleSetInitial, conditions };
}

export { useCondition };
