import { create } from "apisauce";

const api = create({
  baseURL: "http://localhost:5000/api"
});

api.addRequestTransform(request => {
  request.headers["Authorization"] = "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5NWUzODE5My1iN2QzLTRhMTItOGFmOS1mZDU1YjQ5YzMyMDMiLCJ1c2VySWQiOiJkYTdkZjJjMS02YWFiLTRjNWUtNDVlMi0wOGQ3MjY1NDI5MzAiLCJyb2xlIjoidXN1YXJpbyIsIm5iZiI6MTU2NjQwNTA3NywiZXhwIjoxNTc0MzUzODc3LCJpYXQiOjE1NjY0MDUwNzcsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NjMwMDkiLCJhdWQiOiJNZXVDb25kb21pbmlvIn0.6olE7s98950hUQ6UBuXWH6_QP-z0WoKm6KISHgas7li4VVkAih1yH0c4P6vnQciBMQDcJY9iSfy9lCvr3BClmQ";
});

api.addResponseTransform(response => {
  if (!response.ok) throw response.data;
});

export default api;