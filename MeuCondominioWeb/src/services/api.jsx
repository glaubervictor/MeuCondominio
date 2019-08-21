import { create } from "apisauce";

const api = create({
  baseURL: "http://localhost:5000/api"
});

api.addRequestTransform(request => {
  request.headers["Authorization"] = `Bearer ${localStorage.getItem(
    "meuCondominio:token"
  )}`;
});

api.addResponseTransform(response => {
  if (!response.ok) throw response.data;
});

export default api;
