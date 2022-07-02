import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddPost from "../components/AddPost";
import Card from "../components/Card";
import { useGetPostsQuery } from "../redux/services/postApi";

const Home = () => {
  const { data, error, isLoading, isFetching } = useGetPostsQuery();
  const [isAddModel, setIsAddModel] = useState(false);

  useEffect(() => {
    if (error) {
      alert("Something went wrong" + error.data);
    }
  }, [error]);

  return (
    <Container>
      {isAddModel ? (
        <AddPost onClick={() => setIsAddModel(!isAddModel)} />
      ) : (
        <>
          <MainContainer>
            <Hader>
              <SubTitle>Posts</SubTitle>
              <AddPostButton onClick={() => setIsAddModel(!isAddModel)}>
                Add Post
              </AddPostButton>
            </Hader>
            <CardContainer>
              {isLoading || isFetching ? (
                <span>Loading....</span>
              ) : (
                data?.posts?.map((post, index) => {
                  return (
                    <Card
                      key={index}
                      id={post.id}
                      title={post.title}
                      content={post.content}
                    />
                  );
                })
              )}
            </CardContainer>
          </MainContainer>
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

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Hader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 80px;
`;

const SubTitle = styled.h2`
  font-size: 28px;
`;

const AddPostButton = styled.button`
  width: 200px;
  height: 40px;
  border: none;
  font-size: 18px;
  cursor: pointer;
  /* background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center; */
`;

const Title = styled.h1`
  margin: 20px 0;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 25px;
  margin: 0 10px;
  margin-top: 30px;
  /* padding-left: 35px; */
`;

export default Home;
