import Link from "next/link";
import LegalDocument from "./components/LegalDocument";
import LegalContact from "./components/LegalContact";

const TermsModule = () => {
  return (
    <LegalDocument title="Terms of Use" lastUpdated="September 30, 2026">
      <p>
        These Terms of Use (&quot;Terms&quot;) govern your use of the Filmder website and app (the
        &quot;Service&quot;), run by Dmitry Pavlenko (&quot;we&quot;, &quot;us&quot;). By creating an
        account or using the Service, you agree to these Terms and to our{" "}
        <Link href="/privacy">Privacy Policy</Link>. If you do not agree, please do not use the
        Service.
      </p>

      <h2>1. The Service</h2>
      <p>
        Filmder helps you discover movies: you pick genres you like, swipe on movie cards, and the
        Service recommends movies based on your choices. Filmder does not stream or sell movies.
      </p>
      <p>
        The Service is in early access. Features may change, be interrupted or be removed, and
        recommendations may not always match your taste. The Service is currently free of charge.
      </p>

      <h2>2. Eligibility</h2>
      <p>You must be at least 16 years old to use the Service.</p>

      <h2>3. Your account</h2>
      <ul>
        <li>Give accurate information when you sign up and keep it up to date.</li>
        <li>Keep your password secure. You are responsible for activity on your account.</li>
        <li>One person, one account. Do not share or sell your account.</li>
        <li>Tell us right away if you think someone else has accessed your account.</li>
      </ul>

      <h2>4. Acceptable use</h2>
      <p>When using the Service, you agree not to:</p>
      <ul>
        <li>
          upload a nickname or avatar that is illegal, offensive, sexually explicit, hateful, or
          that infringes someone else&apos;s rights;
        </li>
        <li>impersonate another person;</li>
        <li>
          scrape, copy or collect data from the Service by automated means, or overload it with
          requests;
        </li>
        <li>
          try to get unauthorized access to the Service, other accounts, or our systems, or
          interfere with their security;
        </li>
        <li>use the Service for any unlawful purpose.</li>
      </ul>

      <h2>5. Your content</h2>
      <p>
        You keep ownership of the nickname and avatar you add. You give us a non-exclusive,
        royalty-free license to store and display them as needed to run the Service. This license
        ends when you delete the content or your account.
      </p>

      <h2>6. Movie information</h2>
      <p>
        Movie titles, descriptions, posters and other movie information are provided by The Movie
        Database (TMDB) and belong to their respective owners.{" "}
        <strong>
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </strong>{" "}
        We do not guarantee that movie information is accurate or complete.
      </p>

      <h2>7. Our rights</h2>
      <p>
        The Service, including its design, code and the Filmder name and logo, belongs to us. These
        Terms do not give you any rights to them other than to use the Service as intended.
      </p>

      <h2>8. Suspension and termination</h2>
      <p>
        You can stop using the Service at any time and ask us to delete your account (see{" "}
        <Link href="/privacy">Privacy Policy</Link>, section 9). We may suspend or close your account
        if you break these Terms, or if we need to protect the Service or other users. We may also
        discontinue the Service; if we do, we will try to give reasonable notice.
      </p>

      <h2>9. Disclaimers</h2>
      <p>
        The Service is provided &quot;as is&quot; and &quot;as available&quot;, without warranties
        of any kind, to the extent allowed by law. We do not promise that the Service will be
        uninterrupted, error-free, or that you will enjoy the movies it recommends.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        The Service is provided free of charge. To the fullest extent allowed by law, we are not
        liable for any damages arising from or related to your use of, or inability to use, the
        Service — including indirect, incidental or consequential damages, loss of data, and
        service interruptions. Nothing in these Terms limits liability that cannot be limited by
        law, and nothing affects your mandatory rights as a consumer.
      </p>

      <h2>11. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. We will change the &quot;Last updated&quot;
        date above and, for significant changes, let you know in the Service or by email. If you
        keep using the Service after changes take effect, you accept the updated Terms.
      </p>

      <h2>12. Contact</h2>
      <p>Questions about these Terms? Get in touch:</p>
      <LegalContact />
    </LegalDocument>
  );
};

export default TermsModule;
