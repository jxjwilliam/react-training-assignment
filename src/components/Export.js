import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


class ExportExcel extends React.Component {
  render() {
    const {dataSet} = this.props;
    return (
      <ExcelFile>
        <ExcelSheet data={dataSet} name="On_Leave_Management">
          <ExcelColumn label="Name" value="name"/>
          <ExcelColumn label="From" value="fDate"/>
          <ExcelColumn label="To" value="tDate"/>
          <ExcelColumn label="From" value="fDate"/>
          <ExcelColumn label="Status" value="status"/>
        </ExcelSheet>
      </ExcelFile>
    )
  }
}

export default ExportExcel;