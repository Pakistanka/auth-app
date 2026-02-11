import styled from 'styled-components';

export const UserItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;

  &:hover {
    background-color: #fafafa;
  }

  .user-info {
    flex: 1;
  }

  .user-name {
    font-weight: 600;
    color: #262626;
    margin-bottom: 4px;
  }

  .user-date {
    font-size: 14px;
    color: #8c8c8c;
  }
`;
