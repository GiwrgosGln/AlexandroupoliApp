import { useSignIn } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { Button, Description, Input, Label, TextField } from "heroui-native";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const logo = require("../../assets/images/MyAXD-logo.png");

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showTwoFactor, setShowTwoFactor] = React.useState(false);
  const [twoFactorCode, setTwoFactorCode] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else if (signInAttempt.status === "needs_second_factor") {
        // Check if email_code strategy is supported
        const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
          (factor) => factor.strategy === "email_code",
        );

        if (emailCodeFactor) {
          // Prepare the second factor (this sends the email)
          await signIn.prepareSecondFactor({
            strategy: "email_code",
            emailAddressId: emailCodeFactor.emailAddressId,
          });
          setShowTwoFactor(true);
        } else {
          console.error(
            "No supported secondary factor found (expected email_code)",
          );
          console.error(JSON.stringify(signInAttempt, null, 2));
        }
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onTwoFactorPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code: twoFactorCode,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (showTwoFactor) {
    return (
      <SafeAreaView>
        <Text>Verify 2FA</Text>
        <TextInput
          value={twoFactorCode}
          placeholder="Enter your 2FA code"
          onChangeText={(code) => setTwoFactorCode(code)}
        />
        <TouchableOpacity onPress={onTwoFactorPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
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
          <Text className="text-3xl font-bold text-center">Welcome back</Text>
          <Text className="text-md text-gray-500 text-center">
            Please enter your details.
          </Text>
        </View>
        <View className="flex-col px-4 gap-4">
          <TextField>
            <Label>Email</Label>
            <Input
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Enter email"
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
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
          <Button onPress={onSignInPress} className="mt-10">
            Sign In
          </Button>
          <View className="flex-row text-center gap-1 justify-center">
            <Text className="text-gray-500">Don&apos;t have an account?</Text>
            <Link href="/sign-up">
              <Text className="text-blue-500 font-bold">Sign up</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
