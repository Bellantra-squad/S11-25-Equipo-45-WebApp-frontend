import { MarkdownField } from "@refinedev/antd";

import { Typography } from "antd";


type Props = {
  description?:string;
};

export const DescriptionHeader = ({ description }: Props) => {
  if (description) {
    return (
      <Typography.Paragraph ellipsis={{ rows: 8 }}>
        <MarkdownField value={description} />
      </Typography.Paragraph>
    );
  }

  return <Typography.Link>Add task description</Typography.Link>;
};
