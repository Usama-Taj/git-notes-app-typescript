import React from "react";
import { Avatar } from "antd";
import {
  getTimeFromDate,
  getValidData,
  getvalidDateDMMMY,
} from "utilities/utilityFunctions";
import { TableContent, GistTable } from "./TableView.styles";
import ActionColumn from "components/ActionColumn/ActionColumn";
import { withRouter } from "hoc/withRouter";
import { GistResponseTypes, RouterHOCTypes } from "types";
import { ColumnsType } from "antd/lib/table";

interface Props {
  gists: GistResponseTypes[];
  router: RouterHOCTypes;
}

const TableView: React.FC<Props> = ({ gists, router }) => {
  // Data Variables
  const mapped_gists = gists.map(
    ({ id, owner, created_at, description, files }, i) => ({
      key: i,
      id,
      name: owner.login,
      date: getvalidDateDMMMY(created_at),
      time: getTimeFromDate(created_at),
      keyword: getValidData(description),
      notebook_name: getValidData(Object.keys(files)[0]),
      avatar: owner.avatar_url,
    })
  );
  const logged_in =
    JSON.parse(localStorage.getItem("gist_app"))?.logged_in || false;

  // Table Columns
  const columns: ColumnsType<any>[] = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      align: "right",
      render: (avatar: string) => <Avatar size={50} src={avatar} />,
    },
    { title: "Name", dataIndex: "name", key: "name", align: "left" },
    { title: "Date", dataIndex: "date", key: "date", align: "left" },
    { title: "Time", dataIndex: "time", key: "time", align: "left" },
    { title: "Keyword", dataIndex: "keyword", key: "keyword", align: "left" },
    {
      title: "Notebook Name",
      dataIndex: "notebook_name",
      key: "notebook_name",
      align: "left",
    },
    {
      dataIndex: "action",
      key: "action",
      render: (text: string, { id }: GistResponseTypes) => (
        <ActionColumn id={id} />
      ),
    },
  ].filter((item) => item.dataIndex !== (logged_in ? null : "action"));

  // Rendering
  return (
    <TableContent>
      <GistTable
        rowSelection={{ type: "checkbox" }}
        dataSource={mapped_gists}
        columns={columns}
        onRow={({ id }: any) => ({
          onClick: () => router.navigate(`/gist-view/${id}`),
        })}
        pagination={false}
      />
    </TableContent>
  );
};

export default withRouter(TableView);
