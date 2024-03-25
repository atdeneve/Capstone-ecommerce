import { useContext } from "react";
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from "../../contexts";

const ShippingForm = () => {

  const { 
    formData,
    setFormData,
    CountrySelect,
  } = useContext(ShoppingCartContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="shipping-form">
      <h1 className="shipping-header">Shipping Information</h1>
        <label htmlFor="fullName">Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </label>
        <br/>
        <label htmlFor="addressLine1">Address Line 1:
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleInputChange}
          />
        </label>
        <br/>
        <label htmlFor="addressLine2">Address Line 2:
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleInputChange}
          />
        </label>
        <br/>
        <label htmlFor="city">City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </label>
        <br/>
        <label htmlFor="stateProvinceRegion">State/Province/Region:
          <input
            type="text"
            name="stateProvinceRegion"
            value={formData.state}
            onChange={handleInputChange}
          />
        </label>
        <br/>
        <label htmlFor="zip">ZIP:
          <input
            type="number"
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
          />
        </label>
        <br/>
        <label htmlFor="countrySelect">Country:
          <CountrySelect className="countrySelect" value={formData.country}/>
        </label>
        <br/>
        <label htmlFor="phoneNumber">Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </label>
        <br/>
        <Link to="/order-confirmation">
          <button className="order-button">Order</button>
        </Link>
      </div> 
  )}

export {ShippingForm};
