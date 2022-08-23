import React from "react";
import CheckboxTree from "react-checkbox-tree";
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
  componentDidMount() {
     Axios.get(AppConfig.backendApi +this.props.url)
      .then(res => { 
        this.setState(
          (prevState) => ({
            nodesFiltered: res.data,
            nodes: res.data
          }) );
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

  onCheck(checked) {
    this.setState({ checked });
  }

  onExpand(expanded) {
    this.setState({ expanded });
  }

  onFilterChange(e) {
    this.setState({ filterText: e.target.value }, this.filterTree);
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
      node.label  &&    node.label.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) >
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
