import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  useGetPostQuery,
  useUpdatePostMutation,
} from "../redux/services/postApi";

const UpdatePost = ({ onClick }) => {
  const { id } = useParams();
  const post = useGetPostQuery(id);
  const [form, setForm] = useState({
    title: post?.data?.post[0]?.title,
    content: post?.data?.post[0]?.content,
  });
  const [updatePost, { isLoading, error, data }] = useUpdatePostMutation();

  useEffect(() => {
    if (error) alert("Something went wrong");
  }, [error]);

  useEffect(() => {
    if (data) {
      alert("Post updated successfully");
      onClick();
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(id);
      await updatePost({ id: id, body: form });
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <Container>
      {post.isFetching || post.isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <Header>
            <Title>Update Post</Title>
            <CancleButton onClick={onClick}>X</CancleButton>
          </Header>
          <Form onSubmit={handleSubmit}>
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <TextInput
              placeholder="Content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            {isLoading ? (
              <SubmitButton disabled>Posting...</SubmitButton>
            ) : (
              <SubmitButton type="submit">Update Post</SubmitButton>
            )}
          </Form>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 450px;
  height: 450px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Header = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 30px 15px;
`;

const Title = styled.h2`
  font-size: 30px;
`;

const CancleButton = styled.button`
  border: none;
  width: 30px;
  font-size: 20px;
  font-weight: bolder;
  height: 30px;
  background: none;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 60%;
  height: 40px;
  margin: 5px 0;
  padding: 5px 15px;
  font-size: 18px;
`;

const TextInput = styled.textarea`
  width: 60% !important;
  height: 180px !important;
  margin: 5px 0;
  padding: 5px 15px;
  font-size: 18px;
`;

const SubmitButton = styled.button`
  width: 67%;

  padding: 0 15px;
  height: 40px;
  margin: 5px 0;
  font-size: 18px;
  cursor: pointer;
  border: none;
  background-color: green;
  color: white;
`;

export default UpdatePost;
