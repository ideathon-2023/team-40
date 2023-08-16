import LeafletMap from "../components/LeafletMap";
import Nav from "../components/Nav";

const Explore = () => {
  return (
    <div>
      <Nav
        authToken={true}
        minimal={true}
        setShowModal={() => { }}
        showModal={false} />
        <LeafletMap/>
    </div>
  );
}

export default Explore;
