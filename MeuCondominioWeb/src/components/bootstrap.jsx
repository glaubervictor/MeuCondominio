import React from "react";

/*
 * Panel
 */
const Panel = ({ title, children, color }) => (
  <div className={`panel panel-${color}`}>
    <div className="panel-heading">
      <strong>{title}</strong>
    </div>
    <div className="panel-body">{children}</div>
  </div>
);

/*
 * Row
 */
const Row = ({ children }) => <div className="row">{children}</div>;

/*
 * Column
 */
const Column = ({ col, children }) => (
  <div className={`col-md-${col}`}>{children}</div>
);

/*
 * Form
 */
const Form = ({ handleSubmit, children }) => (
  <form onSubmit={handleSubmit}>{children}</form>
);

/*
 *
 */
const Br = () => <br />;

export { Panel, Row, Column, Form, Br };
