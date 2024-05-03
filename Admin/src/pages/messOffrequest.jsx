import Navbar from "./Navbar";
import Sidebar from "./sidebar";

export default function MessOff() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dve3n9ftf'
    }
  });

    // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
    const myImage = cld.image('docs/models'); 

    // Resize to 250 x 250 pixels using the 'fill' crop mode.
    myImage.resize(fill().width(250).height(250));


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col h-full w-full">
        <Navbar />
        <div className="px-6 py-6">
          <div className="flex justify-center text-2xl mb-3 capitalize">
            <p> Mess off requests</p>
          </div>
        </div>
      </div>
    </div>
  );
}
