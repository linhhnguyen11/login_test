import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Center,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";
import { object, string, ref } from "yup";
const signupValidationSchema = object({
  username: string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters long")
    .max(15, "Username maximun 15 characters long")
    .matches(/^[a-zA-Z0-9]+$/, "Username is invalid"),
  email: string().email("Email is invalid").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password must be at least 6 characters long")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  repeatPassword: string()
    .oneOf([ref("password"), null], "Password must match")
    .required("Repeat password is required"),
});
function SignUp() {
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <Center minH="100vh">
          <Card p="12" borderRadius="1rem" boxShadow="lg" w="480px">
            <Text fontWeight="medium" textStyle="h1">
              Welcome To My Website
            </Text>
            <Text textStyle="p2" color="black.60" mt="4">
              Create free account by filling data below
            </Text>
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                repeatPassword: "",
              }}
              validationSchema={signupValidationSchema}
              onSubmit={(values) => {
                console.log(values);
                sessionStorage.setItem("user", JSON.stringify(values));
                navigate("/");
              }}
            >
              {() => (
                <Form>
                  <Stack mt="10" gap="6">
                    <Field name="username">
                      {({ field, meta }) => (
                        <FormControl isInvalid={!!(meta.error && meta.touched)}>
                          <FormLabel htmlFor="username">User Name </FormLabel>
                          <Input
                            {...field}
                            name="username"
                            type="text"
                            placeholder="Enter User Name"
                          ></Input>
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="email">
                      {({ field, meta }) => (
                        <FormControl isInvalid={!!(meta.error && meta.touched)}>
                          <FormLabel htmlFor="email">Email </FormLabel>
                          <Input
                            {...field}
                            name="email"
                            type="email"
                            placeholder="Enter Email"
                          ></Input>
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field, meta }) => (
                        <FormControl isInvalid={!!(meta.error && meta.touched)}>
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <Input
                            {...field}
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                          ></Input>
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="repeatPassword">
                      {({ field, meta }) => (
                        <FormControl isInvalid={!!(meta.error && meta.touched)}>
                          <FormLabel htmlFor="repeatPassword">
                            Repeat Password
                          </FormLabel>
                          <Input
                            {...field}
                            name="repeatPassword"
                            type="password"
                            placeholder="Enter Repeat Password"
                          ></Input>
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Button type="submit">Sign Up</Button>
                    <Text textStyle="p3" color="black.60" textAlign="center">
                      Already have an Account?{" "}
                      <Link to="/">
                        <Text as="span" color="p.purple">
                          Sign In
                        </Text>
                      </Link>
                    </Text>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Card>
        </Center>
      </Container>
    </div>
  );
}

export default SignUp;
