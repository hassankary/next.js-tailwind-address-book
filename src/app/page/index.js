"use client";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./components/Header";
import ModalCard from "./components/ModalCard";

const AddressBookApp = () => {
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [detailModal, setDetailModal] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultPage, setSearchResultPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);
  const modalRef = useRef();

  const getDataUser = async () => {
    const request = await fetch(
      `https://randomuser.me/api/?page=1&results=50&seed=abc`
    );
    const response = await request.json();

    setDataUser(response.results);
  };

  useEffect(() => {
    getDataUser();
  }, []);

  const getMoreDataUser = async () => {
    const request = await fetch(
      `https://randomuser.me/api/?page=${pageNumber}&results=50&seed=abc`
    );
    const response = await request.json();
    return response.results;
  };

  const fetchData = async () => {
    const response = await getMoreDataUser();
    if (pageNumber === 9 || pageNumber > 8) {
      setHasMore(false);
    }
    setPageNumber(pageNumber + 1);

    setDataUser([...dataUser, ...response]);
  };

  const deleteCard = (e) => {
    const filterDelete = dataUser.filter((data) => {
      return data.login.uuid !== e.target.id;
    });
    setDataUser(filterDelete);
  };

  // useEffect to watch dataUser, if someone deleted some cards the searchResult will be updated
  useEffect(() => {
    searchCard();
  }, [dataUser]);

  const detailCard = (e) => {
    dataUser.map((data) => {
      if (data.login.uuid === e.target.id) {
        setDetailModal(data);
      }
      return data;
    });
  };

  const Cards = ({ firstName, lastName, gender, id, index }) => {
    return (
      <div className=" flex flex-col md:text-sm text-xs items-center px-1 py-1 font-sans hover:font-bold transition-all bg-white dark:bg-slate-800 text-black dark:text-slate-200 rounded-xl shadow-xl">
        <div className="flex justify-center items-center h-[50px] w-full bg-gradient-to-r from-teal-500 to-purple-900 dark:from-slate-900 dark:to-slate-950 rounded-xl">
          <span className="text-white dark:text-slate-200">Photo Card</span>
        </div>
        <div className="flex flex-col justify-center items-center py-2">
          <h1>
            Name: {firstName} {lastName}
          </h1>
          <h1>
            Gender: {gender} {data.gender}
          </h1>
        </div>
        <div className="flex space-x-1">
          <button
            id={id}
            onClick={(e) => detailCard(e)}
            index={index}
            className="flex justify-center items-center p-2 text-white bg-gradient-to-r from-teal-500 to-purple-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-200 rounded-xl"
          >
            Detail
          </button>
          <button
            id={id}
            onClick={(e) => deleteCard(e)}
            index={index}
            className="flex justify-center items-center p-2 text-white bg-gradient-to-r from-red-500 to-yellow-500 dark:from-slate-900 dark:to-red-950 dark:text-slate-200 rounded-xl"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  const Modal = () => {
    useEffect(() => {
      let handler = (e) => {
        if (!modalRef.current?.contains(e.target)) {
          setDetailModal(null);
        }
      };

      document.addEventListener("click", handler);

      return () => {
        document.removeEventListener("click", handler);
      };
    }, []);

    return (
      <>
        <ModalCard
          modalRef={modalRef}
          firstName={detailModal.name.first}
          lastName={detailModal.name.last}
          gender={detailModal.gender}
          email={detailModal.email}
          phone={detailModal.phone}
          streetName={detailModal.gender}
          streetNumber={detailModal.location.street.number}
          city={detailModal.location.city}
          country={detailModal.location.country}
          onClick={closeDetailModal}
        />
      </>
    );
  };

  const closeDetailModal = () => {
    setDetailModal("");
  };

  const searchCard = (e) => {
    e?.preventDefault();
    const filterSearch = dataUser.filter((item) => {
      const nameUser =
        item.name.first.toString() + " " + item.name.last.toString();
      // if (nameUser?.toLowerCase().includes(searchTitle?.toLowerCase()) && searchTitle !== " ") {
      //   setSearchResultPage(true);
      // }
      return nameUser?.toLowerCase().includes(searchTitle?.toLowerCase());
    });

    if (filterSearch.length !== 0) {
      setSearchResultPage(true);
      setSearchResult(filterSearch);
    }

    if (
      searchTitle === "" ||
      searchTitle == undefined ||
      filterSearch.length === 0
    ) {
      setSearchResultPage(false);
    }
  };

  const closeSearchResult = () => {
    setSearchResultPage(false);
  };

  return (
    <>
      <title>Address Book App</title>
      <Header
        searchTitle={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        onClick={(e) => searchCard(e)}
      />
      <div className="bg-slate-50 dark:text-slate-400 dark:bg-slate-900 px-4 lg:px-16 mt-[70px]">
        {searchResultPage ? (
          <>
            <div className="py-4">
              <div className="flex justify-between bg-gradient-to-bl from-teal-500 to-purple-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-200 py-4 my-4 rounded-t-xl ">
                <div className="w-[63.736px]"></div>
                <div>Search Result</div>
                <button onClick={closeSearchResult} className="px-3">
                  Done
                </button>
              </div>
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-3">
                {searchResult?.map((data, index) => {
                  return (
                    <Cards
                      firstName={data.name.first}
                      lastName={data.name.last}
                      gender={data.gender}
                      id={data.login.uuid}
                      index={index}
                    />
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="py-4">
          <div className="flex bg-gradient-to-bl from-teal-500 to-purple-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-200  py-4 my-4 justify-center rounded-t-xl ">
            Address List
          </div>
          <InfiniteScroll
            dataLength={dataUser.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            loader={<h4 className="text-center text-black dark:text-slate-200 py-3 animate-pulse">Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }} className="font-bold py-3">
                Yay! You have seen it all
              </p>
            }
          >
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-3">
              {dataUser?.map((data, index) => {
                return (
                  <Cards
                    firstName={data.name.first}
                    lastName={data.name.last}
                    gender={data.gender}
                    id={data.login.uuid}
                    index={index}
                  />
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
      {detailModal ? <Modal /> : ""}
    </>
  );
};

export default AddressBookApp;
