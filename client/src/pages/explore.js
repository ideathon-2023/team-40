import Footer from "../components/footer/footer";
import LeafletMap from "../components/leaflet/LeafletMap";
import Nav from "../components/nav/Nav";

const Explore = () => {
  return (
    <div>
      <Nav
        minimal={true}
        setShowModal={() => { }}
        showModal={false} />
      <LeafletMap />
      <Footer />
    </div>
  );
}

export default Explore;
