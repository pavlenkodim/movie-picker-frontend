import { CONTACT_EMAIL, SUPPORT_TELEGRAM_URL } from "@/shared/constants";

const LegalContact = () => {
  return (
    <ul>
      <li>
        Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </li>
      <li>
        Telegram:{" "}
        <a href={SUPPORT_TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
          {SUPPORT_TELEGRAM_URL.replace("https://", "")}
        </a>
      </li>
    </ul>
  );
};

export default LegalContact;
