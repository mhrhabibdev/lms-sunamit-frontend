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
    <div className="w-full ">
        <h1 className="text-2xl font-semibold mb-6">Course Data</h1>
        <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">What will students learn in your course?</h2>
            {berifits.map((benifit, index) => (
                <div key={index} className="flex items-center mb-2">
                    <input 
                        type="text" 
                        value={benifit.title} 
                        onChange={(e) => {
                            const newBenifits = [...berifits];
                            newBenifits[index].title = e.target.value;
                            setBerifits(newBenifits);
                        }} 
                        placeholder={`Benifit ${index + 1}`} 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {berifits.length > 1 && (
                        <button 
                            onClick={() => {
                                const newBenifits = berifits.filter((_, i) => i !== index);
                                setBerifits(newBenifits);
                            }} 
                            className="ml-2 text-red-500"
                        >
                            Remove
                        </button>
                    )}
                </div>
            ))}
            <button 
                onClick={() => setBerifits([...berifits, { title: "" }])} 
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Add Benifit
            </button>
        </div>

        <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">What are the prerequisites for your course?</h2>
            {prerequisites.map((prerequisite, index) => (
                <div key={index} className="flex items-center mb-2">
                    <input 
                        type="text" 
                        value={prerequisite.title} 
                        onChange={(e) => {
                            const newPrerequisites = [...prerequisites];
                            newPrerequisites[index].title = e.target.value;
                            setPrerequisites(newPrerequisites);
                        }} 
                        placeholder={`Prerequisite ${index + 1}`} 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {prerequisites.length > 1 && (
                        <button 
                            onClick={() => {
                                const newPrerequisites = prerequisites.filter((_, i) => i !== index);
                                setPrerequisites(newPrerequisites);
                            }} 
                            className="ml-2 text-red-500"
                        >
                            Remove
                        </button>
                    )}

    </div>
            ))}
            <button 
                onClick={() => setPrerequisites([...prerequisites, { title: "" }])} 
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Add Prerequisite
            </button>
        </div>

        <div className="flex justify-between">
            <button 
                onClick={() => setActive(active - 1)} 
                className="px-4 py-2 bg-gray-300 text-black rounded"
            >
                Previous
            </button>
            <button 
                onClick={() => setActive(active + 1)} 
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Next
            </button>
        </div>
    </div>
  )
}
