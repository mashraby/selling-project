import axios from "axios";
import React, { useState } from "react"; // Set the app element for accessibility
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function LoginModal() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    axios
      .post("/login", {
        data: {
          name,
          password,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data != "Error") {
          window.localStorage.setItem("token", JSON.stringify(response.data));
          navigate("/");
          // window.location.reload();
        } else {
          window.localStorage.removeItem("token");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("Name: ", name);
    console.log("Password: ", password);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="text">
              <FormLabel>Name</FormLabel>
              <Input
                onChange={(e) => setName(e.target.value)}
                onBlur={(e) => setName(e.target.value)}
                type="text"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                onClick={handleSubmit}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
