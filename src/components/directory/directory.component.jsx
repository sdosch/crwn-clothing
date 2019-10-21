import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectoySections } from "../../redux/directory/directory.selectors";
import "../menu-item/menu-item.component";
import "./directory.styles.scss";
import MenuItem from "../menu-item/menu-item.component";

const Directory = ({ sections }) => (
  <div className="directory-menu">
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

const mapStatetoProps = createStructuredSelector({
  sections: selectDirectoySections
});

export default connect(mapStatetoProps)(Directory);
