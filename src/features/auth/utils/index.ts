import { signIn } from "next-auth/react";

export async function signInWithCredentials(
  email: string,
  password: string,
  redirect: boolean = false,
) {
  const result = await signIn("credentials", {
    email: email,
    password: password,
    redirect: redirect,
  });

  if (!result?.ok) {
    throw new Error(result?.error || "Invalid credentials");
  }

  return result;
}
