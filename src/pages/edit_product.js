import React from "react";
import { useLocation } from "react-router-dom";
import AuthService from "../api/api";

const EditProduct = () => {
  const [message, setMessage] = React.useState("");
  const [productInfo, setProductInfo] = React.useState("");
  const [list, setList, state, setState] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [pages, setPages] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [modalDescription, setModalDescription] = React.useState("");
  const [itemId, setItemId] = React.useState(null);
  const [error, setError] = React.useState("");
  const [item, setItem] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);

  const search = useLocation().search;

  const fetchProductData = async (e) => {
    const product_id = new URLSearchParams(search).get("product_id");
    await AuthService.productInfo(product_id, success, (text) => {
      setItem(text.item);
      setPrice(text.price);
      setQuantity(text.quantity);
    });
  };

  const success = async (text) => {
    setItemId(text.id);
    setItem(text.item);
    setPrice(text.price);
    setQuantity(text.quantity);
    //setProductInfo(text);
  };

  React.useEffect(() => {
    fetchProductData();
  }, []);

  const editProduct = (e) => {
    e.preventDefault();
    setError("");
    AuthService.put_order_api(itemId, { item, price, quantity }, () => {
      window.location = "/product_list";
    });
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  return (
    <div style={{ width: "500px", margin: "auto", marginTop: "50px", boxShadow: "5px 5px 20px #cccccccc", padding: "1em" }}>
      <div style={{ margin: "1em", color: "green" }}>{message}</div>
      <form method="post">
        <div className="modal-content">
          <div className="modal-body">
            <label>Item name</label>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="item"
                id="itemInput"
                value={item}
                onChange={(e) => {
                  setItem(e.target.value);
                }}
                placeholder="Item name"
              />
            </div>
            <label style={{ marginTop: "1em" }}>Price</label>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                name="price"
              />
            </div>
            <label style={{ marginTop: "1em" }}>Quantity</label>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                placeholder="Quantity"
                name="quantity"
              />
            </div>
            <small className="form-text text-muted">{error}</small>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary" onClick={editProduct}>
              Save changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
