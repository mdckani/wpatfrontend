import React, { useEffect, useState, useMemo } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const nodes = [
  {
    value: "0",
    label: "Mars",
    children: [
      {
        value: "01",
        label: "Ph24obos",
        children: [
          { value: "011", label: "Phobos" },
          { value: "012", label: "Deimos" }
        ]
      },
      {
        value: "02",
        label: "Deim5os",
        children: [
          { value: "021", label: "Phobos" },
          { value: "022", label: "Deimos" }
        ]
      }
    ]
  }
];
const Tree = (props) => {

  const [state, setState] = useState({
    checked: [],
    expanded: []
  });


  return (
    <CheckboxTree
      nodes={nodes}
      checked={state.checked}
      expanded={state.expanded}
      onCheck={(checked) => setState({ checked })}
      onExpand={(expanded) => setState({ expanded })}
    />
  );
}

export default Tree;
