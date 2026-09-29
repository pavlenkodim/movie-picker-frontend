import Link from "next/link";
import LegalDocument from "./components/LegalDocument";
import LegalContact from "./components/LegalContact";

const PrivacyModule = () => {
  return (
    <LegalDocument title="Privacy Policy" lastUpdated="September 30, 2026">
      <p>
        This Privacy Policy explains what personal data Filmder (&quot;Filmder&quot;,
        &quot;we&quot;, &quot;us&quot;) collects when you use the Filmder website and app (the
        &quot;Service&quot;), why we collect it, and what choices you have. By using the Service
        you also agree to our <Link href="/terms">Terms of Use</Link>.
      </p>

      <h2>1. Who we are</h2>
      <p>
        Filmder is an independent project run by Dmitry Pavlenko, who is the controller of your
        personal data. You can reach us at any time:
      </p>
      <LegalContact />

      <h2>2. Data we collect</h2>
      <h3>Account data</h3>
      <ul>
        <li>
          <strong>Email sign-up:</strong> your email address and password. Passwords are stored
          only in hashed form.
        </li>
        <li>
          <strong>Google sign-in:</strong> your Google account identifier, email address, name and
          profile picture, as provided by Google. We never receive your Google password.
        </li>
      </ul>
      <h3>Profile data</h3>
      <ul>
        <li>Your nickname.</li>
        <li>Your avatar image, if you upload one or sign in with Google.</li>
      </ul>
      <h3>Activity data</h3>
      <ul>
        <li>The genres you pick during onboarding.</li>
        <li>Your swipes (which movies you liked or skipped) and when you made them.</li>
        <li>Genre preference scores that we calculate from your swipes.</li>
      </ul>
      <h3>Technical data</h3>
      <p>
        Like most web services, our servers may log technical information such as your IP
        address, browser type and request times. We use it only to keep the Service running and
        secure.
      </p>

      <h2>3. How we use your data</h2>
      <ul>
        <li>To create and maintain your account and sign you in.</li>
        <li>To show your profile and your swipe history.</li>
        <li>To generate personalized movie recommendations based on your preferences.</li>
        <li>To protect the Service from abuse, fraud and security incidents.</li>
        <li>To answer your support requests.</li>
      </ul>
      <p>
        We do not sell your personal data, we do not use it for advertising, and we do not make
        decisions about you that have legal or similarly significant effects based solely on
        automated processing. Recommendations are the only automated processing we do.
      </p>

      <h2>4. Legal bases (EEA, UK and Switzerland)</h2>
      <p>If data protection laws such as the GDPR apply to you, we rely on:</p>
      <ul>
        <li>
          <strong>Performance of a contract</strong> — to provide the Service you signed up for,
          including your account, profile, history and recommendations.
        </li>
        <li>
          <strong>Legitimate interests</strong> — to keep the Service secure and to fix technical
          problems.
        </li>
        <li>
          <strong>Legal obligations</strong> — where we must keep or disclose data by law.
        </li>
      </ul>

      <h2>5. Cookies</h2>
      <p>
        We use only strictly necessary cookies that keep you signed in and protect sign-in forms
        (session and CSRF cookies). We do not use analytics, advertising or tracking cookies, so we
        do not ask for cookie consent.
      </p>

      <h2>6. Who we share data with</h2>
      <p>We share data only with service providers that help us run the Service:</p>
      <ul>
        <li>
          <strong>Google</strong> — if you choose to sign in with Google, Google processes your
          sign-in under its own privacy policy.
        </li>
        <li>
          <strong>The Movie Database (TMDB)</strong> — movie posters are loaded directly from
          TMDB&apos;s servers, so TMDB receives your IP address and browser information when
          images load. We do not send TMDB your account data.
        </li>
        <li>
          <strong>Hosting providers</strong> — the servers and databases that store the Service
          and its data.
        </li>
      </ul>
      <p>
        We may also disclose data if required by law or to protect the rights and safety of our
        users and the Service.
      </p>

      <h2>7. International transfers</h2>
      <p>
        Our service providers may process data outside your country, including outside the EEA.
        Where this happens, we rely on appropriate safeguards such as the European Commission&apos;s
        Standard Contractual Clauses or adequacy decisions.
      </p>

      <h2>8. How long we keep data</h2>
      <p>
        We keep your data for as long as your account exists. When you ask us to delete your
        account, we delete your account, profile and swipe history within 30 days, except for data
        we must keep by law. Technical logs are kept for a limited period and then deleted.
      </p>

      <h2>9. Your rights</h2>
      <p>Depending on where you live, you have the right to:</p>
      <ul>
        <li>access the personal data we hold about you and get a copy of it;</li>
        <li>correct inaccurate data — you can edit your nickname and avatar in your profile;</li>
        <li>delete your account and data;</li>
        <li>restrict or object to certain processing;</li>
        <li>receive your data in a portable format;</li>
        <li>lodge a complaint with your local data protection authority.</li>
      </ul>
      <p>
        To use any of these rights, including deleting your account, contact us using the details
        in section 1. We will reply within 30 days.
      </p>

      <h2>10. Security</h2>
      <p>
        We use reasonable technical and organizational measures to protect your data, including
        encrypted connections (HTTPS) and hashed passwords. No online service is completely secure,
        so please use a strong, unique password.
      </p>

      <h2>11. Children</h2>
      <p>
        The Service is not intended for anyone under 16. We do not knowingly collect data from
        children under 16. If you believe a child has given us personal data, contact us and we will
        delete it.
      </p>

      <h2>12. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. We will change the &quot;Last updated&quot;
        date above and, for significant changes, let you know in the Service or by email.
      </p>
    </LegalDocument>
  );
};

export default PrivacyModule;
