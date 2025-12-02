import { Space, Tag as AntTag, Typography } from "antd";
import { Tag } from "../../../../interfaces/models/tag.interface";


type Props = {
  tags?: Tag[];
};

export const TagsHeader = ({  tags = [] }: Props) => {

  if (tags.length > 0) {
    return (
      <Space size={[0, 8]} wrap>       

        {tags.map((tag) => (
          <AntTag
            key={`tag-${tag.id}`}
            color="purple"
            style={{
              padding: "2px 8px",
              borderRadius: 24,
              lineHeight: "unset",
            }}
          >
            {tag.name}
          </AntTag>
        ))}
      </Space>
    );
  }

  return <Typography.Link>Add tags & categories</Typography.Link>;
};
