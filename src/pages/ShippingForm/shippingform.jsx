import { useContext, useCallback } from "react";
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from "../../contexts";
import './shippingform.css'

const ShippingForm = () => {

  const { 
    formData,
    setFormData,
    CountrySelect,
  } = useContext(ShoppingCartContext);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }, [formData, setFormData]);

  return (
    <div className="shipping-form">
      <h1 className="shipping-header">Shipping Information</h1>
        <label htmlFor="fullName" className="shipping-label">Full Name:
          <input
            type="text"
            name="fullName"
            defaultValue={formData.fullName}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="addressLine1" className="shipping-label">Address Line 1:
          <input
            type="text"
            name="addressLine1"
            defaultValue={formData.addressLine1}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="addressLine2" className="shipping-label">Address Line 2:
          <input
            type="text"
            name="addressLine2"
            defaultValue={formData.addressLine2}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="city" className="shipping-label">City:
          <input
            type="text"
            name="city"
            defaultValue={formData.city}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="stateProvinceRegion" className="shipping-label">State/Province/Region:
          <input
            type="text"
            name="stateProvinceRegion"
            defaultValue={formData.state}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="zip" className="shipping-label">ZIP:
          <input
            type="number"
            name="zip"
            defaultValue={formData.zip}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="countrySelect" className="shipping-label">Country:
          <CountrySelect className="countrySelect" value={formData.country}/>
        </label>
        <label htmlFor="phoneNumber" className="shipping-label">Phone Number:
          <input
            type="number"
            name="phoneNumber"
            defaultValue={formData.phone}
            onChange={handleInputChange}
          />
        </label>
        <Link to="/order-confirmation">
          <button className="order-button">Order</button>
        </Link>
      </div> 
  )}

export {ShippingForm};
