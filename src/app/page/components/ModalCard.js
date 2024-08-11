import Image from "next/image";

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
    src,
  } = props;

  return (
    <div className="fixed flex justify-center flex-col inset-0 items-center bg-black backdrop-blur-sm bg-opacity-50 text-black">
      <div ref={modalRef} className="bg-white rounded-xl p-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              className="rounded-lg  "
              src={src}
              width={70}
              height={70}
              alt="user photo"
              quality={100}
              unoptimized
            />
          </div>
          <p className="font-bold text-xl mb-3">
            {firstName} {lastName}
          </p>
          <table className=" text-left">
            <tr>
              <td className="pr-1">Gender</td>
              <td className="capitalize">: {gender}</td>
            </tr>
            <tr>
              <td className="align-top">Email</td>
              <td>: {email}</td>
            </tr>
            <tr>
              <td className="align-top">Phone</td>
              <td>: {phone}</td>
            </tr>
            <tr>
              <td className="align-top">Location</td>
              <td>
                : {streetName} {streetNumber}, {city}, {country}{" "}
              </td>
            </tr>
          </table>

          <div className="mt-3 flex justify-center items-center">
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
