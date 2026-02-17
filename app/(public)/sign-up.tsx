import { useSignUp } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import {
  Button,
  Description,
  Input,
  InputOTP,
  Label,
  TextField,
} from "heroui-native";
import * as React from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const logo = require("../../assets/images/MyAXD-logo.png");

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [username, setUsername] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    console.log(emailAddress, password);

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        username,
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-col items-center gap-2 my-10">
            <Image
              source={logo}
              style={{ width: 120, height: 120 }}
              contentFit="contain"
              accessible
              accessibilityLabel="App logo"
            />
            <Text className="text-3xl font-bold text-center">
              Verify your email
            </Text>
            <Text className="text-md text-gray-500 text-center">
              Enter the 6-digit code sent to your email.
            </Text>
          </View>
          <View className="flex-col justify-center items-center px-4 gap-4">
            <InputOTP value={code} onChange={setCode} maxLength={6}>
              <InputOTP.Group>
                <InputOTP.Slot index={0} />
                <InputOTP.Slot index={1} />
                <InputOTP.Slot index={2} />
              </InputOTP.Group>
              <InputOTP.Separator />
              <InputOTP.Group>
                <InputOTP.Slot index={3} />
                <InputOTP.Slot index={4} />
                <InputOTP.Slot index={5} />
              </InputOTP.Group>
            </InputOTP>
            <Button onPress={onVerifyPress} className="mt-10 w-full">
              Verify
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-col items-center gap-2 my-10">
          <Image
            source={logo}
            style={{ width: 120, height: 120 }}
            contentFit="contain"
            accessible
            accessibilityLabel="App logo"
          />
          <Text className="text-3xl font-bold text-center">Create account</Text>
          <Text className="text-md text-gray-500 text-center">
            Please enter your details.
          </Text>
        </View>
        <View className="flex-col px-4 gap-4">
          <TextField>
            <Label>Username</Label>
            <Input
              value={username}
              placeholder="Enter username"
              onChangeText={(username) => setUsername(username)}
            />
            <Description>
              Choose a unique username for your account.
            </Description>
          </TextField>
          <TextField>
            <Label>Email</Label>
            <Input
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Enter email"
              onChangeText={(email) => setEmailAddress(email)}
            />
            <Description>
              We never share your email with anyone else.
            </Description>
          </TextField>
          <TextField>
            <Label>Password</Label>
            <Input
              value={password}
              placeholder="Enter password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <Description>
              Your password must be at least 8 characters long.
            </Description>
          </TextField>
          <Button onPress={onSignUpPress} className="mt-10">
            Continue
          </Button>
          <View className="flex-row text-center gap-1 justify-center">
            <Text className="text-gray-500">Already have an account?</Text>
            <Link href="/sign-in">
              <Text className="text-blue-500 font-bold">Sign in</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
