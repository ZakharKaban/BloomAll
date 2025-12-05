import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = api.getCurrentUser();
    if (user) {
      navigate("/catalog");
    } else {
      navigate("/auth");
    }
  }, [navigate]);

  return null;
};

export default Index;
