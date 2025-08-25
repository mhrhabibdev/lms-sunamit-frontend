import { useState } from "react";


export default function CreateCourse() {
const [active, setActive] = useState(0);
const [courseinfo, setCourseinfo] = useState({
  name: "",
  description: "",
  price: "",
  estimatedPrice: "",
  tags : "",
  lavel : "",
  demoUrl : "",
  thumbnail : "",

});
const [benifits, setBenifits] = useState([{ title: "" }]);
const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
const [coureContentData, setCourseContentData] = useState([
  {
    videoUrl: "",
    title: "",
    description: "",
    videoSection: "Untitled Section",
    links : 
    [
      {
        title: "",
        url: "",
      },
    ],
    suggestion: "",

  }
]);
const [coureData, setCourseData] = useState([{}]);

  return (
    <div>CreateCourse

    </div>
  )
}
