import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import styled from "styled-components";
import UpdatePost from "../components/UpdatePost";
import {
  useDeletePostMutation,
  useGetPostQuery,
} from "../redux/services/postApi";

const Post = () => {
  const { id } = useParams();
  const { data, error, isLoading, isFetching } = useGetPostQuery(id);
  const deletePost = useDeletePostMutation();
  const navigae = useNavigate();
  const [isAddModel, setIsAddModel] = useState(false);

  useEffect(() => {
    if (error) {
      alert("Something went wrong" + error.data);
    }
  }, [error]);

  useEffect(() => {
    if (deletePost[1].data) {
      alert("Post deleted successfully");
      navigae("/");
    }
  }, [deletePost[1].isSuccess]);

  const handleDelete = async (id) => {
    try {
      await deletePost[0](id);
    } catch (error) {
      alert("Something went wrong" + error.data);
    }
  };

  return (
    <Container>
      {isAddModel ? (
        <UpdatePost onClick={() => setIsAddModel(!isAddModel)} />
      ) : (
        <>
          {isLoading || isFetching ? (
            <span>Loading...</span>
          ) : (
            <>
              <PostContainer>
                <Header>
                  <Title>{data?.post[0]?.title}</Title>
                  <UpdateButton onClick={() => setIsAddModel(!isAddModel)}>
                    Update Post
                  </UpdateButton>
                </Header>
                <Content>{data?.post[0]?.content}</Content>
                {deletePost[1].isLoading ? (
                  <DeleteButton disabled>Deleting...</DeleteButton>
                ) : (
                  <DeleteButton onClick={() => handleDelete(data.post[0].id)}>
                    Delete
                  </DeleteButton>
                )}
              </PostContainer>
            </>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PostContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 30px;
  margin: 20px;
`;

const UpdateButton = styled.button`
  width: 150px;
  height: 50px;
  border: none;
  font-size: 18px;
  margin: 20px;
  cursor: pointer;
`;

const Content = styled.p`
  margin: 20px 20px;
`;

const DeleteButton = styled.button`
  width: 150px;
  height: 50px;
  border: none;
  background-color: red;
  color: white;
  font-size: 18px;
  margin: 20px;
  cursor: pointer;
`;

export default Post;
