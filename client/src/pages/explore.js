import Nav from "../components/Nav";

const Explore = () => {
  return (
    <div>
      <Nav
        authToken={true}
        minimal={true}
        setShowModal={() => { }}
        showModal={false} />
    </div>
  );
}

export default Explore;
