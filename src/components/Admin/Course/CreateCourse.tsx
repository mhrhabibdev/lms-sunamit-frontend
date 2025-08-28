"use client";
import { useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOption from "./CourseOption";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";

export default function CreateCourse() {
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    lavel: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benifits, setBenifits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [coureData, setCourseData] = useState({});

  const handleSubmit = () => {
  //  formed benifits data
    const formattedBenefits = benifits.map((benifit) =>( {titel:benifit.title}));
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }));
    const formattedCourseContent = courseContentData.map((content) => ({
      videoUrl: content.videoUrl,
      title: content.title,
      description: content.description,
      videoSection: content.videoSection,
      links: content.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: content.suggestion,
    }));
    // proper our data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags.split(",").map((tag) => tag.trim()),
      level: courseInfo.lavel,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseContent: formattedCourseContent,
    }
    setCourseData(data);

    };

    console.log(coureData);

  

  return (
    <div className="w-full min-h-screen flex p-4">
      {/* Main Content */}
      <div className="w-[80%] pr-6">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            berifits={benifits}
            setBerifits={setBenifits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleSubmit= {handleSubmit}
          />
        )}
      </div>

      {/* Sidebar */}
      <div className="w-[20%] mt-24 h-screen fixed right-0 top-0 overflow-y-auto">
        <CourseOption active={active} setActive={setActive} />
      </div>
    </div>
  );
}
