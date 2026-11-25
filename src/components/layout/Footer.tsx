import { SUPPORT_CONTACT } from "@/data/lms-data";

interface FooterProps {
  variant?: "login" | "authenticated";
}

export function Footer({ variant = "authenticated" }: FooterProps) {
  const hours =
    variant === "login"
      ? SUPPORT_CONTACT.loginHours
      : SUPPORT_CONTACT.authHours;

  return (
    <footer className="border-t border-[#3C4043] bg-[#202124] px-4 py-3.5 text-center text-xs text-[#BDC1C6]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span className="font-medium text-white">Need Help? Contact:</span>
        <span>
          Phone Number:{" "}
          <strong className="font-medium text-white">
            {SUPPORT_CONTACT.phone}
          </strong>
        </span>
        <span className="text-[#5F6368]" aria-hidden="true">
          |
        </span>
        <span>
          Email:{" "}
          <a
            href={`mailto:${SUPPORT_CONTACT.email}`}
            className="font-medium text-[#FFB200] hover:underline"
          >
            {SUPPORT_CONTACT.email}
          </a>
        </span>
        <span className="text-[#5F6368]" aria-hidden="true">
          |
        </span>
        <span>
          Facebook Page:{" "}
          <strong className="font-medium text-white">
            {SUPPORT_CONTACT.facebook}
          </strong>
        </span>
        <span className="text-[#5F6368]" aria-hidden="true">
          |
        </span>
        <span>
          Operating Hours:{" "}
          <strong className="font-medium text-white">{hours}</strong>
        </span>
      </div>
    </footer>
  );
}
