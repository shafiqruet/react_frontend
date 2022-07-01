import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

class AuthService {
  register(formData, success, failed, fail) {
    axios
      .post(`${API_URL}/api/signup/`, formData)
      .then((res) => {
        console.log(res.data.data.first_name);
        console.log(res.status);
      })
      .catch((errors) => console.log(errors));
  }

  login(formData, success, failed, fail) {
    axios
      .post(`${API_URL}/api/login/`, formData)
      .then((res) => success(res.data.data[0]))
      .catch((errors) => console.log(errors));
  }

  userInfo(userId, success, failed, fail) {
    axios
      .get(`${API_URL}/api/user_data/${userId}/`)
      .then((res) => success(res.data.data[0]))
      .catch((errors) => console.log(errors));
  }

  productInfo(product_id, success, failed, fail) {
    axios
      .get(`${API_URL}/api/orders/${product_id}/`)
      .then((res) => success(res.data.data))
      .catch((errors) => console.log(errors));
  }

  put_order_api(saleId, data, success) {
    console.log(data);
    console.log(saleId);
    axios
      .put(`${API_URL}/api/orders/${saleId}/`, data)
      .then((res) => success(res.data.data))
      .catch((errors) => console.log(errors));
  }

  post_order_api(data, success) {
    axios
      .post(`${API_URL}/api/orders/`, data)
      .then((res) => success(res.data.data))
      .catch((errors) => console.log(errors));
  }

  get_orders_api(pageNo = "", success, fail) {
    axios
      .get(`${API_URL}/api/orders/?page_no=${pageNo}`)
      .then((res) => success(res.data))
      .catch((errors) => console.log(errors));
  }

  delete_order_api(saleId, success) {
    axios
      .delete(`${API_URL}/api/orders/${saleId}/`)
      .then((res) => this.get_orders_api(0, success))
      .catch((errors) => this.get_orders_api(0, success));
  }
}

export default new AuthService();
