/** @format */

import axios from "axios";

const getAddressDetails = async (latitude, longitude) => {
    try {
        const apiKey = "ArP5Ei5NywI8M9jsKzbgjNzPGDPMJ9SDnOfmAUNugAln5oiY4B2WERzdtiomSafg";
        const apiUrl = `https://dev.virtualearth.net/REST/v1/Locations/${latitude},${longitude}?key=${apiKey}`;

        const response = await axios.get(apiUrl);

       
    if (response.data.resourceSets && response.data.resourceSets.length > 0) {
      const resource = response.data.resourceSets[0].resources[0];
      const address = resource.address;
      const locationInfo = resource.point.coordinates;
      const city = address.adminDistrict;
      const state = address.locality;
      const street = address.addressLine;
      const postalCode = address.postalCode;
      const district = address.district;
      const county = address.adminDistrict2;
      const region = address.adminDistrict3;
      const country = address.countryRegion;

      return {
        city,
        state,
        street,
        postalCode,
        district,
        county,
        region,
        country,
        locationInfo,
      };
    }
  } catch (err) {
    throw new Error("Lỗi khi lấy thông tin địa chỉ.");
  }
};


export default getAddressDetails;
