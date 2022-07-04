import { OAuthExtension } from "@magic-ext/oauth";
import { Magic } from "magic-sdk";

export const magic =
  typeof window !== "undefined"
    ? new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || "", {
        extensions: [new OAuthExtension()],
      })
    : null;

export const googleLogin = async () => {
  if (!magic) throw new Error("magic is not initialized");
  await magic.oauth.loginWithRedirect({
    provider: "google" /* 'google', 'facebook', 'apple', or 'github' */,
    redirectURI: new URL("/callback", window.location.origin).href,
  });

  return await magic.oauth.getRedirectResult();
};

export const getUser = async () => {
  if (!magic) throw new Error("magic is not initialized");
  console.log(magic);
  const result = await magic.oauth.getRedirectResult();
  console.log("finish");
  authenticateWithServer(result.magic.idToken);
  console.log(result.magic.idToken);
};

const authenticateWithServer = async (didToken: string) => {
  if (!magic) throw new Error("magic is not initialized");
  let res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + didToken,
    },
  });

  if (res.status === 200) {
    let userMetadata = await magic.user.getMetadata();
    console.log(userMetadata);
  }
};
