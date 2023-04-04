import { useEffect } from "react";
import { useToast } from "native-base";
import { BaseRespondI } from "../redux/types";

const showToast = (response: BaseRespondI | null, error: any) => {
  const toast = useToast();
  console.log(response);
  console.log(error);

  useEffect(() => {
    if (!error && response) {
      toast.show({
        description: response.message,
        duration: 3000,
      });
    }
  }, [error, response]);
};

export default showToast;
