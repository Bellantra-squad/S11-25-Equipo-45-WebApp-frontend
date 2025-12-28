import { FC, useMemo } from "react";
import { List, ListProps, TableProps, Card } from "antd";
import { IntegrationAPI } from "../../../../../interfaces/models/integration-api.interfaces";
import { PaginationTotal } from "../../../../../components/pagination/pagination-total";
import { IntegrationCard } from "./integration-card";

type Props = {
  tableProps: TableProps<IntegrationAPI>;
  setCurrent: (current: number) => void;
  setPageSize: (pageSize: number) => void;
};

export const IntegrationsCardView: FC<Props> = ({
  tableProps: { dataSource, pagination, loading },
  setCurrent,
  setPageSize,
}) => {
  const data = useMemo(() => [...(dataSource || [])], [dataSource]);

  return (
    <List
      grid={{
        gutter: 32,
        column: 4,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 4,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <IntegrationCard integration={item} />
        </List.Item>
      )}
      pagination={{
        ...(pagination as ListProps<IntegrationAPI>["pagination"]),
        hideOnSinglePage: true,
        position: "bottom",
        style: { display: "flex", marginTop: "1rem" },
        pageSizeOptions: ["12", "24", "48"],
        onChange: (page, pageSize) => {
          setCurrent(page);
          setPageSize(pageSize);
        },
        showTotal: (total) => (
          <PaginationTotal total={total} entityName="integración" />
        ),
      }}
    >
      {loading ? (
        <List
          grid={{
            gutter: 32,
            column: 4,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 4,
          }}
          dataSource={Array.from({ length: 12 }).map((_, i) => ({ id: i }))}
          renderItem={() => (
            <List.Item>
              <Card loading style={{ height: 150 }} />
            </List.Item>
          )}
        />
      ) : undefined}
    </List>
  );
};
