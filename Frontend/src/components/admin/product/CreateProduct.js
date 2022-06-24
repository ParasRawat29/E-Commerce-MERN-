import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import AdminSidebar from "../AdminSidebar";
import { useAlert } from "react-alert";

import DescriptionIcon from "@mui/icons-material/Description";
import AbcIcon from "@mui/icons-material/Abc";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Camera from "../../../assets/images/Camera.jpeg";
import {
  clearErrors,
  createProduct,
  updateProduct,
} from "../../../redux/actions/productAction";
import actionTypes from "../../../redux/constats/actionTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  position: relative;
  min-height: 87vh;
  padding: 10px;
  .mainContent {
    .createProductWrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
      max-width: 1500px;

      transition: all 0.3s ease-in-out;
      margin-left: ${(props) => (props.sidebarOpen ? "220px" : "0px")};
      .left {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 40%;
        display: flex;
        padding: 1rem;
        justify-content: right;
        img {
          width: 100%;
          max-width: 200px;
          height: auto;
          object-fit: contain;
          margin: 10px;
        }
        .imagesPreviewWrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          img {
            width: 100px;
            height: 100px;
            margin: 10px 2px;
          }
        }
        .uploadBtn {
          font-family: "roboto";
          font-size: 1rem;
          padding: 5px 5px;
          font-weight: 600;
          display: flex;
          width: 100%;
          max-width: 300px;
          justify-content: center;
          align-items: center;
          border-radius: 900px;
          border: 3px solid #ffb328;
          background-color: inherit;
          cursor: pointer;
          &:hover {
            background-color: #ffb328;
          }
          &:active {
            transform: scale(0.94);
          }
          .uploadIcon {
            margin: 0 10px;
          }
        }
      }
      .right {
        width: 50%;
        font-family: "roboto";
        form {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .inputGroup {
            border: 2px solid black;
            width: 80%;
            display: flex;
            align-items: center;
            margin: 0.7rem 0;
            position: relative;
            padding: 0 10px;
            input {
              height: 100%;
              width: 90%;
              font-size: 1.4rem;
              padding: 5px 15px;
              outline: none;
              border: none;
              background: transparent;
              z-index: 1;
            }
            input[type="number"]::-webkit-outer-spin-button,
            input[type="number"]::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            textarea {
              width: 100%;
              resize: none;
              outline: none;
              border: none;
              background: transparent;
              font-size: 1.1rem;
              padding: 10px 15px;
            }
            select {
              cursor: pointer;
            }
            & > label {
              position: absolute;
              top: 9px;
              left: 40px;
              font-size: 0.9rem;
              font-weight: 900;
              letter-spacing: 1px;
              background: inherit;
              transition: all 0.3s ease-in-out;
              color: gray;
              user-select: none;
              padding: 0 3px;
              z-index: 0;
            }
            input:focus + label,
            input:valid + label,
            textarea:focus + label,
            textarea:valid + label {
              transform: translate(-6px, -18px);
              font-size: 0.7rem;
              color: #fab700;
              background-color: white;
              z-index: 1;
            }
          }
          .priceStockWrapper {
            display: flex;
            justify-content: space-evenly;
            .inputGroup {
              width: 30%;
            }
          }
          .categoryWrapper {
            display: flex;
            /* background-color: olive; */
            width: 80%;
            justify-content: start;
            align-items: center;
            margin: 0.7rem 0;
            label {
              font-size: 0.9rem;
              font-weight: 900;
              letter-spacing: 1px;
              color: gray;
            }
            select {
              font-size: 1.2rem;
              padding: 5px 15px;
              margin: 0 1rem;
              border: 2px solid black;
              cursor: pointer;
            }
          }
          button {
            box-sizing: border-box;
            width: 70%;
            background-color: #88e380;
            padding: 5px 10px;
            font-size: 1.3rem;
            font-weight: 700;
            cursor: pointer;
            margin-top: 1rem;
            color: black;
            &:hover {
              background-color: green;
              color: white;
            }
            &:active {
              transform: scale(0.94);
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 700px) {
    .mainContent {
      .createProductWrapper {
        flex-direction: column;
        .left,
        .right {
          width: 100%;
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    .mainContent {
      .createProductWrapper {
        flex-direction: column;
        .left,
        .right {
          width: 100%;
          form {
            padding: 5px;
            width: 100%;
            .inputGroup {
              width: 100%;
            }
            .priceStockWrapper {
              width: 100%;
              .inputGroup {
                width: 40%;
              }
            }
            .categoryWrapper {
              width: 100%;
              select {
                width: 100%;
              }
            }
          }
        }
        .left {
          .imagesPreviewWrapper {
            flex-wrap: wrap;
            img {
              width: 70px;
              height: auto;
              margin: 3px 0;
            }
          }
        }
      }
    }
  }
`;

const CATEGORY = [
  "Mens Clothing",
  "Womens Clothing",
  "Footwear",
  "Electronics",
];

function CreateProduct() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location?.state?.isEdit;
  const productDetails = location?.state?.productDetails;

  const { error, success, isLoading } = useSelector(
    (state) => state.newProduct
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: null,
    stock: null,
  });

  const [images, setImages] = useState([]); // store images that would sont to db
  const [imagesPreview, setImagesPreveiw] = useState([]); // to only show at time of preview

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...product,
      images: [...images],
    };

    if (isEdit) {
      dispatch(updateProduct(productDetails._id, data));
    } else {
      dispatch(createProduct(data));
    }
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreveiw([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((pre) => [...pre, reader.result]);
          setImagesPreveiw((pre) => [...pre, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleChange = (e) => {
    const ele = e.target.name;
    const value = e.target.value;
    setProduct((pre) => {
      return {
        ...pre,
        [ele]: value,
      };
    });
  };

  useEffect(() => {
    if (isEdit && productDetails) {
      setProduct(() => ({
        name: productDetails.name,
        description: productDetails.description,
        price: productDetails.price,
        stock: productDetails.stock,
      }));
      const editImages = productDetails.images.map((image) => image.image_url);
      console.log("edit images ---------->", editImages);
      setImagesPreveiw(editImages);
      setImages(editImages);
    }
  }, [isEdit, productDetails]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      if (isEdit) {
        alert.success("Product Updated");
        dispatch({ type: actionTypes.UPDATE_PRODUCT_RESET });
      } else {
        alert.success("Product Added");
        dispatch({ type: actionTypes.NEW_PRODUCT_RESET });
      }
      setProduct({ name: "", description: "", price: 0, stock: 0 });
      navigate("/admin/allProducts");
    }
  }, [alert, dispatch, error, isEdit, navigate, success]);

  return (
    <Container sidebarOpen={sidebarOpen}>
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        active="create"
      />
      <div className="mainContent">
        <button
          style={{
            width: "min-content",
            position: "absolute",
            top: "0",
            fontSize: "1.2rem",
            background: "inherit",
            cursor: "pointer",
            padding: "5px 3px 5px 10px",
            fontWeight: "600",
          }}
          onClick={() => setSidebarOpen((pre) => !pre)}
        >
          ☰
        </button>
        <div
          className="createProductWrapper"
          style={{
            marginTop: "2rem",
          }}
        >
          <div className="left">
            {imagesPreview.length === 0 ? (
              <img src={Camera} alt="productImage" className="productImage" />
            ) : imagesPreview.length === 1 ? (
              <img
                src={imagesPreview[0]}
                alt="productImage"
                className="productImage"
              />
            ) : (
              <>
                <img
                  src={imagesPreview[0]}
                  alt="productImage"
                  className="productImage"
                />
                <div className="imagesPreviewWrapper">
                  {imagesPreview.map((image, idx) => {
                    return (
                      idx >= 1 && (
                        <img src={image} alt="Product Preview" key={idx} />
                      )
                    );
                  })}
                </div>
              </>
            )}

            <label className="uploadBtn" onChange={createProductImagesChange}>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                style={{ display: "none" }}
                multiple
              />
              <CloudUploadOutlinedIcon className="uploadIcon" />
              Upload Product Image
            </label>
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="inputGroup">
                <AbcIcon />
                <input
                  name="name"
                  type="text"
                  required
                  onChange={handleChange}
                  value={product.name}
                />
                <label>Product Name</label>
              </div>
              <div className="inputGroup">
                <DescriptionIcon />
                <textarea
                  name="description"
                  type="text"
                  required
                  rows="10"
                  onChange={handleChange}
                  value={product.description}
                />
                <label>Product Description</label>
              </div>
              <div className="priceStockWrapper">
                <div className="inputGroup">
                  <CurrencyRupeeOutlinedIcon />
                  <input
                    name="price"
                    type="number"
                    required
                    value={product.price}
                    onChange={handleChange}
                  />
                  <label>Price</label>
                </div>
                <div className="inputGroup">
                  <NumbersOutlinedIcon />
                  <input
                    type="number"
                    name="stock"
                    required
                    max="1000"
                    value={product.stock}
                    onChange={handleChange}
                  />
                  <label>Stock</label>
                </div>
              </div>
              <div className="categoryWrapper">
                <select
                  name="category"
                  onChange={handleChange}
                  value={product.category}
                >
                  <option value={null} disabled>
                    Category
                  </option>
                  {CATEGORY.map((cat, idx) => {
                    return (
                      <option value={cat} key={idx}>
                        {cat}
                      </option>
                    );
                  })}
                </select>
              </div>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <button type="submit">{isEdit ? "Update" : "Create"}</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CreateProduct;
