import React from "react";
import AuthService from "../api/api";
import swal from "sweetalert2";
const ProductList = () => {
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

  const getData = () => {
    AuthService.get_orders_api(page, success, (text) => {
      console.log("Error: ", text);
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

  const deleteOrder = (orderId) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          AuthService.delete_order_api(orderId, () => {
            swal.fire({
              title: "Deleted!",
              text: "Your order has been deleted!",
              icon: "success",
              timer: 1000,
            });
            getData();
          });
        }
      });
  };

  React.useEffect(() => {
    getData();
  }, [page]);

  return (
    <div>
      <div style={{ maxWidth: "1000px", margin: "auto", marginTop: "1em", marginBottom: "1em", padding: "1em" }} className="shadow">
        <table className="table table-hover caption-top">
          <thead className="table-light">
            <tr>
              <th>id</th>
              <th>Date</th>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.date}</td>
                <td>{row.item}</td>
                <td>{row.price}</td>
                <td>{row.quantity}</td>
                <td>{row.amount}</td>
                <td>
                  {" "}
                  <a
                    className="btn btn-light"
                    style={{ marginLeft: "auto" }}
                    onClick={(e) => {
                      deleteOrder(row.id);
                    }}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
