import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    return Promise.reject(new Error(error));
  }
);

export const fetchStatus = async () => {
  return await instance.get("/health");
};

export const fetchList = async ({filter = ""}) => {
  return await instance.get("/questions", {
    params: {
      limit: 10,
      offset: 0,
      filter: filter,
    },
  });
};

export const fetchQuestion = async (id) => {
  return await instance.get("/questions/" + id);
};

export const updateQuestion = async (id, body) => {
  return await instance.put("/questions/" + id, body);
};


export const share = async (destination_email="",content_url="") => {
  return await instance.post("/share",{},{
    params:{
      destination_email:destination_email,
      content_url:content_url
    }
  });
};
