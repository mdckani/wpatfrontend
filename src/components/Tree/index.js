import React from "react";
import CheckboxTree1 from "react-checkbox-tree";


import CheckboxTree from "components/CheckboxTree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import Axios from "axios";
import useFullPageLoader from "hooks/useFullPageLoader";


import AppConfig from "App.config";
const nodes = [];


class Tree extends React.Component {
  state = {
    checked: [],
    expanded: [],
    filterText: "",
    nodesFiltered: nodes,
    nodes
  };
  //sessionStorage.setItem("tree", JSON.stringify(state));

  componentDidMount() {
    Axios.get(AppConfig.backendApi + this.props.url)
      .then(res => {
        this.setState(
          (prevState) => ({
            filterText: ((sessionStorage.getItem("filterText") && sessionStorage.getItem("filterText").length > 0) ? JSON.parse(sessionStorage.getItem("filterText")) : ""),
            checked: ((sessionStorage.getItem("checked") && sessionStorage.getItem("checked").length > 0) ? JSON.parse(sessionStorage.getItem("checked")) : []),
            expanded: ((sessionStorage.getItem("expanded") && sessionStorage.getItem("expanded").length > 0) ? JSON.parse(sessionStorage.getItem("expanded")) : []),
            nodesFiltered: res.data,
            nodes: res.data
          }));
      }).catch(({ response }) => {
        console.log(response);
        //   this.setState({nodes});
      })
      .finally(() => {
      });
  }

  constructor(props) {
    super(props);


    this.onCheck = this.onCheck.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.filterTree = this.filterTree.bind(this);
    this.filterNodes = this.filterNodes.bind(this);
  }

  onCheck(checked, item, children) {
    this.setState({ checked });
    sessionStorage.setItem("checked", JSON.stringify(checked));
    if (item.checked) {
      //Add to session && add to map
      this.addToSession(item.data);
      for (var i = 0; i < children.length; i++) {
        this.addToSession(children[i]);
      }
    } else {
      //Remove from  session && Remove from  map
      this.removeFromSession(item.data);
      for (var i = 0; i < children.length; i++) {
        this.removeFromSession(children[i]);
      }
    }
  }
  addToSession(item) {
    if (item && item.type) {
      let selectedData = sessionStorage.getItem(item.type);
      selectedData = (selectedData && selectedData.length > 0) ? JSON.parse(selectedData) : {};
      selectedData[item.id] = item;
      sessionStorage.setItem(item.type, JSON.stringify(selectedData));
    }
  }
  removeFromSession(item) {
    if (item && item.type) {
      let selectedData = sessionStorage.getItem(item.type);
      selectedData = (selectedData && selectedData.length > 0) ? JSON.parse(selectedData) : {};
      delete selectedData[item.id];
      sessionStorage.setItem(item.type, JSON.stringify(selectedData));
    }
  }
  onExpand(expanded) {
    this.setState({ expanded });
    sessionStorage.setItem("expanded", JSON.stringify(expanded));
  }

  onFilterChange(e) {
    this.setState({ filterText: e.target.value }, this.filterTree);
    sessionStorage.setItem("filterText", JSON.stringify(e.target.value));

  }

  filterTree() {
    // Reset nodes back to unfiltered state
    if (!this.state.filterText) {
      this.setState((prevState) => ({
        nodesFiltered: prevState.nodes
      }));

      return;
    }

    const nodesFiltered = (prevState) => ({
      nodesFiltered: prevState.nodes.reduce(this.filterNodes, [])
    });

    this.setState(nodesFiltered);
  }

  filterNodes(filtered, node) {
    const { filterText } = this.state;
    const children = (node.children || []).reduce(this.filterNodes, []);

    if (
      // Node's label matches the search string
      node.label && node.label.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) >
      -1 ||
      // Or a children has a matching node
      children.length
    ) {
      filtered.push({ ...node, children });
    }

    return filtered;
  }

  render() {
    const { checked, expanded, filterText, nodesFiltered } = this.state;

    return (
      <div className="filter-container">
        <input
          className="filter-text"
          placeholder="Search..."
          type="text"
          value={filterText}
          onChange={this.onFilterChange}
        />
        <CheckboxTree
          checked={checked}
          expanded={expanded}
          iconsClass="fa5"
          nodes={nodesFiltered}
          onCheck={this.onCheck}
          onExpand={this.onExpand}

        />
      </div>
    );
  }
}

export default Tree;
