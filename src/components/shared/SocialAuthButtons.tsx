import { FaGoogle, FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export function SocialAuthButtons() {
  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="outline"
        className="flex items-center cursor-pointer justify-center gap-2"
        onClick={() => signIn("google")}
      >
        <FaGoogle size={18} />
        Continue with Google
      </Button>

      <Button
        variant="outline"
        className="flex items-center justify-center cursor-pointer gap-2"
        onClick={() => signIn("github")}
      >
        <FaGithub size={18} />
        Continue with GitHub
      </Button>
    </div>
  );
}
