import { GetServerSideProps } from "next";

export default function AuthPreventPage() {
  return <div className="text-center">You&apos;re logged-in</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  if (!req.headers.cookie)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  if (req.headers.cookie) {
    if (req.headers.cookie.includes("accessToken")) {
      return { props: {} };
    }
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
