import {
  Container,
  Card,
  Center,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button,
  FormErrorMessage,
  HStack,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";
import { object, string } from "yup";
const signinValidationSchema = object({
  username: string().required("User Name is required"),
  password: string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password must be at least 6 characters long"),
});
function SignIn() {
  return (
    <Container>
      <Center minH="100vh">
        <Card p="12" borderRadius="1rem" boxShadow="lg" w="480px">
          <Text textStyle="h1">Welcome To My Website</Text>
          <Text textStyle="p2">
            Enter your credentials to access the account.
          </Text>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={signinValidationSchema}
            onSubmit={(values) => {
              const myObject = JSON.parse(sessionStorage.getItem("user"));
              if (!myObject) {
                alert("Your Account is not signed up");
                return;
              } else {
                const userName = myObject.username;
                const password = myObject.password;
                if (
                  userName === values.username &&
                  password === values.password
                ) {
                  alert("Sign In Success");
                } else {
                  if (userName !== values.username) {
                    alert("UserName not exist");
                  } else {
                    if (password !== values.password) {
                      alert("Password not match");
                    }
                  }
                }
              }
            }}
          >
            {() => (
              <Form>
                <Stack mt="10" gap="4">
                  <Field name="username">
                    {({ field, meta }) => (
                      <FormControl isInvalid={!!(meta.error && meta.touched)}>
                        <FormLabel htmlFor="username">User Name</FormLabel>
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
                  <HStack justify="space-between">
                    <Checkbox>
                      <Text>Remember me</Text>
                    </Checkbox>

                    <Link>
                      <Text color="p.purple">Forgot password?</Text>
                    </Link>
                  </HStack>
                  <Button type="submit">Sign In</Button>
                  <Link to="/signup">
                    <Button variant="outline" mt="3" w="full">
                      Create a new account
                    </Button>
                  </Link>
                </Stack>
              </Form>
            )}
          </Formik>
        </Card>
      </Center>
    </Container>
  );
}

export default SignIn;
