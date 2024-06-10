"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../components/confirmation/page";
import "../styles/admin.css";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

export default function getall() {
  const [total, setTotal] = useState<number>(0);
  const [datauser, setDataUser] = useState<any[]>([]);
  const [dataseller, setDataSeller] = useState<any[]>([]);
  const [products, setProducts] = useState<number>(0);
  const [dataprodactus, setDataProducts] = useState<any[]>([]);
  const [panier, setPanier] = useState<number>(0);
  const [datapanier, setDataPanier] = useState<any[]>([]);
  const [view, setView] = useState<string>("Customers");
  const [showDropdown, setShowDropdown] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [showConditionDropdown, setShowConditionDropdown] = useState<{
    [key: number]: boolean;
  }>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<() => void>(() => {});
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const categories = ["sport", "gaming", "phones", "pcs", "kitchen", "fishing"];

  const colors = [
    "#FF6384", // sport
    "#36A2EB", // gaming
    "#FFCE56", // phones
    "#4BC0C0", // pcs
    "#9966FF", // kitchen
    "#FF9F40", // fishing
  ];

  const dropDown = (id: number) => {
    if (showDropdown[id]) {
      setShowDropdown((previousDDState) => ({
        ...previousDDState,
        [id]: false,
      }));
    } else {
      setShowDropdown((previousDDState) => ({
        ...previousDDState,
        [id]: true,
      }));
    }
  };

  // this function toggles the visibility of a dropdown menu based on  given id
  const conditionDropdown = (id: number) => {
    if (showConditionDropdown[id]) {
      setShowConditionDropdown((previousState) => ({
        ...previousState,
        [id]: false,
      }));
    } else {
      setShowConditionDropdown((previousState) => ({
        ...previousState,
        [id]: true,
      }));
    }
  };

  const allCustomer = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/admin/Customer`
      );
      setTotal(response.data.user.length + response.data.sellers.length);
      setDataUser(response.data.user);
      setDataSeller(response.data.sellers);
    } catch (err) {
      console.log(err);
    }
  };

  const product = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/products`);
      setProducts(response.data.length);
      setDataProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const panie = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/panier/all`);
      setPanier(response.data.length);
      setDataPanier(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    allCustomer();
    product();
    panie();
  }, []);

  const del = async (email: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/admin/del/${email}`);
      allCustomer();
    } catch (err) {
      console.log(err);
    }
  };

  const delProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`);
      product();
    } catch (err) {
      console.log(err);
    }
  };

  const delOrder = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/panier/del/${productId}`);
      panie();
    } catch (err) {
      console.log(err);
    }
  };

  const changeRole = async (user: any) => {
    try {
      await axios.post(`http://localhost:4000/api/admin/changeRole`, {
        email: user.email,
      });
      allCustomer();
    } catch (err) {
      console.log(err);
    }
  };

  const updateCondition = async (productId: number, condition: string) => {
    try {
      await axios.put(`http://localhost:4000/api/products/${productId}`, {
        condition: condition,
      });
      product();
    } catch (err) {
      console.log(err);
    }
  };

  const confirmAction = (
    action: () => void,
    title: string,
    message: string
  ) => {
    setModalAction(() => action);
    setModalTitle(title);
    setModalMessage(message);
    setShowModal(true);
  };

  const Confirm = () => {
    modalAction();
    setShowModal(false);
  };

  const filteredCustomers = [...datauser, ...dataseller].filter((user) => {
    const searchedInput = user.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const searchedInputRole = filterRole === "all" || user.role === filterRole;
    return searchedInput && searchedInputRole;
  });

  const filteredProducts = dataprodactus.filter((product) => {
    const searchedInput = product.name
      .toLowerCase()
      .includes(searchProduct.toLowerCase());
    const searchedCat =
      filterCategory === "all" || product.category === filterCategory;
    return searchedInput && searchedCat;
  });

  const changeView = () => {
    if (view === "Customers") {
      return (
        <>
          <div className="table-header">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="role-filter"
            >
              <option value="all">All</option>
              <option value="user">Users</option>
              <option value="seller">Sellers</option>
            </select>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((e: any) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.username}</td>
                  <td>{e.email}</td>
                  <td>{e.role}</td>
                  <td>
                    <div className="action-dropdown">
                      <button
                        className="dropbtn"
                        onClick={() => dropDown(e.id)}
                      >
                        ⋯
                      </button>
                      {showDropdown[e.id] && (
                        <div className="dropdown-content">
                          <button
                            onClick={() =>
                              confirmAction(
                                () => del(e.email),
                                "Confirm Delete",
                                `Are you sure you want to delete ${e.username}?`
                              )
                            }
                          >
                            Delete
                          </button>
                          <button
                            onClick={() =>
                              confirmAction(
                                () => changeRole(e),
                                "Confirm Change Role",
                                `Are you sure you want to change the role of ${
                                  e.username
                                } from ${e.role} to ${
                                  e.role === "user" ? "seller" : "user"
                                }?`
                              )
                            }
                          >
                            Change Role
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } else if (view === "Products") {
      return (
        <>
          <div className="table-header">
            <input
              type="text"
              placeholder="Search"
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="role-filter"
            >
              <option value="all">All Categories</option>
              {categories.map((category, index) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Condition</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((e: any) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td>{e.price}</td>
                  <td>{e.category}</td>
                  <td>{e.condition || "null"}</td>
                  <td>
                    <div className="action-dropdown">
                      <button
                        className="dropbtn"
                        onClick={() => dropDown(e.id)}
                      >
                        ⋯
                      </button>
                      {showDropdown[e.id] && (
                        <div className="dropdown-content">
                          <button
                            onClick={() =>
                              confirmAction(
                                () => delProduct(e.id),
                                "Confirm Delete",
                                `Are you sure you want to delete the product ${e.name}?`
                              )
                            }
                          >
                            Delete
                          </button>
                          <button onClick={() => conditionDropdown(e.id)}>
                            Set Condition
                          </button>
                          {showConditionDropdown[e.id] && (
                            <div className="dropdown-content">
                              <button
                                onClick={() =>
                                  confirmAction(
                                    () => updateCondition(e.id, "Flash Sales"),
                                    "Confirm Update Condition",
                                    `Are you sure you want to set the condition of ${e.name} to Flash Sales?`
                                  )
                                }
                              >
                                Flash Sales
                              </button>
                              <button
                                onClick={() =>
                                  confirmAction(
                                    () => updateCondition(e.id, "Best Seller"),
                                    "Confirm Update Condition",
                                    `Are you sure you want to set the condition of ${e.name} to Best Seller?`
                                  )
                                }
                              >
                                Best Seller
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } else if (view === "Orders") {
      return (
        <>
          <div className="table-header">
            <input type="text" placeholder="Search" />
          </div>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th> User Name</th>
                <th> User Email</th>
                <th> Product Price</th>
                <th> Product Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {datapanier.map((e: any) => {
                const user = datauser.find((user: any) => user.id === e.UserId);
                const product = dataprodactus.find(
                  (product: any) => product.id === e.productId
                );
                if (product && user) {
                  return (
                    <tr key={e.id}>
                      <td>{product.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>
                        <div className="action-dropdown">
                          <button
                            className="dropbtn"
                            onClick={() => dropDown(e.id)}
                          >
                            ⋯
                          </button>
                          {showDropdown[e.id] && (
                            <div className="dropdown-content">
                              <button
                                onClick={() =>
                                  confirmAction(
                                    () => delOrder(product.id),
                                    "Confirm Delete",
                                    `Are you sure you want to delete the order for ${product.name}?`
                                  )
                                }
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </>
      );
    } else if (view === "Charts") {
      const userCount = datauser.length;
      const sellerCount = dataseller.length;

      const pieData = {
        labels: ["Users", "Sellers"],
        datasets: [
          {
            data: [userCount, sellerCount],
            backgroundColor: ["#007bff", "#ff6384"],
            hoverBackgroundColor: ["#0056b3", "#ff6384"],
          },
        ],
      };

      const productCategoryCounts = categories.map((category) => {
        return dataprodactus.filter((product) => product.category === category)
          .length;
      });

      const lineChartData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: categories.map((category, index) => ({
          label: category,
          data: [0, 0, 0, 0, 0, productCategoryCounts[index]],
          borderColor: colors[index],
          fill: false,
        })),
      };

      return (
        <div className="charts-container">
          <div className="chart-wrapper">
            <h2>Customer Distribution</h2>
            <Pie data={pieData} width={400} height={400} />
          </div>
          <div className="chart-wrapper">
            <h2>Product Additions Over Time</h2>
            <Line data={lineChartData} width={400} height={400} />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container">
      <div className="nav">
        <h2 className="nav-title">Exclusive</h2>
        <h2
          onClick={() => {
            setView("Customers");
          }}
        >
          Customers
        </h2>
        <h2
          onClick={() => {
            setView("Products");
          }}
        >
          Products
        </h2>
        <h2
          onClick={() => {
            setView("Orders");
          }}
        >
          Orders
        </h2>
        <h2
          onClick={() => {
            setView("Charts");
          }}
        >
          Charts
        </h2>
      </div>
      <div className="dashboard">
        <h1>{view}</h1>
        <div className="stats">
          <div className="stat-box">
            <h3>Customers</h3>
            <h3>{total}</h3>
          </div>
          <div className="stat-box">
            <h3>Products</h3>
            <h3>{products}</h3>
          </div>
          <div className="stat-box">
            <h3>Orders</h3>
            <h3>{panier}</h3>
          </div>
        </div>
        <div>{changeView()}</div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={Confirm}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
}
