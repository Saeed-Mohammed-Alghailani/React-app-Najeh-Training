import React from 'react';



function Logout() {


    const handlelogout = () => {
sessionStorage.removeItem("email")
window.location = "/"
    };
  
    
    return (
      <>
        <a  onClick={handlelogout}>
          Logout
        </a>

      </>
    );

}; // end login 

export default Logout;
