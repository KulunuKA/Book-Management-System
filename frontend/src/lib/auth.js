import { GetServerSidePropsContext } from "next";

export function requireAuth(context) {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
