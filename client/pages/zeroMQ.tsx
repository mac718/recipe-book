import axios from "axios";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

const ZeroMQ = () => {
  const message = "A message from CS361";
  const apiCall = async (message: String) => {
    console.log(message);
    try {
      await axios.post(
        "http://localhost:8000/zeroMQ",
        {
          message: "A message from CS361",
        },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    apiCall(message);

    alert("A message from CS361");
  }, []);
  return <></>;
};

export default ZeroMQ;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   contex
//   return {
//     props: { products: JSON.parse(JSON.stringify(products)) },
//   };
// }
