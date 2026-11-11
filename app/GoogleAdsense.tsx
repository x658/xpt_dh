const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || "4925808070885501";

const GoogleAdsense = () => {
  const client = ADSENSE_CLIENT_ID.startsWith("ca-pub-")
    ? ADSENSE_CLIENT_ID
    : `ca-pub-${ADSENSE_CLIENT_ID}`;

  return (
    <>
      <meta name="google-adsense-account" content={client} />
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
        crossOrigin="anonymous"
      />
    </>
  );
};

export default GoogleAdsense;
