import React from "react";
import AuthService from "../api/api";
const Product = () => {
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
  const [message, setMessage, errormessage, setErrorMessage] = React.useState("");

  const success = (data) => {
    setList(data.data);
    setCount(data.count);
    const newPages = [];
    if (data.count > 10) {
      for (let i = 0; i < Math.ceil(data.count / 10); i++) {
        newPages.push({
          name: (i + 1).toString(),
          page: i,
        });
        console.log("page", i);
      }
      if (page > newPages.length - 1) {
        setPage(page - 1);
      }
    } else {
      setPage(0);
    }
    setPages(newPages);
  };

  const saveOrder = (e) => {
    e.preventDefault();
    setError("");
    AuthService.post_order_api({ item, price, quantity }, () => {
      window.location = "/product_list";
    });
  };

  const failed = async (text) => {
    setErrorMessage(text);
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  return (
    <div>
      <div style={{ width: "1000px", margin: "auto", marginTop: "10px", boxShadow: "5px 5px 20px #cccccccc", padding: "1em" }}>
        <div style={{ margin: "1em", color: "green" }}>{message}</div>
        <div style={{ margin: "1em", color: "red" }}>{errormessage}</div>
        <div style={{ width: "500px", margin: "auto", marginTop: "40px", marginBottom: "40px", boxShadow: "5px 5px 20px #cccccccc", padding: "1em" }}>
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
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                  }}
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary" onClick={saveOrder}>
                  Save changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Product;
