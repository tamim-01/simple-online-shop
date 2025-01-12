import  { useContext, useMemo , useCallback} from "react";
import Modal from "./Ui/Modal.tsx";
import UserDetailsContext from "../store/userDetailContext.tsx";
import { FaUserCircle, FaTimes } from "react-icons/fa";
import React from "react";

const UserDetailModal = React.memo(() => {
  console.log("UserDetailModal rendered");

  const userCtx = useContext(UserDetailsContext);
  const userData = userCtx.userData;

  const handleCloseCart = useCallback(()=>{ userCtx.hideUser()} , [userCtx]) 

  const UserDetails = useMemo(() => ({ userData }) => {
    function userField(field: string, fieldLabel: string) {
      return (
        <div>
          <p className="text-sm text-gray-500">{fieldLabel}</p>
          <p className="text-lg font-medium text-gray-800">{field}</p>
        </div>
      );
    }

    const userFields = [
      { label: "Name", value: userData.name.firstname + " " + userData.name.lastname },
      { label: "Email", value: userData.email },
      { label: "Phone", value: userData.phone },
    ];

    const addressFields = [
      { label: "City", value: userData.address.city },
      { label: "Street", value: userData.address.street },
      { label: "Number", value: userData.address.number },
      { label: "Zipcode", value: userData.address.zipcode },
      {
        label: "Geolocation",
        value: `Lat: ${userData.address.geolocation.lat}, Long: ${userData.address.geolocation.long}`,
      },
    ];

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto relative">
      
        <button
          onClick={handleCloseCart}
          className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
        >
          <FaTimes className="w-6 h-6" />
        </button>

       
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <FaUserCircle className="w-8 h-8 text-gray-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">
            {userData.username}
          </h1>
        </div>

       
        <div className="space-y-4">
          {userFields.map((field, index) => (
            <React.Fragment key={index}>
              {userField(field.value, field.label)}
            </React.Fragment>
          ))}

  
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
            <div className="space-y-2">
              {addressFields.map((field, index) => (
                <React.Fragment key={index}>
                  {userField(field.value, field.label)}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }, [ handleCloseCart]);

  return (
    <Modal
      onClose={handleCloseCart}
      open={userCtx.showUserDetails}
      className="backdrop:bg-gray-900 backdrop:bg-opacity-50 rounded-lg shadow-lg p-0 md:w-96"
    >
      {userData && 
        <UserDetails userData={userData} />
       }
    </Modal>
  );
});

export default UserDetailModal;