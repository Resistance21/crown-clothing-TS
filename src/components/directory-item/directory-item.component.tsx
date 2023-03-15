import { useNavigate } from "react-router-dom";

import {
  BackgroundImage,
  DirectoryItemBodyContainer,
  DirectoryItemContainer,
  H2,
  P,
} from "./directory-item.styles";

type DirectoryItemProps = {
  category: category;
};

type category = {
  imageUrl: string;
  title: string;
  route: string;
};

const DirectoryItem = ({ category }: DirectoryItemProps) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);
  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <DirectoryItemBodyContainer>
        <H2>{title}</H2>
        <P>Shop now</P>
      </DirectoryItemBodyContainer>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
