import { useEffect } from "react";
import ApiService from "../services/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import { message } from 'antd';

const useByid = (form) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
      if (!id) {
          message.error("Item ID is missing.");
          navigate("/catalog");
          return;
      }

      ApiService.getById(id)
        .then((response) => {
          console.log("Loaded data:", response.data);
          form.setFieldsValue(response.data);
        })
        .catch(() => {
          message.error("Failed to load item data.");
          navigate("/catalog");
        });
  }, [id, form, navigate]);
}

export default useByid;