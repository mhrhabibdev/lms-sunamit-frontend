"use client";
type Props = {
    berifits : {title : string}[];
    setBerifits : React.Dispatch<React.SetStateAction<{title : string}[]
    >>;
    prerequisites : {title : string}[];
    setPrerequisites : React.Dispatch<React.SetStateAction<{title : string}[]
    >>;
    active : number;
    setActive : (active : number) => void;
}

export default function CourseData( {berifits, setBerifits, prerequisites, setPrerequisites, active, setActive} : Props) {
    
  return (
    <div>CourseData</div>
  )
}
