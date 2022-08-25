import React from "react";
import Header from "components/Header";
import Tree from "components/Tree";
import CheckboxTree from "components/CheckboxTree";
import ExternalInfo from "components/ExternalInfo";
import TreeView from 'deni-react-treeview';

import { FaTrash, FaEdit, FaAdd } from 'react-icons/fa';
//import CustomTree from "components/CustomTree";

const treeData = [
  {
    key: "0",
    label: "Documents",
    icon: "fa fa-folder",
    title: "Documents Folder",
    children: [
      {
        key: "0-0",
        label: "Document 1-1",
        icon: "fa fa-folder",
        title: "Documents Folder",
        children: [
          {
            key: "0-1-1",
            label: "Document-0-1.doc",
            icon: "fa fa-file",
            title: "Documents Folder",
          },
          {
            key: "0-1-2",
            label: "Document-0-2.doc",
            icon: "fa fa-file",
            title: "Documents Folder",
          },
          {
            key: "0-1-3",
            label: "Document-0-3.doc",
            icon: "fa fa-file",
            title: "Documents Folder",
          },
          {
            key: "0-1-4",
            label: "Document-0-4.doc",
            icon: "fa fa-file",
            title: "Documents Folder",
          },
        ],
      },
    ],
  },
  {
    key: "1",
    label: "Desktop",
    icon: "fa fa-desktop",
    title: "Desktop Folder",
    children: [
      {
        key: "1-0",
        label: "document1.doc",
        icon: "fa fa-file",
        title: "Documents Folder",
      },
      {
        key: "0-0",
        label: "documennt-2.doc",
        icon: "fa fa-file",
        title: "Documents Folder",
      },
    ],
  },
  {
    key: "2",
    label: "Downloads",
    icon: "fa fa-download",
    title: "Downloads Folder",
    children: [],
  },
];

const onActionButtonClick = (item, actionButton) => {
  const buttonName = actionButton.type.name;
   switch (buttonName) {
    case 'FaTrash':
      console.log('Action: trash, Item: ' + item.text);
      break;
    case 'FaEdit':
      console.log('Action: edit, Item: ' + item.text);
      break;
    default:
  }
}

const actionButtons = [
  (<FaTrash key={1} size="15" color="#ff9980" visibility={"hidden"} />),
  (<FaEdit key={2} size="15" color="#3679b0" />)
];

const nodes = [
  {
    value: "123",
    data: "mars2",
    label: "Mars",
    children: [
      {
        data: "mars2",
        value: "ma1srs2",
        label: "Ph24obos",

      },

    ]
  }
];

const TreeList = () => {
  return (
    <>
 <CheckboxTree url={"tree/manager"} nodes={nodes} />

      <Header title="Tree Data Visualization" />
      <div className="row">
        <div className="col text-center">
          <h2>Tree Visualization component</h2>
          <p className="mt-3">
            <div className="row mt-3 d-flex justify-content-center">
              <div className="col-lg-8 text-left text-dark">


               


              </div>
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default TreeList;
