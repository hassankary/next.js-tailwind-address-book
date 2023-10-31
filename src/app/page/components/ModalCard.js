const ModalCard = (props) => {
  const {
    modalRef,
    firstName,
    lastName,
    gender,
    email,
    phone,
    streetName,
    streetNumber,
    city,
    country,
    onClick,
  } = props;

  return (
    <div className="fixed flex justify-center flex-col inset-0  items-center bg-black backdrop-blur-sm bg-opacity-50 text-black">
      <div ref={modalRef} className="bg-white rounded-xl p-4 sm:p-8">
        <div className="text-center">
          <p className="font-bold text-xl mb-4">
            {firstName} {lastName}
          </p>
          <p>Gender: {gender}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <p>
            Location: {streetName} {streetNumber}, {city}, {country}{" "}
          </p>
          <div className="mt-4 flex justify-center items-center">
            <button
              className=" text-white py-1 px-2 bg-gradient-to-r from-pink-500 to-violet-950 rounded-md"
              onClick={onClick}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
