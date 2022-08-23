import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./index.css";
import TreeView from 'deni-react-treeview';

const Tree = ({ data = [] }) => {
  return (
                  
<TreeView url="http://localhost:8092/tree/manager" showCheckbox={true} theme="classic" />
   
  );
}; 

export default Tree;
